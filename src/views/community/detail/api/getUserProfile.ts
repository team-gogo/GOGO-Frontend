import axios from 'axios';
import { GetStudentInfo } from '@/shared/types/my/edit';

export const getUserProfile = async () => {
  try {
    const { data } = await axios.get<GetStudentInfo>(
      '/api/server/user/student/me',
    );
    return data;
  } catch (error) {
    throw new Error('Failed to fetch community detail');
  }
};
