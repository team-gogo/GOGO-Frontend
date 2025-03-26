import axios from 'axios';
import { CommunityCreateFormData } from '@/shared/types/community/create';

export const postCommunity = async (
  StageId: string,
  data: CommunityCreateFormData,
) => {
  try {
    await axios.post(`/api/server/stage/community/${StageId}`, data);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '커뮤니티 생성에 실패했습니다.',
      );
    }
    throw error;
  }
};
