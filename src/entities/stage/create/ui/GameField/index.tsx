import React from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { CircleEliminate, PersonIcon } from '@/shared/assets/svg';
import { StageData } from '@/shared/types/stage/create';
import Input from '@/shared/ui/input';
import SelectOption from '@/shared/ui/SelectOption';
import { cn } from '@/shared/utils/cn';
import { getCategoryLabel } from '../../constants/sportTypes';

interface GameFieldProps {
  register: UseFormRegister<StageData>;
  watch: UseFormWatch<StageData>;
  index: number;
  remove: (index: number) => void;
  matchTypeOptions: { value: string; label: string }[];
}

const GameField = ({
  register,
  watch,
  index,
  remove,
  matchTypeOptions,
}: GameFieldProps) => {
  const teamMinCapacity = watch(`game.${index}.teamMinCapacity`);
  const teamMaxCapacity = watch(`game.${index}.teamMaxCapacity`);
  const category = watch(`game.${index}.category`);

  const games = watch('game');
  const currentCategoryGames =
    games?.filter((game) => game.category === category) || [];
  const sportIndex =
    currentCategoryGames.findIndex((game) => game === games[index]) + 1;

  return (
    <div
      className={cn(
        'tablet:flex',
        'gap-24',
        'w-full',
        'flex-wrap',
        'items-center',
      )}
    >
      <div className={cn('flex', 'gap-24', 'tablet:w-4/6', 'w-full')}>
        <div className={cn('tablet:w-2/3', 'w-full')}>
          <Input
            {...register(`game.${index}.name`, {
              required: `경기의 ${getCategoryLabel(category)}${sportIndex}번 경기 이름은 필수입니다.`,
            })}
            placeholder="이름을 입력해주세요."
            maxLength={10}
          />
        </div>
        <div className={cn('tablet:w-1/3', 'w-full')}>
          <SelectOption
            {...register(`game.${index}.system`)}
            options={matchTypeOptions}
          />
        </div>
      </div>
      <div className={cn('flex', 'gap-24', 'tablet:w-2/6', 'w-full')}>
        <div className={cn('w-1/2')}>
          <Input
            {...register(`game.${index}.teamMinCapacity`, {
              valueAsNumber: true,
              required: `경기의 ${getCategoryLabel(category)} ${sportIndex}번 최소 경기 인원은 필수입니다.`,
              min: {
                value: 1,
                message: `경기의 ${getCategoryLabel(category)} ${sportIndex}번 최소 경기 인원은 1 이상의 값을 입력해주세요.`,
              },
              validate: (value) =>
                (value !== null && value <= (teamMaxCapacity ?? Infinity)) ||
                `경기의 ${getCategoryLabel(category)} ${sportIndex}번 최소 경기 인원은 최대 경기 인원보다 작거나 같아야 합니다.`,
            })}
            placeholder="최소 경기 인원"
            icon={<PersonIcon fill="#898989" />}
            type="number"
          />
        </div>
        <div className={cn('w-1/2')}>
          <Input
            {...register(`game.${index}.teamMaxCapacity`, {
              valueAsNumber: true,
              required: `경기의 ${getCategoryLabel(category)} ${sportIndex}번 최대 경기 인원은 필수입니다.`,
              min: {
                value: 1,
                message: `경기의 ${getCategoryLabel(category)} ${sportIndex}번 최대 경기 인원은 1 이상의 값을 입력해주세요.`,
              },
              validate: (value) =>
                (value !== null && value >= (teamMinCapacity ?? 0)) ||
                `경기의 ${getCategoryLabel(category)} ${sportIndex}번 최대 경기 인원은 최소 경기 인원보다 크거나 같아야 합니다.`,
            })}
            placeholder="최대 경기 인원"
            icon={<PersonIcon fill="#898989" />}
            type="number"
          />
        </div>
        <button type="button" onClick={() => remove(index)}>
          <CircleEliminate />
        </button>
      </div>
    </div>
  );
};

export default GameField;
