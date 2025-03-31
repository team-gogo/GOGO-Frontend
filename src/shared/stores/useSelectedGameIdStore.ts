import { create } from 'zustand';

interface SelectedGameType {
  selectedGameId: number;
  setSelectedGameId: (id: number) => void;
}

const useSelectedGameIdStore = create<SelectedGameType>((set) => ({
  selectedGameId: 1,
  setSelectedGameId: (id) => set(() => ({ selectedGameId: id })),
}));

export default useSelectedGameIdStore;
