import axios from 'axios';
import clientInstance from '@/shared/libs/http/clientInstance';
import { StudentResponse } from '@/shared/types/stage/create';

export const getSearchStudent = async (
  searchTerm: string,
): Promise<StudentResponse[]> => {
  try {
    const response = await clientInstance.get('/user/student/search', {
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
