import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';
import { Bracket } from '@/widgets/stage/bracket';

const CreateBracketPage = () => {
  return (
    <div className={cn('flex', 'justify-center', 'w-full')}>
      <div
        className={cn('w-full', 'max-w-[1320px]', 'flex', 'flex-col', 'mt-28')}
      >
        <div className={cn('m-30')}>
          <BackPageButton type="back" label="대진표" />
        </div>

        <Bracket />
        <button className={cn('m-30')}>
          <Button>확인</Button>
        </button>
      </div>
    </div>
  );
};

export default CreateBracketPage;
