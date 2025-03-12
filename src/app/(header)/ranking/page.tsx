import { cn } from '@/shared/utils/cn';
import { RankingPage } from '@/views/ranking';

const page = () => {
  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'items-center',
        'justify-center',
        'px-16',
        'py-[2.5rem]',
      )}
    >
      <RankingPage />
    </div>
  );
};

export default page;
