import { PlinkoFormType } from '@/shared/types/mini-game';

export const formatPlinkoData = (
  data: PlinkoFormType,
  selectedRisk: 'LOW' | 'MEDIUM' | 'HIGH',
) => {
  return {
    deviceToken: null,
    amount: data.amount,
    risk: selectedRisk,
  };
};
