import { cn } from '@/shared/utils/cn';
import { formatPoint } from '@/shared/utils/formatPoint';

interface TotalPointProps {
  point: number;
}

const TotalPointContainer = ({ point }: TotalPointProps) => {
  return (
    <div className={cn('flex', 'w-full', 'justify-between')}>
      <p className={cn('text-body1e', 'text-white')}>임시포인트 조회</p>
      <div className={cn('flex', 'items-center', 'gap-[1rem]')}>
        <h4 className={cn('text-h4s', 'text-gray-500')}>총 포인트</h4>
        <h4 className={cn('text-h4s', 'text-main-500')}>
          {formatPoint(point)}
        </h4>
      </div>
    </div>
  );
};

export default TotalPointContainer;
