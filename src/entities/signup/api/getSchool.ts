import axios from 'axios';
import { School } from '@/shared/types/signup';

const getSchool = async (keyword: string): Promise<School[] | null> => {
  try {
    const response = await axios.get('https://open.neis.go.kr/hub/schoolInfo', {
      params: {
        KEY: process.env.NEXT_PUBLIC_CLIENT_NEIS_KEY,
        Type: 'json',
        pIndex: 1,
        pSize: 5,
        SCHUL_NM: keyword,
      },
    });

    const schoolData = response.data?.schoolInfo?.[1]?.row;
    return Array.isArray(schoolData)
      ? schoolData
      : [schoolData].filter(Boolean);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getSchool;
