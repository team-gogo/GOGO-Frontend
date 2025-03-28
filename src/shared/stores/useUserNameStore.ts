import { create } from 'zustand';

interface UserNameType {
  userName: string;
  setUserName: (name: string) => void;
}

const useUserNameStore = create<UserNameType>((set) => ({
  userName: '',
  setUserName: (name) => set(() => ({ userName: name })),
}));

export default useUserNameStore;
