import { useRouter } from 'next/navigation';
import { LeftArrow } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

const PageTitleBar = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className={cn('flex', 'items-center', 'gap-24')}>
      <button onClick={handleBackClick}>
        <LeftArrow />
      </button>
      <h1 className={cn('text-h4s', 'text-white')}>커뮤니티 생성하기</h1>
    </div>
  );
};

export default PageTitleBar;
