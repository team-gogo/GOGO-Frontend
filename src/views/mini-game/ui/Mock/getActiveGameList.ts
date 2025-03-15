import { ActiveGameList } from '@/shared/types/mini-game';

const getActiveGameList = (): ActiveGameList => {
  return {
    isPlinkoActive: true,
    isCoinTossActive: false,
    isYavarweeActive: true,
  };
};

export default getActiveGameList;
