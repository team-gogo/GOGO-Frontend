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
      content: data.content,
      gameCategory: data.gameCategory,
      imageUrl: imageUrl,
    };

    await clientInstance.post(`/stage/community/${StageId}`, postData);

    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '커뮤니티 생성에 실패했습니다.',
      );
    }
    throw error;
  }
};
