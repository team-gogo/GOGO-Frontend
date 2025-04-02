import clientInstance from '@/shared/api/clientInstance';

export interface GetMaxMinBetPointResponse {
  maxBettingPoint: number;
  minBettingPoint: number;
}

export const getMaxMinBetPoint = async (
  stageId: number,
): Promise<GetMaxMinBetPointResponse> => {
  try {
    const response = await clientInstance.get<GetMaxMinBetPointResponse>(
      `/stage/rule/${stageId}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
