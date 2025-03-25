import { get } from '@/shared/api/http';

interface GetStageMaintainerResponse {
  isMaintainer: boolean;
}

export const getStageMaintainer = async (
  stageId: string,
): Promise<GetStageMaintainerResponse> => {
  return get<GetStageMaintainerResponse>(
    `/api/server/stage/maintainer/me/${stageId}`,
  );
};
