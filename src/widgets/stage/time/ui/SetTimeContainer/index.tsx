import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import generateLeagueMatches from '@/entities/stage/time/model/generateLeagueMatches';
import generateSingleMatch from '@/entities/stage/time/model/generateSingleMatch';
import generateTournamentMatches from '@/entities/stage/time/model/generateTournamentMatches';
import DateInput from '@/entities/stage/time/ui/DateInput';
import EndTimeInput from '@/entities/stage/time/ui/EndTimeInput';
import LeagueMatchView from '@/entities/stage/time/ui/LeagueMatchView';
import SingleMatchView from '@/entities/stage/time/ui/SingleMatchView';
import StartTimeInput from '@/entities/stage/time/ui/StartTimeInput';
import TournamentMatchView from '@/entities/stage/time/ui/TournamentMatchView';
import { useMatchStore } from '@/shared/stores/matchStore';
import { MatchData } from '@/shared/types/match';
import { GameSystem } from '@/shared/types/stage/game';
import { parseTeamData } from '@/shared/utils/parseTeamData';
import { getTournamentMatches } from '../../models/getTournamentMatches';

interface SavedMatchData {
  round: string;
  index: number;
  startDate: string;
  endDate: string;
  teamAName: string;
  teamBName: string;
}

type SetTimeContainerProps = {
  onMatchSave?: () => void;
  savedMatches: SavedMatchData[];
  system: GameSystem;
  matchId: number;
  teamIds: Record<string, number>;
};

const SetTimeContainer = ({
  onMatchSave,
  savedMatches: initialSavedMatches,
  system,
  matchId,
  teamIds,
}: SetTimeContainerProps) => {
  const { formatMatchData } = useMatchStore();
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedMatch, setSelectedMatch] = useState<{
    round: string;
    index: number;
  } | null>(null);
  const [savedMatches, setSavedMatches] = useState<SavedMatchData[]>(
    initialSavedMatches.filter(
      (match) => !(match.round === '결승' && match.index === 0),
    ),
  );
  const [matches, setMatches] = useState<{
    quarterFinals: MatchData[];
    semiFinals: MatchData[];
    finals: MatchData[];
  }>({
    quarterFinals: [],
    semiFinals: [],
    finals: [],
  });
  const [finalStage, setFinalStage] = useState<4 | 8>(8);

  const getSelectedMatchTeams = (
    round: string,
    index: number,
  ): { teamAName: string; teamBName: string } => {
    let match: MatchData | undefined;

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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    if (selectedMatch && e.target.value && startTime && endTime) {
      const { teamAName, teamBName } = getSelectedMatchTeams(
        selectedMatch.round,
        selectedMatch.index,
      );
      saveMatchTime(
        selectedMatch.round,
        selectedMatch.index,
        e.target.value,
        startTime,
        endTime,
        teamAName,
        teamBName,
      );
    }
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
    if (selectedMatch && date && e.target.value && endTime) {
      const { teamAName, teamBName } = getSelectedMatchTeams(
        selectedMatch.round,
        selectedMatch.index,
      );
      saveMatchTime(
        selectedMatch.round,
        selectedMatch.index,
        date,
        e.target.value,
        endTime,
        teamAName,
        teamBName,
      );
    }
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
    if (selectedMatch && date && startTime && e.target.value) {
      const { teamAName, teamBName } = getSelectedMatchTeams(
        selectedMatch.round,
        selectedMatch.index,
      );
      saveMatchTime(
        selectedMatch.round,
        selectedMatch.index,
        date,
        startTime,
        e.target.value,
        teamAName,
        teamBName,
      );
    }
  };

  const saveMatchTime = (
    round: string,
    index: number,
    dateVal: string,
    startTimeVal: string,
    endTimeVal: string,
    teamAName: string,
    teamBName: string,
  ) => {
    try {
      const startDateTime = new Date(`${dateVal}T${startTimeVal}`);
      const endDateTime = new Date(`${dateVal}T${endTimeVal}`);

      const koreaTimeOffset = 9 * 60;
      const startDateStr = new Date(
        startDateTime.getTime() + koreaTimeOffset * 60000,
      ).toISOString();
      const endDateStr = new Date(
        endDateTime.getTime() + koreaTimeOffset * 60000,
      ).toISOString();

      const savedMatchesKey = `savedMatches_${matchId}`;
      let savedMatches: SavedMatchData[] = [];

      const existingData = sessionStorage.getItem(savedMatchesKey);
      if (existingData) {
        savedMatches = JSON.parse(existingData);
      }

      let matchIndex = -1;

      if (system === GameSystem.FULL_LEAGUE) {
        matchIndex = savedMatches.findIndex(
          (match) =>
            match.index === index &&
            match.teamAName === teamAName &&
            match.teamBName === teamBName,
        );
      } else {
        matchIndex = savedMatches.findIndex(
          (match) => match.round === round && match.index === index,
        );
      }

      const newMatchData = {
        round,
        index,
        startDate: startDateStr,
        endDate: endDateStr,
        teamAName,
        teamBName,
      };

      if (matchIndex !== -1) {
        savedMatches[matchIndex] = newMatchData;
      } else {
        savedMatches.push(newMatchData);
      }

      sessionStorage.setItem(savedMatchesKey, JSON.stringify(savedMatches));
      setSavedMatches(savedMatches);
      updateMatchDateInfo(round, index, startDateStr, endDateStr);

      toast.success('매치 시간이 저장되었습니다.');

      if (onMatchSave) {
        onMatchSave();
      }
    } catch (error) {
      toast.error('날짜 또는 시간 형식이 올바르지 않습니다.');
      console.error(error);
    }
  };

  const updateMatchDateInfo = (
    round: string,
    index: number,
    startDate: string,
    endDate: string,
  ) => {
    const newMatches = { ...matches };

    if (round === '8강') {
      const matchIndex = newMatches.quarterFinals.findIndex(
        (match) => match.index === index,
      );
      if (matchIndex !== -1) {
        newMatches.quarterFinals[matchIndex].startDate = startDate;
        newMatches.quarterFinals[matchIndex].endDate = endDate;
      }
    } else if (round === '4강') {
      const matchIndex = newMatches.semiFinals.findIndex(
        (match) => match.index === index,
      );
      if (matchIndex !== -1) {
        newMatches.semiFinals[matchIndex].startDate = startDate;
        newMatches.semiFinals[matchIndex].endDate = endDate;
      }
    } else if (round === '결승') {
      const matchIndex = newMatches.finals.findIndex(
        (match) => match.index === index,
      );
      if (matchIndex !== -1) {
        newMatches.finals[matchIndex].startDate = startDate;
        newMatches.finals[matchIndex].endDate = endDate;
      }
    }

    setMatches(newMatches);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMatchesKey = `savedMatches_${matchId}`;
      const savedMatchesData = sessionStorage.getItem(savedMatchesKey);

      if (savedMatchesData) {
        try {
          const parsedSavedMatches = JSON.parse(savedMatchesData);
          setMatches(parsedSavedMatches);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }, [matchId]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const confirmedTeamsKey = `confirmedTeams_${matchId}`;
      const confirmedTeamsData = sessionStorage.getItem(confirmedTeamsKey);

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

  useEffect(() => {
    if (typeof window !== 'undefined' && savedMatches.length > 0) {
      const savedMatchesKey = `savedMatches_${matchId}`;
      sessionStorage.setItem(savedMatchesKey, JSON.stringify(savedMatches));

      if (system === GameSystem.FULL_LEAGUE) {
        const uniqueIndices = new Set();
        const uniqueSavedMatches = savedMatches.filter((match) => {
          if (uniqueIndices.has(match.index)) {
            return false;
          }
          uniqueIndices.add(match.index);
          return true;
        });

        const modifiedSavedMatches = uniqueSavedMatches.map(({ ...rest }) => ({
          ...rest,
          leagueTurn: rest.index,
        }));

        sessionStorage.setItem(
          savedMatchesKey,
          JSON.stringify(modifiedSavedMatches),
        );
      } else if (system === GameSystem.TOURNAMENT) {
        const modifiedSavedMatches = savedMatches.filter(
          (match) => !(match.round === '결승' && match.index === 0),
        );

        sessionStorage.setItem(
          savedMatchesKey,
          JSON.stringify(modifiedSavedMatches),
        );
      }
      formatMatchData(matchId, savedMatches);
    }
  }, [savedMatches, matchId, formatMatchData, system]);

  useEffect(() => {
    try {
      const { placedTeams, confirmedTeams } = parseTeamData(matchId);

      switch (system) {
        case GameSystem.FULL_LEAGUE:
          if (confirmedTeams.length > 0) {
            const leagueMatches = generateLeagueMatches(confirmedTeams);
            setMatches({
              quarterFinals: [],
              semiFinals: [],
              finals: leagueMatches,
            });
          }
          break;

        case GameSystem.TOURNAMENT:
          if (placedTeams) {
            const tournamentMatches = generateTournamentMatches(
              placedTeams,
              confirmedTeams.length,
              finalStage,
            );
            setMatches(tournamentMatches);
          } else {
            setMatches(getTournamentMatches(finalStage));
          }
          break;

        case GameSystem.SINGLE:
          if (confirmedTeams.length === 2) {
            const singleMatch = generateSingleMatch(confirmedTeams);
            setMatches({
              quarterFinals: [],
              semiFinals: [],
              finals: singleMatch,
            });
          }
          break;
      }
    } catch (error) {
      console.error(error);
    }
  }, [matchId, finalStage, system]);

  const handleMatchSelect = (round: string, index: number) => {
    if (
      selectedMatch &&
      selectedMatch.round === round &&
      selectedMatch.index === index
    ) {
      setSelectedMatch(null);
      setDate('');
      setStartTime('');
      setEndTime('');
    } else {
      setSelectedMatch({ round, index });

      const currentTeams = getSelectedMatchTeams(round, index);
      let savedMatch;

      if (system === GameSystem.TOURNAMENT) {
        savedMatch = savedMatches.find(
          (match) => match.round === round && match.index === index,
        );
      } else if (system === GameSystem.FULL_LEAGUE) {
        savedMatch = savedMatches.find(
          (match) =>
            match.index === index &&
            match.teamAName === currentTeams.teamAName &&
            match.teamBName === currentTeams.teamBName,
        );
      } else if (system === GameSystem.SINGLE) {
        savedMatch = savedMatches.find((match) => match.index === index);
      }

      if (savedMatch) {
        const startDate = new Date(savedMatch.startDate);
        const endDate = new Date(savedMatch.endDate);

        const koreaTimeOffset = 9 * 60;
        const koreaStartDate = new Date(
          startDate.getTime() - koreaTimeOffset * 60000,
        );
        const koreaEndDate = new Date(
          endDate.getTime() - koreaTimeOffset * 60000,
        );

        const formattedDate = koreaStartDate.toISOString().split('T')[0];
        const formattedStartTime = koreaStartDate
          .toTimeString()
          .split(' ')[0]
          .substring(0, 5);
        const formattedEndTime = koreaEndDate
          .toTimeString()
          .split(' ')[0]
          .substring(0, 5);

        setDate(formattedDate);
        setStartTime(formattedStartTime);
        setEndTime(formattedEndTime);
      } else {
        setDate('');
        setStartTime('');
        setEndTime('');
      }
    }
  };

  const isMatchSelected = (round: string, index: number): boolean => {
    return selectedMatch?.round === round && selectedMatch?.index === index;
  };

  const isMatchTimeSet = (round: string, index: number) => {
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
