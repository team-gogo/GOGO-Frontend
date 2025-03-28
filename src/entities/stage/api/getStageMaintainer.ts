import axios from 'axios';

interface GetStageMaintainerResponse {
  isMaintainer: boolean;
}

export const getStageMaintainer = async (
  stageId: string,
): Promise<GetStageMaintainerResponse> => {
  try {
    const response = await axios.get<GetStageMaintainerResponse>(
      `/api/server/stage/maintainer/me/${stageId}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
