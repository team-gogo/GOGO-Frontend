import { cn } from '@/shared/utils/cn';

interface PlinkoBottomDivProps {
  buttonValues: number[];
  lastPassedIndex: number;
}

const PlinkoBottomDiv = ({
  buttonValues,
  lastPassedIndex,
}: PlinkoBottomDivProps) => {
  return (
    <div
      className={cn(
        'flex',
        'items-center',
        'justify-around',
        'gap-[0.5rem]',
        'flex-col',
        'w-full',
      )}
    >
      <div
        className={cn(
          'flex',
          'items-center',
          'w-[70%]',
          'justify-center',
          'gap-[0.3rem]',
        )}
      >
        {buttonValues.map((value, index) => {
          return (
            <div
              key={index}
              className={cn(
                'flex',
                'w-full',
                'px-[0.5vw]',
                'py-[0.1vw]',
                'justify-center',
                'items-center',
                'rounded-lg',
                'bg-main-100',
                'w-full',
                'max-w-[1.9rem]',
                'transition-all',
                'duration-100',
                index === lastPassedIndex && 'animate-bounce',
              )}
            >
              <p
                className={cn(
                  'min-text-[0.7vw]',
                  'text-[0.7vw]',
                  'min-leading-[1.375rem]',
                  'text-main-600',
                )}
              >
                {value}
              </p>

              <style>
                {`
                  @keyframes bounce {
                    0% {
                      transform: translateY(0);
                      }
                      50% {
                        transform: translateY(30%);
                        }
                        100% {
                          transform: translateY(0);
                          }
                          }
                          
                          .animate-bounce {
                            animation: bounce 300ms cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
                            }
                            `}
              </style>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlinkoBottomDiv;
