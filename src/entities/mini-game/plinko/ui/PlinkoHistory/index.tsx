import { cn } from '@/shared/utils/cn';

interface PlinkoHistory {
  opacity: number;
  buttonValuesForPassed550: number[];
}

const PlinkoHistory = ({
  opacity,
  buttonValuesForPassed550,
}: PlinkoHistory) => {
  return (
    <div
      className={cn(
        'absolute',
        'top-[50%]',
        'right-[2.5%]',
        'transform',
        'translate-y-[-50%]',
      )}
    >
      <div
        className={cn(
          'flex',
          'flex-col',
          'gap-[0.25rem]',
          'transition-opacity',
          'duration-1000',
        )}
        style={{ opacity }}
      >
        {buttonValuesForPassed550.slice(0, 4).map((value, idx) => (
          <div
            key={`${value}-${idx}`}
            className={cn(
              'flex',
              'flex-col',
              'bg-gray-400',
              'rounded-md',
              'px-[1rem]',
              'py-[0.5rem]',
              'items-center',
              'justify-center',
              'w-[4.25rem]',
            )}
          >
            <p>{value}X</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlinkoHistory;
