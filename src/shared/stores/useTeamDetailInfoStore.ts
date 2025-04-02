import { create } from 'zustand';
import { CategoryType } from '../types/community';

interface TeamDetailInfoType {
  teamId: number;
  setTeamId: (id: number) => void;
  winCount: number;
  setWinCount: (count: number) => void;
  category: CategoryType;
  setCategory: (sport: CategoryType) => void;
}

const useTeamDetailInfoStore = create<TeamDetailInfoType>((set) => ({
  teamId: 0,
  setTeamId: (id) => set(() => ({ teamId: id })),
  winCount: 0,
  setWinCount: (count) => set(() => ({ winCount: count })),
  category: 'ETC',
  setCategory: (sport) => set(() => ({ category: sport })),
}));

export default useTeamDetailInfoStore;
