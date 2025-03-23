import axios from 'axios';
import { StudentResponse } from '@/shared/types/stage/create';

export const getSearchStudent = async (
  searchTerm: string,
): Promise<StudentResponse[]> => {
  try {
    const response = await axios.get('/api/server/user/student/search', {
      params: { name: searchTerm },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};
