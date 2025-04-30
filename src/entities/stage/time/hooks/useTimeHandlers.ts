import { useState, useEffect } from 'react';
import { MatchSelection, MatchTeams, SavedMatchData } from '../types/match';

export const useTimeHandlers = (
  selectedMatch: MatchSelection | null,
  getSelectedMatchTeams: (round: string, index: number) => MatchTeams,
  saveMatchTime: (
    round: string,
    index: number,
    date: string,
    startTime: string,
    endTime: string,
    teamAName: string,
    teamBName: string,
  ) => void,
  savedMatches: SavedMatchData[],
) => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    if (selectedMatch) {
      const savedMatch = savedMatches.find(
        (match) =>
          match.round === selectedMatch.round &&
          match.index === selectedMatch.index,
      );

      if (savedMatch) {
        const startDate = new Date(savedMatch.startDate);
        const endDate = new Date(savedMatch.endDate);

        setDate(startDate.toISOString().split('T')[0]);
        setStartTime(startDate.toTimeString().split(' ')[0].substring(0, 5));
        setEndTime(endDate.toTimeString().split(' ')[0].substring(0, 5));
      } else {
        setDate('');
        setStartTime('');
        setEndTime('');
      }
    }
  }, [selectedMatch, savedMatches]);

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

  return {
    date,
    startTime,
    endTime,
    handleDateChange,
    handleStartTimeChange,
    handleEndTimeChange,
  };
};
