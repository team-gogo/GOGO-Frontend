import axios from 'axios';
import { FormattedSignupData } from '@/shared/types/signup';

export const postSignup = async (data: FormattedSignupData) => {
  try {
    await axios.post('/api/signup', data);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (
        error.response.status === 401 &&
        error.response.data?.isRefreshError
      ) {
        // window.location.href = '/signin';
      }
      throw new Error(error.response.data?.error || '회원가입을 실패 했습니다');
    }
    throw error;
  }
};
