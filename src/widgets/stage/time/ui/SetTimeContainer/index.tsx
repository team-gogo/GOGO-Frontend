import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useMatches } from '@/entities/stage/time/hooks/useMatches';
import { useSavedMatches } from '@/entities/stage/time/hooks/useSavedMatches';
import { useTimeHandlers } from '@/entities/stage/time/hooks/useTimeHandlers';
import {
  SavedMatchData,
  MatchSelection,
} from '@/entities/stage/time/types/match';
import DateInput from '@/entities/stage/time/ui/DateInput';
import EndTimeInput from '@/entities/stage/time/ui/EndTimeInput';
import LeagueMatchView from '@/entities/stage/time/ui/LeagueMatchView';
import SingleMatchView from '@/entities/stage/time/ui/SingleMatchView';
import StartTimeInput from '@/entities/stage/time/ui/StartTimeInput';
import TournamentMatchView from '@/entities/stage/time/ui/TournamentMatchView';
import { useMatchStore } from '@/shared/stores/matchStore';
import { MatchData } from '@/shared/types/match';
import { GameSystem } from '@/shared/types/stage/game';
import getKoreanTime from '@/shared/utils/getKoreanTime';
export interface MatchesState {
  quarterFinals: MatchData[];
  semiFinals: MatchData[];
  finals: MatchData[];
}

type SetTimeContainerProps = {
  onMatchSave?: () => void;
  savedMatches: SavedMatchData[];
  system: GameSystem;
  matchId: number;
  teamIds: Record<string, number>;
};

const SetTimeContainer = ({
  onMatchSave: _onMatchSave,
  savedMatches: initialSavedMatches,
  system,
  matchId,
  teamIds,
}: SetTimeContainerProps) => {
  const { formatMatchData } = useMatchStore();

  const [selectedMatch, setSelectedMatch] = useState<MatchSelection | null>(
    null,
  );
  const [finalStage, setFinalStage] = useState<4 | 8>(8);

  const { matches, updateMatchDateInfo: _updateMatchDateInfo } = useMatches(
    matchId,
    system,
    finalStage,
    teamIds,
  );

  const { savedMatches, saveMatchTime } = useSavedMatches(
    matchId,
    system,
    initialSavedMatches,
    formatMatchData,
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const confirmedTeamsData = sessionStorage.getItem(
        `confirmedTeams_${matchId}`,
      );

      if (confirmedTeamsData) {
        try {
          const parsedTeams = JSON.parse(confirmedTeamsData);
          const teamCount = Array.isArray(parsedTeams) ? parsedTeams.length : 0;
          setFinalStage(teamCount < 5 ? 4 : 8);
        } catch (error) {
          toast.error('데이터 처리 오류');
          console.error(error);
        }
      } else {
        setFinalStage(8);
      }
    }
  }, [matchId]);

  const getSelectedMatchTeams = (
    round: string,
    index: number,
  ): { teamAName: string; teamBName: string } => {
    let match;

    if (round === '8강') {
      match = matches.quarterFinals.find((m) => m.index === index);
    } else if (round === '4강') {
      match = matches.semiFinals.find((m) => m.index === index);
    } else if (round === '결승' || round === '리그' || round === '단판승부전') {
      match = matches.finals.find((m) => m.index === index);
    }

    return {
      teamAName: match?.teamAName || 'TBD',
      teamBName: match?.teamBName || 'TBD',
    };
  };

  const {
    date,
    startTime,
    endTime,
    handleDateChange,
    handleStartTimeChange,
    handleEndTimeChange,
  } = useTimeHandlers(
    selectedMatch,
    getSelectedMatchTeams,
    saveMatchTime,
    savedMatches,
  );

  const handleMatchSelect = (round: string, index: number) => {
    if (
      selectedMatch &&
      selectedMatch.round === round &&
      selectedMatch.index === index
    ) {
      setSelectedMatch(null);
    } else {
      setSelectedMatch({ round, index });

      const currentTeams = getSelectedMatchTeams(round, index);
      let savedMatch;

      switch (system) {
        case GameSystem.TOURNAMENT:
          savedMatch = savedMatches.find(
            (match) => match.round === round && match.index === index,
          );
          break;
        case GameSystem.FULL_LEAGUE:
          savedMatch = savedMatches.find(
            (match) =>
              match.index === index &&
              match.teamAName === currentTeams.teamAName &&
              match.teamBName === currentTeams.teamBName,
          );
          break;
        case GameSystem.SINGLE:
          savedMatch = savedMatches.find((match) => match.index === index);
          break;
        default:
          savedMatch = undefined;
      }

      if (savedMatch) {
        const startDate = new Date(savedMatch.startDate);
        const endDate = new Date(savedMatch.endDate);

        const formattedDate = getKoreanTime(startDate)
          .toISOString()
          .split('T')[0];

        const formattedStartTime = getKoreanTime(startDate)
          .toTimeString()
          .split(' ')[0]
          .substring(0, 5);

        const formattedEndTime = getKoreanTime(endDate)
          .toTimeString()
          .split(' ')[0]
          .substring(0, 5);

        handleDateChange({
          target: { value: formattedDate },
        } as React.ChangeEvent<HTMLInputElement>);
        handleStartTimeChange({
          target: { value: formattedStartTime },
        } as React.ChangeEvent<HTMLInputElement>);
        handleEndTimeChange({
          target: { value: formattedEndTime },
        } as React.ChangeEvent<HTMLInputElement>);
      } else {
        handleDateChange({
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>);
        handleStartTimeChange({
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>);
        handleEndTimeChange({
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  };

  const isMatchSelected = (round: string, index: number): boolean => {
    return selectedMatch?.round === round && selectedMatch?.index === index;
  };

  const isMatchTimeSet = (round: string, index: number): boolean => {
    if (system === GameSystem.FULL_LEAGUE) {
      const currentTeams = getSelectedMatchTeams(round, index);
      return savedMatches.some(
        (match) =>
          match.index === index &&
          match.teamAName === currentTeams.teamAName &&
          match.teamBName === currentTeams.teamBName,
      );
    }
    return savedMatches.some(
      (match) => match.round === round && match.index === index,
    );
  };

  const renderSections = () => {
    switch (system) {
      case GameSystem.SINGLE:
        return (
          <SingleMatchView
            matches={matches}
            teamIds={teamIds}
            finalStage={finalStage}
            matchId={matchId}
            handleMatchSelect={handleMatchSelect}
            isMatchSelected={isMatchSelected}
            isMatchTimeSet={isMatchTimeSet}
          />
        );
      case GameSystem.FULL_LEAGUE:
        return (
          <LeagueMatchView
            matches={matches}
            teamIds={teamIds}
            finalStage={finalStage}
            matchId={matchId}
            handleMatchSelect={handleMatchSelect}
            isMatchSelected={isMatchSelected}
            isMatchTimeSet={isMatchTimeSet}
          />
        );
      default:
        return (
          <TournamentMatchView
            matches={matches}
            teamIds={teamIds}
            finalStage={finalStage}
            matchId={matchId}
            handleMatchSelect={handleMatchSelect}
            isMatchSelected={isMatchSelected}
            isMatchTimeSet={isMatchTimeSet}
          />
        );
    }
  };

  return (
    <div className="m-30 flex flex-col gap-8">
      <div className="my-20 min-h-[calc(50vh-120px)] rounded-lg bg-gray-700 p-8">
        <div
          className={`m-20 flex ${
            system === GameSystem.FULL_LEAGUE
              ? ''
              : finalStage === 4
                ? 'justify-center'
                : 'justify-between'
          } gap-4 p-20`}
        >
          {renderSections()}
        </div>
      </div>

      {selectedMatch && (
        <div className="flex gap-20">
          <DateInput date={date} onChange={handleDateChange} />
          <StartTimeInput
            startTime={startTime}
            onChange={handleStartTimeChange}
          />
          <EndTimeInput endTime={endTime} onChange={handleEndTimeChange} />
        </div>
      )}
    </div>
  );
};

export default SetTimeContainer;
