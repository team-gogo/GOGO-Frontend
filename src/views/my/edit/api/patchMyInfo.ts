import axios from 'axios';
import clientInstance from '@/shared/libs/http/clientInstance';
import { PatchStudentInfo } from '@/shared/types/my/edit';

export const patchMyInfo = async (data: PatchStudentInfo) => {
  try {
    await clientInstance.patch('/user/student/me', data);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '내 정보 수정을 실패 했습니다.',
      );
    }
    throw error;
  }
};
