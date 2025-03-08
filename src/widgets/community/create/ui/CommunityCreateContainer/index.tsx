import { PageTitleBar } from '@/entities/community/create';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

const CommunityCreateContainer = () => {
  return (
    <div className={cn('w-full', 'max-w-[1320px]', 'space-y-[72px]')}>
      <PageTitleBar />
      <div className={cn('space-y-[397px]')}>
        <div className={cn('space-y-[32px]')}>
          <Input placeholder="제목을 입력해주세요." />
          <Input placeholder="내용을 입력해주세요." />
        </div>
        <Button>완료</Button>
      </div>
    </div>
  );
};

export default CommunityCreateContainer;
