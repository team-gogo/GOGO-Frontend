import axios from 'axios';
import clientInstance from '@/shared/libs/http/clientInstance';

export const postBoardComment = async (boardId: string, content: string) => {
  try {
    const response = await clientInstance.post(
      `/stage/community/comment/${boardId}`,
      {
        content,
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '게시물 댓글 작성을 실패 했습니다.',
      );
    }
    throw error;
  }
};
