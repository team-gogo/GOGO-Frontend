import { cn } from '@/shared/utils/cn';
import { CommunityItemContainer, CommunityToolbar } from '@/widgets/community';

const CommunityPage = () => {
  return (
    <div className={cn('flex', 'w-full', 'justify-center', 'px-16', 'pb-16')}>
      <div
        className={cn(
          'w-full',
          'h-full',
          'max-w-[1320px]',
          'space-y-[36px]',
          'pt-[40px]',
        )}
      >
        <CommunityToolbar />
        <CommunityItemContainer />
      </div>
    </div>
  );
};

export default CommunityPage;
