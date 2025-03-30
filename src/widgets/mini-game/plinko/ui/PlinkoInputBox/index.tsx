import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { PlinkoInputHeader, RiskBox } from '@/entities/mini-game';
import { PlinkoFormType } from '@/shared/types/mini-game';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

interface PlinkoInputBoxProps {
  money: number;
  ticket: number;
  isDisabled: boolean;
  register: UseFormRegister<PlinkoFormType>;
  setValue: UseFormSetValue<PlinkoFormType>;
  selectedRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  setSelectedRisk: (risk: 'LOW' | 'MEDIUM' | 'HIGH') => void;
  gameRunningCount: number;
}

const PlinkoInputBox = ({
  money,
  ticket,
  isDisabled,
  register,
  setValue,
  selectedRisk,
  setSelectedRisk,
  gameRunningCount,
}: PlinkoInputBoxProps) => {
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
        'min-w-[24.5rem]',
      )}
    >
      <div className={cn('flex', 'w-full', 'flex-col', 'gap-[6.25rem]')}>
        <div className={cn('flex', 'flex-col', 'gap-[3rem]')}>
          <div className={cn('flex', 'flex-col', 'gap-[1.5rem]')}>
            <PlinkoInputHeader money={money} ticket={ticket} />
            <div className={cn('flex', 'items-center', 'gap-[0.75rem]')}>
              <Input
                {...register('amount', {
                  required: '포인트 입력은 필수입니다.',
                })}
                placeholder="포인트 입력"
                bgColor="bg-gray-600"
                type="number"
                onChange={(e) => {
                  setValue('amount', Number(e.target.value));
                }}
              />
            </div>
          </div>

          <RiskBox
            register={register}
            setValue={setValue}
            selectedRisk={selectedRisk}
            setSelectedRisk={setSelectedRisk}
            gameRunningCount={gameRunningCount}
          />
        </div>
        <Button disabled={isDisabled} type="submit">
          게임 시작
        </Button>
      </div>
    </div>
  );
};

export default PlinkoInputBox;
