import { DateContainer } from '@/entities/main';
import { cn } from '@/shared/utils/cn';

const MainPage = () => {
  return (
    <div className={cn('w-full', 'flex', 'justify-between')}>
      <DateContainer />
    </div>
  );
};

export default MainPage;
