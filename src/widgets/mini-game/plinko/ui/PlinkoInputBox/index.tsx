import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { PlinkoInputHeader, RiskBox } from '@/entities/mini-game';
import { LineStroke, WarningIcon } from '@/shared/assets/svg';
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
  minBetLimit: number;
  maxBetLimit: number;
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
  minBetLimit,
  maxBetLimit,
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
      )}
    >
      <div className={cn('flex', 'w-full', 'flex-col', 'gap-[6.25rem]')}>
        <div className={cn('flex', 'flex-col', 'gap-[3rem]')}>
          <div className={cn('flex', 'flex-col', 'gap-[1.5rem]')}>
            <PlinkoInputHeader money={money} ticket={ticket} />
            <div className={cn('flex', 'flex-col', 'gap-[0.25rem]')}>
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
                min={minBetLimit}
                max={maxBetLimit}
              />
              <div className={cn('flex', 'items-center', 'gap-8', 'mt-4')}>
                <WarningIcon />
                <p className={cn('text-caption3s text-gray-400')}>
                  최소 배팅 금액 : {minBetLimit}
                </p>
                <LineStroke height={16} />
                <p className={cn('text-caption3s text-gray-400')}>
                  최대 배팅 금액 : {maxBetLimit}
                </p>
              </div>
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
