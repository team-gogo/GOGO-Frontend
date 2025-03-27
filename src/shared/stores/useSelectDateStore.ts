import { create } from 'zustand';

interface SelectDateType {
  selectDate: string;
  setSelectDate: (date: string) => void;
}

const useSelectDateStore = create<SelectDateType>((set) => ({
  selectDate: '',
  setSelectDate: (date) => set(() => ({ selectDate: date })),
}));

export default useSelectDateStore;
