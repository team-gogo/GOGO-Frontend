import axios from 'axios';
import clientInstance from '@/shared/libs/http/clientInstance';
import { MatchNoticeType } from '@/shared/types/main';

export const patchMatchNotice = async (
  data: MatchNoticeType,
  matchId: number,
) => {
  try {
    await clientInstance.patch(`/stage/match/notice/${matchId}`, data);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '매치 알림 전환을 실패 했습니다.',
      );
    }
    throw error;
  }
};
