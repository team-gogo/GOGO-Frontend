import { BettingFormData } from '@/shared/types/main';

export const formatBettingData = (
  data: BettingFormData,
  selectedTeamId: number | null,
) => {
  return {
    predictedWinTeamId: selectedTeamId,
    bettingPoint: Number(data.bettingPoint),
  };
};
