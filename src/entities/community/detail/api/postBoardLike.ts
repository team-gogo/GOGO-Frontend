import axios from 'axios';
import clientInstance from '@/shared/api/clientInstance';

export const postBoardLike = async (boardId: string) => {
  try {
    const response = await clientInstance.post(
      `/stage/community/board/like/${boardId}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '게시물 좋아요에 실패 했습니다.',
      );
    }
    throw error;
  }
};
