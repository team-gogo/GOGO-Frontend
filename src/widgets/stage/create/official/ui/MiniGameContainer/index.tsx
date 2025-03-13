import { cloneElement } from 'react';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { SelectStageType } from '@/entities/stage/create/official';
import { CoinIcon, PlinkoIcon, ShellGameIcon } from '@/shared/assets/icons';
import { PointIcon } from '@/shared/assets/svg';
import { preventInvalidInputNumber } from '@/shared/model/preventInvalidInputNumber';
import { OfficialStageData } from '@/shared/types/stage/create/official';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

interface Props {
  register: UseFormRegister<OfficialStageData>;
  watch: UseFormWatch<OfficialStageData>;
  setValue: UseFormSetValue<OfficialStageData>;
}

const miniGames = [
  {
    type: 'yavarwee' as const,
    name: '야바위',
    icon: <ShellGameIcon size={60} color="#898989" />,
  },
  {
    type: 'coinToss' as const,
    name: '코인 플립',
    icon: <CoinIcon size={60} color="#898989" />,
  },
  {
    type: 'plinko' as const,
    name: '플링코',
    icon: <PlinkoIcon size={60} color="#898989" />,
  },
];

const MiniGameContainer = ({ register, watch, setValue }: Props) => {
  const selectedGames = watch('miniGame') || {};

  miniGames.forEach((game) => {
    register(`miniGame.${game.type}.isActive`);
  });

  return (
    <div className={cn('space-y-16')}>
      <p className={cn('text-body2e', 'text-white')}>미니게임</p>
      <div className={cn('flex', 'items-center', 'gap-24', 'tablet:flex-wrap')}>
        {miniGames.map((game) => {
          const isActive = selectedGames[game.type]?.isActive;
          const iconColor = isActive ? '#526FFE' : '#898989';

          return (
            <div key={game.type} className={cn('space-y-16', 'w-full')}>
              <SelectStageType
                icon={cloneElement(game.icon, { color: iconColor })}
                name={game.name}
                isSelected={isActive}
                onClick={() => {
                  setValue(`miniGame.${game.type}.isActive`, !isActive);
                }}
              />

              <div className={cn('flex', 'gap-16')}>
                <Input
                  {...register(`miniGame.${game.type}.maxBettingPoint`, {
                    required: '최대 배팅 포인트는 필수입니다.',
                  })}
                  placeholder="최대 배팅 포인트"
                  icon={<PointIcon fill="#898989" />}
                  type="number"
                  onInput={preventInvalidInputNumber}
                />
                <Input
                  {...register(`miniGame.${game.type}.minBettingPoint`, {
                    required: '최소 배팅 포인트는 필수입니다.',
                  })}
                  placeholder="최소 배팅 포인트"
                  icon={<PointIcon fill="#898989" />}
                  type="number"
                  onInput={preventInvalidInputNumber}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniGameContainer;
