import { create } from 'zustand';

interface UserState {
  userName: string;
  studentId: number | null;
  setUserName: (name: string) => void;
  setStudentId: (id: number) => void;
}

const useUserStore = create<UserState>((set) => ({
  userName: '',
  studentId: null,
  setUserName: (name) => set(() => ({ userName: name })),
  setStudentId: (id) => set(() => ({ studentId: id })),
}));

export default useUserStore;
