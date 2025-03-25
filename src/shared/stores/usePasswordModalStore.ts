import { create } from 'zustand';

interface PasswordModalType {
  isPasswordModalOpen: boolean;
  setIsPasswordModalOpen: (status: boolean) => void;
  clickedStageId: number;
  setClickedStageId: (stageId: number) => void;
}

const usePasswordModalStore = create<PasswordModalType>((set) => ({
  isPasswordModalOpen: false,
  setIsPasswordModalOpen: (status) =>
    set(() => ({ isPasswordModalOpen: status })),
  clickedStageId: 0,
  setClickedStageId: (id) => set(() => ({ clickedStageId: id })),
}));

export default usePasswordModalStore;
