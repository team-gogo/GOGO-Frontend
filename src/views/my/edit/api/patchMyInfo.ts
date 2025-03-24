import axios from 'axios';
import { PatchStudentInfo } from '@/shared/types/my/edit';

export const patchMyInfo = async (data: PatchStudentInfo) => {
  try {
    await axios.patch('/api/server/user/student/me', data);
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
