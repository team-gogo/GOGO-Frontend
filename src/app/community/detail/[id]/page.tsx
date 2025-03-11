import { cn } from '@/shared/utils/cn';
import { CommunityDetailPage } from '@/views/community/detail';

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
      <CommunityDetailPage />
    </div>
  );
};

export default page;
