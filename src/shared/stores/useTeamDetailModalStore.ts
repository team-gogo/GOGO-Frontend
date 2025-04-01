import { create } from 'zustand';

interface TeamDetailModalStore {
  isTeamDetailModalOpen: boolean;
  setIsTeamDetailModalOpen: (status: boolean) => void;
  isConfirmUsed?: boolean;
  setIsConfirmUsed: (status: boolean) => void;
}

const useTeamDetailModalStore = create<TeamDetailModalStore>((set) => ({
  isTeamDetailModalOpen: false,
  setIsTeamDetailModalOpen: (status) =>
    set(() => ({ isTeamDetailModalOpen: status })),
  isConfirmUsed: false,
  setIsConfirmUsed: (status) => set(() => ({ isConfirmUsed: status })),
}));

export default useTeamDetailModalStore;
