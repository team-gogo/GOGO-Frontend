import { create } from 'zustand';

interface AlarmClickType {
  isAlarmClicked: boolean;
  setIsAlarmClicked: (status: boolean) => void;
}

const useAlarmClickStore = create<AlarmClickType>((set) => ({
  isAlarmClicked: false,
  setIsAlarmClicked: (status) => set(() => ({ isAlarmClicked: status })),
}));

export default useAlarmClickStore;
