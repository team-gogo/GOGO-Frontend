import { cn } from '@/shared/utils/cn';
import { CommunityCreateContainer } from '@/widgets/community/create';

const CommunityCreatePage = () => {
  return (
    <div
      className={cn(
        'flex',
        'min-h-screen',
        'w-full',
        'items-center',
        'justify-center',
        'px-16',
        'py-16',
      )}
    >
      <CommunityCreateContainer />
    </div>
  );
};

export default CommunityCreatePage;
