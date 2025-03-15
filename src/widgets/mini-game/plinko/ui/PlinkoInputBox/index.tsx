import { PlinkoInputHeader, RiskBox } from '@/entities/mini-game';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

interface PlinkoInputBoxProps {
  money: number;
  ticket: number;
}

const PlinkoInputBox = ({ money, ticket }: PlinkoInputBoxProps) => {
  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'px-[1rem]',
        'py-[1.5rem]',
        'items-center',
        'rounded-xl',
        'bg-gray-700',
      )}
    >
      <div className={cn('flex', 'w-full', 'flex-col', 'gap-[6.25rem]')}>
        <div className={cn('flex', 'flex-col', 'gap-[3rem]')}>
          <div className={cn('flex', 'flex-col', 'gap-[1.5rem]')}>
            <PlinkoInputHeader money={money} ticket={ticket} />
            <div className={cn('flex', 'items-center', 'gap-[0.75rem]')}>
              <Input placeholder="포인트 입력" bgColor="bg-gray-600" />
              <Input placeholder="x2" bgColor="bg-gray-600" />
            </div>
          </div>

          <RiskBox />
        </div>
        <Button>게임 시작</Button>
      </div>
    </div>
  );
};

export default PlinkoInputBox;
