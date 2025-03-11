import { Dispatch, SetStateAction, useState } from 'react';
import {
  BadmintonIcon,
  BaseBallIcon,
  BasketBallIcon,
  LOLIcon,
  SoccerIcon,
  VolleyBallIcon,
} from '@/shared/assets/icons';
import { CategoryType } from '@/shared/types/createStage';
import { cn } from '@/shared/utils/cn';

const categoryList: {
  name: string;
  value: CategoryType;
  icon?: ({ size, color }: { size?: number; color?: string }) => JSX.Element;
}[] = [
  { name: '축구', value: 'SOCCER', icon: SoccerIcon },
  { name: '농구', value: 'BASKET_BALL', icon: BasketBallIcon },
  { name: '야구', value: 'BASE_BALL', icon: BaseBallIcon },
  { name: '배구', value: 'VOLLEY_BALL', icon: VolleyBallIcon },
  { name: '배드민턴', value: 'BADMINTON', icon: BadmintonIcon },
  { name: 'LoL (League of Legends)', value: 'LOL', icon: LOLIcon },
  { name: '기타(직접입력)', value: 'ETC' },
];

interface AddGameButtonProps {
  gameList: `${CategoryType}-${number}`[];
  setGameList: Dispatch<SetStateAction<`${CategoryType}-${number}`[]>>;
}

const AddGameButton = ({ gameList, setGameList }: AddGameButtonProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<CategoryType | null>(
    null,
  );

  const handleAddButtonClick = (value: CategoryType) => {
    const newGame: `${CategoryType}-${number}` = `${value}-${gameList.length}`;

    return setGameList((prev) => [...prev, newGame]);
  };

  return (
    <div
      className={cn(
        'w-full',
        'flex',
        'mt-18',
        'mb-26',
        'items-center',
        'text-main-500',
        'text-body3s',
      )}
    >
      종류 <div className={cn('w-1', 'h-[32px]', 'bg-gray-600', 'mx-20')} />{' '}
      <div className={cn('flex', 'gap-16')}>
        {categoryList.map(({ name, value, icon }) => (
          <button
            key={value}
            className={cn(
              'px-[12px]',
              'py-[10px]',
              'rounded-lg',
              'border-solid',
              'border-main-500',
              'flex',
              'items-center',
              'gap-16',
              hoveredCategory === value
                ? ['bg-main-500', 'text-white']
                : ['text-main-500'],
            )}
            onMouseEnter={() => setHoveredCategory(value)}
            onMouseLeave={() => setHoveredCategory(null)}
            onClick={() => handleAddButtonClick(value)}
            type="button"
          >
            {icon &&
              icon({
                size: 20,
                color: hoveredCategory === value ? '#FFFFFF' : '#526FFE',
              })}
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AddGameButton;
