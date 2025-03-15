import { create } from 'zustand';

interface PasswordModalType {
  isPasswordModalOpen: boolean;
  setIsPasswordModalOpen: (status: boolean) => void;
}

const usePasswordModalStore = create<PasswordModalType>((set) => ({
  isPasswordModalOpen: false,
  setIsPasswordModalOpen: (status) =>
    set(() => ({ isPasswordModalOpen: status })),
}));

export default usePasswordModalStore;
