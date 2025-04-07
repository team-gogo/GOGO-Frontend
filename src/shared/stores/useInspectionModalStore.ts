import { create } from 'zustand';

interface InspectionModalType {
  isInspectionModalOpen: boolean;
  setIsInspectionModalOpen: (status: boolean) => void;
}

const useInspectionModalStore = create<InspectionModalType>((set) => ({
  isInspectionModalOpen: false,
  setIsInspectionModalOpen: (status) =>
    set(() => ({ isInspectionModalOpen: status })),
}));

export default useInspectionModalStore;
