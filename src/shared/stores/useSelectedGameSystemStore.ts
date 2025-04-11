import { create } from 'zustand';
import { GameSystem } from '@/shared/types/stage/game';

interface SelectedGameType {
  selectedGameSystem: GameSystem;
  setSelectedGameSystem: (system: GameSystem) => void;
}

const useSelectedGameSystemStore = create<SelectedGameType>((set) => ({
  selectedGameSystem: GameSystem.TOURNAMENT,
  setSelectedGameSystem: (system) =>
    set(() => ({ selectedGameSystem: system })),
}));

export default useSelectedGameSystemStore;
