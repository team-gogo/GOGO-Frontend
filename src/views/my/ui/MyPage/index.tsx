'use client';

import { cn } from '@/shared/utils/cn';
import { MyInfoContainer, MyStageContainer } from '@/widgets/my';
import { useGetMyInfo } from '../../model/useGetMyInfo';
import getUserStageInfo from '../Mock/getUserStageInfo';

const MyPage = () => {
  const userStageInfo = getUserStageInfo();
  const { data: myInfo, isPending: infoPending } = useGetMyInfo();

  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'h-full',
        'flex-col',
        'items-center',
        'justify-center',
        'py-[3.75rem]',
        'px-[1rem]',
      )}
    >
      <div
        className={cn(
          'flex',
          'flex-col',
          'w-full',
          'h-full',
          'max-w-[82.5rem]',
          'gap-[3.75rem]',
        )}
      >
        <MyInfoContainer myInfo={myInfo} isPending={infoPending} />
        <MyStageContainer userStageInfo={userStageInfo} />
      </div>
    </div>
  );
};

export default MyPage;
