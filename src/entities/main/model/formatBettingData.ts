import { BettingFormData } from '@/shared/types/main';

export const formatBettingData = (
  data: BettingFormData,
  selectedTeamId: number | null,
) => {
  return {
    deviceToken: null,
    predictedWinTeamId: selectedTeamId,
    bettingPoint: data.bettingPoint,
  };
};
