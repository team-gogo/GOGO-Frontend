import { useEffect, useRef, useState } from 'react';
import { CheckingBoxIcon } from '@/shared/assets/svg';
import Button from '@/shared/ui/button';
import ModalLayout from '@/shared/ui/modalLayout';
import { cn } from '@/shared/utils/cn';

interface WastedModalProps {
  onClose: () => void;
  stageId: number;
}

const WastedModal = ({ onClose, stageId }: WastedModalProps) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (contentRef.current && !hasReachedBottom) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight <= 5;
      if (isAtBottom) {
        setHasReachedBottom(true);
        setIsButtonEnabled(true);
      }
    }
  };

  useEffect(() => {
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [hasReachedBottom]);

  const handleConfirm = () => {
    if (isChecked) {
      const now = new Date();
      now.setHours(23, 59, 59, 999);
      localStorage.setItem(`not_show_wasted_${stageId}`, now.toISOString());
    } else {
      localStorage.removeItem(`not_show_wasted_${stageId}`);
    }
    onClose();
  };

  return (
    <ModalLayout
      title="파산하셨습니다"
      onClose={onClose}
      containerClassName={cn(
        'rounded-lg',
        'bg-gray-700',
        'laptop:px-[40px]',
        'laptop:py-[36px]',
        'laptop:max-w-[55rem]',
        'w-full',
        'space-y-24',
        'px-[20px]',
        'py-[18px]',
        'midpad:max-w-[30rem]',
        'mobile:max-w-[20rem]',
        'max-h-[90vh]',
        'flex',
        'flex-col',
        'm-20',
      )}
    >
      <div
        ref={contentRef}
        className={cn(
          'w-full',
          'max-h-[45vh]',
          'text-gray-400',
          'overflow-y-auto',
          'flex-1',
          'scroll-smooth',
          'scrollbar-hide',
          '[&::-webkit-scrollbar]:hidden',
          '[-ms-overflow-style:none]',
          '[scrollbar-width:none]',
        )}
      >
        <p
          className={cn(
            'text-body2s',
            'mobile:text-body3s',
            'phone:text-body3s',
            'py-[0.5rem]',
          )}
        >
          &quot;The house always wins.&quot;– <br />
          불변의 진리
        </p>
        <p
          className={cn(
            'text-body2s',
            'mobile:text-body3s',
            'phone:text-body3s',
            'py-[0.5rem]',
          )}
        >
          도박은 언젠가 반드시 패배하게 됩니다. 수많은 선택과 예측 속에서 잠깐의
          승리는 달콤했을지 몰라도, 결과는 늘 같습니다. 당신의 패배는 확률의
          귀결이며, 시스템의 결과는 늘 같습니다. 당신의 패배는 확률의 귀결이며,
          시스템의 당연한 승리입니다.
        </p>
        <p
          className={cn(
            'text-body2s',
            'mobile:text-body3s',
            'phone:text-body3s',
            'py-[0.5rem]',
          )}
        >
          도박에서 한두 번 이길 수도 있습니다. 하지만 큰 수의 법칙에 따르면
          게임이 반복될수록 확률은 원래의 기대값에 수렴합니다. 즉, 시간이
          지날수록 결국 당신은 잃게 되어 있습니다. 카지노, 베팅 사이트, 심지어
          친구들과의 내기까지 모두 수학적으로 설계된 함정입니다.
        </p>
        <p
          className={cn(
            'text-body2s',
            'mobile:text-body3s',
            'phone:text-body3s',
            'py-[0.5rem]',
          )}
        >
          그리고 도박이 남기는 것은 단순한 패배가 아닙니다. 청소년 도박 중독자는
          성인이 되어서도 도박을 끊기 어려우며, 초기의 작은 승리는 더 큰 중독을
          불러옵니다. 결국 빚과 신용 문제, 심지어 범죄로 이어질 수도 있습니다.
          도박은 재미일 수 있지만, 중독은 현실을 무너뜨립니다.
        </p>
        <p
          className={cn(
            'text-body2s',
            'mobile:text-body3s',
            'phone:text-body3s',
            'py-[0.5rem]',
            'text-white',
          )}
        >
          Team. GOGO는 청소년 불법 도박 근절 캠페인과 함께, 한 번의 기회로
          건강한 리셋을 제공합니다.
        </p>
        <p
          className={cn(
            'text-body2s',
            'mobile:text-body3s',
            'phone:text-body3s',
            'py-[0.5rem]',
            'text-white',
          )}
        >
          2층 홈베이스에 비치되어있는 서약서를 작성하고 하고 제출함에 제출하면
          한 번의 기회로 포인트를 지원받을 수 있습니다. (전체 포인트의 평균,
          최소 3만, 최대 5만)
        </p>
        <p
          className={cn(
            'text-body3s',
            'mobile:text-body3s',
            'phone:text-body3s',
            'py-[0.5rem]',
            'text-white',
          )}
        >
          <span className="text-body3s font-[800]">
            그러나 다시는 같은 실수를 반복하지 마세요.
          </span>
        </p>
      </div>

      <Button
        className={cn('w-full', 'mt-6')}
        disabled={!isButtonEnabled}
        onClick={handleConfirm}
      >
        확인
      </Button>
      <div
        className={cn('flex', 'items-center', 'gap-2', 'cursor-pointer')}
        onClick={() => setIsChecked(!isChecked)}
      >
        <CheckingBoxIcon size={28} isChecked={isChecked} />
        <p
          className={cn(
            'text-body2s',
            'text-gray-400',
            'mobile:text-body3s',
            'phone:text-body3s',
            'p-[0.5rem]',
          )}
        >
          오늘 다시 보지 않기
        </p>
      </div>
    </ModalLayout>
  );
};

export default WastedModal;
