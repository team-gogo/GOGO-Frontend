import { useEffect, useState } from 'react';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { DeleteIcon, SelectIcon } from '@/shared/assets/icons';
import { HumanIcon } from '@/shared/assets/svg';
import {
  CategoryType,
  CreateOfficialStageFormType,
  SystemType,
} from '@/shared/types/createStage';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

interface GameInputBoxProps {
  register: UseFormRegister<CreateOfficialStageFormType>;
  watch: UseFormWatch<CreateOfficialStageFormType>;
  setValue: UseFormSetValue<CreateOfficialStageFormType>;
  handleDeleteButtonClick: (idx: number) => void;
  id: `${CategoryType}-${number}`;
}

const systemList: { name: string; value: SystemType }[] = [
  { name: '토너먼트', value: 'TOURNAMENT' },
  { name: '리그전', value: 'FULL_LEAGUE' },
  { name: '단판', value: 'SINGLE' },
];

const GameInputBox = ({
  register,
  watch,
  setValue,
  id,
  handleDeleteButtonClick,
}: GameInputBoxProps) => {
  const [isSelectClick, setIsSelectClick] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState<string>('');
  const [hoveredOption, setHoveredOption] = useState<SystemType | null>(null);
  const idx = Number(id.split('-')[1]);

  const handleSelectClick = (name: string, value: SystemType) => {
    setSelectedSystem(name);
    setValue(`game.${idx}.system`, value);
  };

  useEffect(() => {
    const category = id.split('-')[0] as CategoryType;

    setValue(`game.${idx}.category`, category);
  }, []);

  return (
    <div className={cn('w-[1392px]', 'flex', 'gap-[32px]')}>
      <div className={cn('w-[1320px]', 'flex', 'gap-24')}>
        <div
          className={cn('grow-[3]', 'flex', 'items-end', 'flex-col', 'gap-4')}
        >
          <Input
            placeholder="이름을 입력해주세요"
            {...register(`game.${idx}.name`)}
          />
          <p
            className={cn(
              'text-body3s',
              watch(`game.${idx}.name`) && watch(`game.${idx}.name`).length > 0
                ? 'text-main-600'
                : 'text-gray-500',
            )}
          >
            {(watch(`game.${idx}.name`) && watch(`game.${idx}.name`).length) ||
              0}
            /20
          </p>
        </div>
        <div
          className={cn(
            'grow',
            'bg-gray-700',
            'rounded-lg',
            'max-w-[200px]',
            'h-[56px]',
            'px-16',
            'py-12',
            'text-gray-400',
            'text-body3s',
            'flex',
            'items-center',
            'justify-between',
            'cursor-pointer',
            'relative',
          )}
          onClick={() => setIsSelectClick((prev) => !prev)}
        >
          {selectedSystem ? selectedSystem : '경기 방식'}
          <SelectIcon />
          {isSelectClick && (
            <div
              className={cn(
                'rounded-lg',
                'w-[200px]',
                'text-body3s',
                'bg-gray-700',
                'absolute',
                'top-[56px]',
                'left-0',
                'flex',
                'flex-col',
                'px-16',
                'py-20',
                'z-10',
                'shadow-[0px_0px_18px_0px_rgba(0,0,0,0.25)]',
              )}
            >
              {systemList.map(({ name, value }, idx) => (
                <button
                  className={cn(
                    'text-body3s',
                    'text-gray-400',
                    'flex',
                    'border-gray-600',
                    idx === 0
                      ? [
                          'border-0',
                          'border-b-[0.5px]',
                          'border-solid',
                          'pb-10',
                        ]
                      : idx === systemList.length - 1
                        ? [
                            'border-0',
                            'border-t-[0.5px]',
                            'border-solid',
                            'pt-10',
                          ]
                        : [
                            'border-0',
                            'border-t-[0.5px]',
                            'border-b-[0.5px]',
                            'border-solid',
                            'py-10',
                          ],
                    hoveredOption === value && ['text-body3e', 'text-white'],
                  )}
                  type="button"
                  key={value}
                  onClick={() => handleSelectClick(name, value)}
                  onMouseEnter={() => setHoveredOption(value)}
                  onMouseLeave={() => setHoveredOption(null)}
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className={cn('w-[200px]')}>
          <Input
            placeholder="최소 경기 인원"
            icon={<HumanIcon />}
            {...register(`game.${idx}.teamMinCapacity`)}
          />
        </div>
        <div className={cn('w-[200px]')}>
          <Input
            placeholder="최대 경기 인원"
            icon={<HumanIcon />}
            {...register(`game.${idx}.teamMaxCapacity`)}
          />
        </div>
      </div>
      <div>
        <button
          onClick={() => handleDeleteButtonClick(idx)}
          className={cn('mt-8')}
          type="button"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default GameInputBox;
