import axios from 'axios';
import clientInstance from '@/shared/libs/http/clientInstance';
import { CommunityCreateFormData } from '@/shared/types/community/create';
import { postImage } from './postImage';

export const postCommunity = async (
  StageId: string,
  data: CommunityCreateFormData,
) => {
  try {
    let imageUrl = null;
    if (data.image) {
      imageUrl = await postImage(data.image);
    }

    const postData = {
      title: data.title,
      content: imageUrl ? `${data.content}\n\n${imageUrl}` : data.content,
      gameCategory: data.gameCategory,
    };

    await clientInstance.post(`/stage/community/${StageId}`, postData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(error.response.data);
      throw new Error(
        error.response.data.error || '커뮤니티 생성에 실패했습니다.',
      );
    }
    throw error;
  }
};
