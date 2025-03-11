import { cn } from '@/shared/utils/cn';
import {
  MatchContainer,
  PointContainer,
  TotalPointContainer,
} from '@/widgets/my/bet';

const MyBetPage = () => {
  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'flex-col',
        'items-center',
        'justify-center',
        'py-[3.75rem]',
        'px-[1rem]',
      )}
    >
      <div
        className={cn(
          'flex',
          'flex-col',
          'w-full',
          'max-w-[82.5rem]',
          'gap-[3.75rem]',
        )}
      >
        <div className={cn('w-full', 'flex', 'flex-col', 'gap-[1.5rem]')}>
          <TotalPointContainer point={900000} />
          <PointContainer points={[]} />
        </div>
        <MatchContainer />
      </div>
    </div>
  );
};

export default MyBetPage;
