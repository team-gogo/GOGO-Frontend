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

  const saveMatchTimeIfComplete = (
    newDate: string,
    newStartTime: string,
    newEndTime: string,
  ) => {
    if (selectedMatch && newDate && newStartTime && newEndTime) {
      const { teamAName, teamBName } = getSelectedMatchTeams(
        selectedMatch.round,
        selectedMatch.index,
      );
      saveMatchTime(
        selectedMatch.round,
        selectedMatch.index,
        newDate,
        newStartTime,
        newEndTime,
        teamAName,
        teamBName,
      );
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setDate(newDate);
    saveMatchTimeIfComplete(newDate, startTime, endTime);
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);
    saveMatchTimeIfComplete(date, newStartTime, endTime);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndTime = e.target.value;
    setEndTime(newEndTime);
    saveMatchTimeIfComplete(date, startTime, newEndTime);
  };

  return {
    date,
    startTime,
    endTime,
    setDate,
    setStartTime,
    setEndTime,
    handleDateChange,
    handleStartTimeChange,
    handleEndTimeChange,
  };
};
