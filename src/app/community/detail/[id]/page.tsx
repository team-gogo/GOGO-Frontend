import {
  CommentInput,
  CommentItem,
  CommunityContent,
} from '@/entities/community/detail';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';

const page = () => {
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
      <div className={cn('w-full', 'max-w-[1320px]', 'space-y-[72px]')}>
        <BackPageButton />
        <CommunityContent />
        <CommentItem />
        <CommentInput />
      </div>
    </div>
  );
};

export default page;
