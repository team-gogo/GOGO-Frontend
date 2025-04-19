import axios from 'axios';
import clientInstance from '@/shared/libs/http/clientInstance';
import {
  YavarweeComfirmResponse,
  YavarweeConfirmFormData,
} from '@/shared/types/mini-game/yavarwee';
import { rsaEncrypt } from '../model/encrypt';

export const postComfirmYavarwee = async (
  StageId: string,
  data: YavarweeConfirmFormData,
): Promise<YavarweeComfirmResponse> => {
  try {
    const encryptedData = rsaEncrypt(data);

    const response = await clientInstance.post(
      `/minigame/yavarwee/confirm/${StageId}`,
      { data: encryptedData },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || '야바위 배팅을 실패했습니다',
      );
    }
    throw error;
  }
};
