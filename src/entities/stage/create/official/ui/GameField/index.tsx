import { UseFormRegister } from 'react-hook-form';
import { CircleEliminate, PersonIcon } from '@/shared/assets/svg';
import { OfficialStageData } from '@/shared/types/stage/create/official';
import Input from '@/shared/ui/input';
import SelectOption from '@/shared/ui/SelectOption';
import { cn } from '@/shared/utils/cn';

interface GameFieldProps {
  register: UseFormRegister<OfficialStageData>;
  index: number;
  remove: (index: number) => void;
  matchTypeOptions: { value: string; label: string }[];
}

const GameField: React.FC<GameFieldProps> = ({
  register,
  index,
  remove,
  matchTypeOptions,
}) => {
  return (
    <div
      className={cn(
        'flex',
        'gap-24',
        'w-full',
        'tablet:flex-wrap',
        'items-center',
      )}
    >
      <div className={cn('flex', 'gap-24', 'w-4/6', 'tablet:w-full')}>
        <div className={cn('w-2/3', 'tablet:w-full')}>
          <Input
            {...register(`game.${index}.name`)}
            placeholder="이름을 입력해주세요."
            maxLength={10}
          />
        </div>
        <div className={cn('w-1/3', 'tablet:w-full')}>
          <SelectOption
            {...register(`game.${index}.system`)}
            options={matchTypeOptions}
            initialLabel="경기 방식"
          />
        </div>
      </div>
      <div className={cn('flex', 'gap-24', 'w-2/6', 'tablet:w-full')}>
        <div className={cn('w-1/2')}>
          <Input
            {...register(`game.${index}.teamMinCapacity`, {
              valueAsNumber: true,
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
