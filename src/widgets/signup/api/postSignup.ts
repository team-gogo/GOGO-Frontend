import axios from 'axios';
import { FormattedSignupData } from '@/shared/types/signup';

export const postSignup = async (data: FormattedSignupData) => {
  try {
    await axios.post('/api/signup', data);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};
