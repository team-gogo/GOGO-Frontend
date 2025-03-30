import { PlinkoFormType } from '@/shared/types/mini-game';

export const formatPlinkoData = (
  data: PlinkoFormType,
  selectedRisk: 'LOW' | 'MEDIUM' | 'HIGH',
) => {
  return {
    amount: Number(data.amount),
    risk: selectedRisk,
  };
};
