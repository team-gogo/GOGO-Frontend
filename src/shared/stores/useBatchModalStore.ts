import { create } from 'zustand';

interface BatchModalType {
  isBatchModalOpen: boolean;
  setIsBatchModalOpen: (status: boolean) => void;
}

const useBatchModalStore = create<BatchModalType>((set) => ({
  isBatchModalOpen: false,
  setIsBatchModalOpen: (status) => set(() => ({ isBatchModalOpen: status })),
}));

export default useBatchModalStore;
