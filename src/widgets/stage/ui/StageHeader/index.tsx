import { useRouter } from 'next/navigation';
import CreateButton from '@/shared/ui/createButton';
import { cn } from '@/shared/utils/cn';

const StageHeader = () => {
  const { push } = useRouter();

  return (
    <div className={cn('flex h-full w-[95%] items-center justify-between')}>
      <h1 className={cn('midpad:text-body1e', 'text-body3e', 'text-white')}>
        참여하는 스테이지
      </h1>
      <div
        className={cn('flex items-center midpad:gap-[1.5rem]', 'gap-[0.5rem]')}
      >
        {/* <CreateButton onClick={() => push('/stage/create/fast')}>
          빠른 경기
        </CreateButton> */}
        <CreateButton onClick={() => push('/stage/create/official')}>
          공식 경기
        </CreateButton>
      </div>
    </div>
  );
};

export default StageHeader;
