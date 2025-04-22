import axios from 'axios';
import clientInstance from '@/shared/libs/http/clientInstance';
import { PassCodeType } from '@/shared/types/stage';

export const postPassCode = async (stageId: number, data?: PassCodeType) => {
  try {
    await clientInstance.post(`/stage/join/${stageId}`, data ?? {});
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '스테이지 참여를 실패 했습니다.',
      );
    }
    throw error;
  }
};
