import instance from '@/shared/api/instance';

export const postPassCode = async (stageId: string, passCode: string) => {
  try {
    const response = await instance.post(`/join/${stageId}`, {
      passCode: passCode,
    });

    if (!response.data) {
      throw new Error('스테이지 참가 실패');
    }

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
