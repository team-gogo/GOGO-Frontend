import axios from 'axios';
import { FormattedSignupData } from '@/shared/types/signup';

export const postSignup = async (data: FormattedSignupData) => {
  try {
    await axios.post('/api/user/auth/signup', data);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || '회원가입에 실패했습니다.');
    }
    throw error;
  }
};
