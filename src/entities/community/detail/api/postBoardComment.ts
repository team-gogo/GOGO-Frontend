import axios from 'axios';

export const postBoardComment = async (boardId: number, content: string) => {
  try {
    const response = await axios.post(
      `/api/server/stage/community/comment/${boardId}`,
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
