import { create } from 'zustand';

interface SavedMatchData {
  round: string;
  index: number;
  startDate: string;
  endDate: string;
  teamAName: string;
  teamBName: string;
}

interface TournamentGame {
  teamAId: string;
  teamBId: string;
  round: string;
  turn: number;
  startDate: string;
  endDate: string;
}

interface MatchStore {
  tournamentGames: TournamentGame[];
  setTournamentGames: (games: TournamentGame[]) => void;
  formatMatchData: (matchId: number, savedMatches: SavedMatchData[]) => void;
}

export const useMatchStore = create<MatchStore>((set) => ({
  tournamentGames: [],
  setTournamentGames: (games) => set({ tournamentGames: games }),
  formatMatchData: (matchId, savedMatches) => {
    const teamNameToIdMap = new Map<string, string>();

    try {
      const confirmedTeamsKey = `confirmedTeams_${matchId}`;
      const confirmedTeamsData = sessionStorage.getItem(confirmedTeamsKey);

      if (confirmedTeamsData) {
        const parsedTeams = JSON.parse(confirmedTeamsData);
        parsedTeams.forEach((team: { teamId: number; teamName: string }) => {
          teamNameToIdMap.set(team.teamName, team.teamId.toString());
        });
      }

      const tournamentGames = savedMatches.map((match) => {
        let round = '';

        if (match.round === '8강') {
          round = 'QUARTER_FINALS';
        } else if (match.round === '4강') {
          round = 'SEMI_FINALS';
        } else if (match.round === '결승') {
          round = 'FINALS';
        }

        const teamAId = teamNameToIdMap.get(match.teamAName) || 'TBD';
        const teamBId = teamNameToIdMap.get(match.teamBName) || 'TBD';

        return {
          teamAId,
          teamBId,
          round,
          turn: match.index,
          startDate: match.startDate,
          endDate: match.endDate,
        };
      });

      set({ tournamentGames });
    } catch (error) {
      console.error(error);
    }
  },
}));
