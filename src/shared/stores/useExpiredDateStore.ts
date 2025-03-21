import { create } from 'zustand';

interface BatchEndlType {
  tempPointExpiredDate: string;
  setTempPointExpiredDate: (date: string) => void;
}

const useExpiredDateStore = create<BatchEndlType>((set) => ({
  tempPointExpiredDate: '',
  setTempPointExpiredDate: (date) =>
    set(() => ({ tempPointExpiredDate: date })),
}));

export default useExpiredDateStore;
