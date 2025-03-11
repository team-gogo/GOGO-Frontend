import { cn } from '@/shared/utils/cn';
import { MyInfoContainer, StageContainer } from '@/widgets/my';

const MyPage = () => {
  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'flex-col',
        'items-center',
        'justify-center',
        'py-[3.75rem]',
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
        <MyInfoContainer
          name={'김재균'}
          school={'광주소프트웨어마이스터고등학교'}
          sex={'남성'}
        />
        <StageContainer />
      </div>
    </div>
  );
};

export default MyPage;
