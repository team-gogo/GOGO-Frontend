import { useRouter } from 'next/navigation';
import CreateButton from '@/shared/ui/createButton';
import { cn } from '@/shared/utils/cn';

const StageHeader = () => {
  const { push } = useRouter();

  return (
    <div className={cn('flex w-full items-center justify-between')}>
      <h1 className={cn('text-body1e text-white')}>참여하는 스테이지</h1>
      <div className={cn('flex items-center gap-[1.5rem]')}>
        <CreateButton onClick={() => push('/stage/create/fast')}>
          빠른 경기 생성
        </CreateButton>
        <CreateButton onClick={() => push('/stage/create/official')}>
          학교 공식 행사 생성
        </CreateButton>
      </div>
    </div>
  );
};

export default StageHeader;
