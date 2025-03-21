import { PlinkoResponse } from '@/shared/types/mini-game';

const getPlinkoMock = (): PlinkoResponse => {
  return {
    amount: 5000,
    multi: 0,
  };
};

export default getPlinkoMock;
