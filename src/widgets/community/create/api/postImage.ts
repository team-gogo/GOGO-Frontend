import axios from 'axios';
import clientInstance from '@/shared/libs/http/clientInstance';

export const postImage = async (imageFile: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await clientInstance.post('/stage/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.imageUrl;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '이미지 업로드에 실패했습니다.',
      );
    }
    throw error;
  }
};
