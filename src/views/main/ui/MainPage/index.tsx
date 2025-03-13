import { DateContainer } from '@/entities/main';
import { cn } from '@/shared/utils/cn';
import { SectionWrapper } from '@/widgets/main';

const MainPage = () => {
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
          'gap-[2.5rem]',
        )}
      >
        <div className={cn('w-full', 'flex', 'justify-between')}>
          <div className={cn('flex', 'items-center', 'gap-[1rem]', 'w-full')}>
            <h2 className={cn('text-title4s', 'text-gray-500')}>포인트</h2>
            <h2 className={cn('text-h3e', 'text-white')}>900P</h2>
          </div>
          <DateContainer />
        </div>
        <SectionWrapper text={'미니게임'} icon={<>hello</>} path="/my">
          hello2
        </SectionWrapper>
      </div>
    </div>
  );
};

export default MainPage;
