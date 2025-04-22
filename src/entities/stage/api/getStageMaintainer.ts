import clientInstance from '@/shared/libs/http/clientInstance';

interface GetStageMaintainerResponse {
  isMaintainer: boolean;
}

export const getStageMaintainer = async (
  stageId: string,
): Promise<GetStageMaintainerResponse> => {
  try {
    const response = await clientInstance.get<GetStageMaintainerResponse>(
      `/stage/maintainer/me/${stageId}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
