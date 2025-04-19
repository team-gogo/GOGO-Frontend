import axios from 'axios';
import clientInstance from '@/shared/libs/http/clientInstance';

export const postCommentLike = async (commentId: number) => {
  try {
    const response = await clientInstance.post(
      `/stage/community/comment/like/${commentId}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '댓글 좋아요에 실패 했습니다.',
      );
    }
    throw error;
  }
};
