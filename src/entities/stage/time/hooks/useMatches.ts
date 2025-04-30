import { useState, useEffect } from 'react';
import { GameSystem } from '@/shared/types/stage/game';
import { parseTeamData } from '@/shared/utils/parseTeamData';
import generateLeagueMatches from '../model/generateLeagueMatches';
import generateSingleMatch from '../model/generateSingleMatch';
import generateTournamentMatches from '../model/generateTournamentMatches';
import { getTournamentMatches } from '../model/getTournamentMatches';
import { MatchesState } from '../types/match';

export const useMatches = (
  matchId: number,
  system: GameSystem,
  finalStage: number,
  _teamIds: Record<string, number>,
) => {
  const [matches, setMatches] = useState<MatchesState>({
    quarterFinals: [],
    semiFinals: [],
    finals: [],
  });

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
              finalStage as 4 | 8,
            );
            setMatches(tournamentMatches);
          } else {
            setMatches(getTournamentMatches(finalStage as 4 | 8));
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

  return { matches, updateMatchDateInfo };
};
