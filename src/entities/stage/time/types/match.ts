import { MatchData } from '@/shared/types/match';

export interface MatchTeams {
  teamAName: string;
  teamBName: string;
}

export interface MatchesState {
  quarterFinals: MatchData[];
  semiFinals: MatchData[];
  finals: MatchData[];
}

export interface SavedMatchData extends MatchTeams, MatchSelection {
  startDate: string;
  endDate: string;
}

export interface MatchSelection {
  round: string;
  index: number;
}
