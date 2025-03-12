import { DateContainer } from '@/entities/main';
import { cn } from '@/shared/utils/cn';
import { SectionWrapper } from '@/widgets/main';

const MainPage = () => {
  return (
    <div className={cn('w-full', 'flex', 'justify-between')}>
      <DateContainer />
      <SectionWrapper text={'미니게임'} icon={<>hello</>} path="/my">
        hello2
      </SectionWrapper>
    </div>
  );
};

export default MainPage;
