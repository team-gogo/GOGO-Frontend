import { create } from 'zustand';

interface StatusType {
  isStatusConfirmed: boolean;
  setIsStatusConfirmed: (status: boolean) => void;
}

const useStageStatus = create<StatusType>((set) => ({
  isStatusConfirmed: false,
  setIsStatusConfirmed: (status) => set(() => ({ isStatusConfirmed: status })),
}));

export default useStageStatus;
