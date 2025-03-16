import { cloneElement } from 'react';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { SelectStageType } from '@/entities/stage/create/official';
import { TicketIcon } from '@/shared/assets/icons';
import { PointIcon } from '@/shared/assets/svg';
import { OfficialStageData } from '@/shared/types/stage/create/official';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';
import { MINI_GAMES } from '../../constants/miniGames';
import { getIconColor, toggleMiniGame } from '../../model/miniGameUtils';

interface Props {
  register: UseFormRegister<OfficialStageData>;
  watch: UseFormWatch<OfficialStageData>;
  setValue: UseFormSetValue<OfficialStageData>;
}

const MiniGameContainer = ({ register, watch, setValue }: Props) => {
  const selectedGames = watch('miniGame') || {};

  MINI_GAMES.forEach((game) => {
    register(`miniGame.${game.type}.isActive`);
  });

  return (
    <div className={cn('space-y-16')}>
      <p className={cn('text-body2e', 'text-white')}>미니게임</p>
      <div className={cn('flex', 'items-center', 'gap-24', 'tablet:flex-wrap')}>
        {MINI_GAMES.map((game) => {
          const isActive = selectedGames[game.type]?.isActive;
          const iconColor = getIconColor(isActive);

          return (
            <div key={game.type} className={cn('space-y-16', 'w-full')}>
              <SelectStageType
                icon={cloneElement(<game.icon size={60} />, {
                  color: iconColor,
                })}
                name={game.name}
                isSelected={isActive}
                onClick={() => toggleMiniGame(game.type, isActive, setValue)}
              />
              <div className={cn('flex', 'gap-16')}>
                <Input
                  {...register(`miniGame.${game.type}.maxBettingPoint`, {
                    required: isActive
                      ? `미니게임의 ${game.name} 최대 배팅 포인트는 필수입니다.`
                      : false,
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: `미니게임의 ${game.name} 최대 배팅 포인트는 0 이상의 값을 입력해주세요.`,
                    },
                    validate: (value) => {
                      const minValue = watch(
                        `miniGame.${game.type}.minBettingPoint`,
                      );
                      return (
                        !isActive ||
                        !value ||
                        !minValue ||
                        value >= minValue ||
                        `미니게임의 ${game.name} 최대 배팅 포인트는 최소 배팅 포인트보다 크거나 같아야 합니다.`
                      );
                    },
                  })}
                  placeholder="최대 배팅 포인트"
                  icon={<PointIcon fill="#898989" />}
                  type="number"
                  disabled={!isActive}
                />
                <Input
                  {...register(`miniGame.${game.type}.minBettingPoint`, {
                    required: isActive
                      ? `미니게임의 ${game.name} 최소 배팅 포인트는 필수입니다.`
                      : false,
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: `미니게임의 ${game.name} 최소 배팅 포인트는 0 이상의 값을 입력해주세요.`,
                    },
                    validate: (value) => {
                      const maxValue = watch(
                        `miniGame.${game.type}.maxBettingPoint`,
                      );
                      return (
                        !isActive ||
                        !value ||
                        !maxValue ||
                        value <= maxValue ||
                        `미니게임의 ${game.name} 최소 배팅 포인트는 최대 배팅 포인트보다 작거나 같아야 합니다.`
                      );
                    },
                  })}
                  placeholder="최소 배팅 포인트"
                  icon={<PointIcon fill="#898989" />}
                  type="number"
                  disabled={!isActive}
                />
              </div>
              <Input
                {...register(`miniGame.${game.type}.initialTicketCount`, {
                  required: isActive
                    ? `미니게임의 ${game.name} 초기 보유 티켓은 필수입니다.`
                    : false,
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: `미니게임의 ${game.name} 초기 보유 티켓은 0 이상의 값을 입력해주세요.`,
                  },
                })}
                placeholder="초기 보유 티켓"
                icon={<TicketIcon size={24} />}
                type="number"
                disabled={!isActive}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniGameContainer;
