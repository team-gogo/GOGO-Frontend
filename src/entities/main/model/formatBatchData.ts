import { BatchMatchType } from '@/shared/types/main';

export const formatBatchData = (data: BatchMatchType) => {
  return {
    winTeamId: data.winTeamId,
    aTeamScore: Number(data.aTeamScore),
    bTeamScore: Number(data.bTeamScore),
  };
};
