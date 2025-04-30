import { MatchData } from '@/shared/types/match';

export interface MatchesState {
  quarterFinals: MatchData[];
  semiFinals: MatchData[];
  finals: MatchData[];
}

export interface SavedMatchData {
  round: string;
  index: number;
  startDate: string;
  endDate: string;
  teamAName: string;
  teamBName: string;
}
