import { cn } from '@/shared/utils/cn';
import { MyInfoContainer, MyStageContainer } from '@/widgets/my';
import getUserInfo from '../Mock/getUserInfo';
import getUserStageInfo from '../Mock/getUserStageInfo';

const MyPage = () => {
  const userStageInfo = getUserStageInfo();
  const userInfo = getUserInfo();

  return (
    <div
      className={cn(
        'flex',
        'w-full',
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
          'max-w-[82.5rem]',
          'gap-[3.75rem]',
        )}
      >
        <MyInfoContainer userInfo={userInfo} />
        <MyStageContainer userStageInfo={userStageInfo} />
      </div>
    </div>
  );
};

export default MyPage;
