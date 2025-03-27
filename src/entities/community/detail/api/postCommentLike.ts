import axios from 'axios';

export const postCommentLike = async (commentId: number) => {
  try {
    const response = await axios.post(
      `/api/server/stage/community/comment/like/${commentId}`,
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
