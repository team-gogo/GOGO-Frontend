import { create } from 'zustand';
import { Game } from '@/shared/types/stage/game';

interface StageStore {
  stages: Record<number, Game[]>;
  setStageGames: (stageId: number, games: Game[]) => void;
  getStageGames: (stageId: number) => Game[] | undefined;
  clearStageGames: (stageId: number) => void;
}

export const useStageStore = create<StageStore>((set, get) => ({
  stages: {},

  setStageGames: (stageId: number, games: Game[]) => {
    set((state) => ({
      stages: {
        ...state.stages,
        [stageId]: games,
      },
    }));
  },

  getStageGames: (stageId: number) => {
    return get().stages[stageId];
  },

  clearStageGames: (stageId: number) => {
    set((state) => {
      const { [stageId]: _, ...rest } = state.stages;
      return { stages: rest };
    });
  },
}));
