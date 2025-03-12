import { UserInfoType } from '@/shared/types/my';

const getUserInfo = (): UserInfoType => {
  return {
    name: '홍길동',
    schoolName: '서울고등학교',
    sex: 'MALE',
  };
};

export default getUserInfo;
