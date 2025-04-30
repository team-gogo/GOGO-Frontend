import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { GameSystem } from '@/shared/types/stage/game';
import { SavedMatchData } from '../types/match';

export const useSavedMatches = (
  matchId: number,
  system: GameSystem,
  initialSavedMatches: SavedMatchData[],
  formatMatchData: (matchId: number, savedMatches: SavedMatchData[]) => void,
) => {
  const [savedMatches, setSavedMatches] = useState<SavedMatchData[]>(
    initialSavedMatches.filter(
      (match) => !(match.round === '결승' && match.index === 0),
    ),
  );

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
      let currentSavedMatches: SavedMatchData[] = [];

      const existingData = sessionStorage.getItem(savedMatchesKey);
      if (existingData) {
        currentSavedMatches = JSON.parse(existingData);
      }

      let matchIndex = -1;

      if (system === GameSystem.FULL_LEAGUE) {
        matchIndex = currentSavedMatches.findIndex(
          (match) =>
            match.index === index &&
            match.teamAName === teamAName &&
            match.teamBName === teamBName,
        );
      } else {
        matchIndex = currentSavedMatches.findIndex(
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
        currentSavedMatches[matchIndex] = newMatchData;
      } else {
        currentSavedMatches.push(newMatchData);
      }

      sessionStorage.setItem(
        savedMatchesKey,
        JSON.stringify(currentSavedMatches),
      );
      setSavedMatches(currentSavedMatches);

      toast.success('매치 시간이 저장되었습니다.');
    } catch (error) {
      toast.error('날짜 또는 시간 형식이 올바르지 않습니다.');
      console.error(error);
    }
  };

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

  return { savedMatches, saveMatchTime };
};
