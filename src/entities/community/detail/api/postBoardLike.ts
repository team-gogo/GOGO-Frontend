import axios from 'axios';

export const postBoardLike = async (boardId: string) => {
  try {
    const response = await axios.post(
      `/api/server/stage/community/board/like/${boardId}`,
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
