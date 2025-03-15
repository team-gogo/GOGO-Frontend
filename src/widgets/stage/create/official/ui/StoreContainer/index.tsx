import { cloneElement } from 'react';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { toast } from 'react-toastify';
import { SelectStageType } from '@/entities/stage/create/official';
import { TicketIcon } from '@/shared/assets/icons';
import { PointIcon } from '@/shared/assets/svg';
import { OfficialStageData } from '@/shared/types/stage/create/official';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

interface Props {
  register: UseFormRegister<OfficialStageData>;
  watch: UseFormWatch<OfficialStageData>;
  setValue: UseFormSetValue<OfficialStageData>;
}

export const storeItems = [
  {
    icon: <TicketIcon />,
    name: '야바위',
    type: 'yavarwee' as const,
  },
  {
    icon: <TicketIcon />,
    name: '코인토스',
    type: 'coinToss' as const,
  },
  {
    icon: <TicketIcon />,
    name: '플린코',
    type: 'plinko' as const,
  },
];

const StoreContainer = ({ register, watch, setValue }: Props) => {
  const selectedGames = watch('miniGame') || {};
  const selectedShop = watch('shop') || {};

  storeItems.forEach((store) => {
    register(`shop.${store.type}.isActive`);
  });

  return (
    <div className={cn('space-y-16')}>
      <p className={cn('text-body2e', 'text-white')}>상점</p>
      <div className={cn('flex', 'items-center', 'gap-24', 'tablet:flex-wrap')}>
        {storeItems.map((item) => {
          const isActive = selectedShop[item.type]?.isActive;
          const isGameSelected = selectedGames[item.type]?.isActive;
          const iconColor = isActive ? '#526FFE' : '#898989';

          return (
            <div key={item.type} className={cn('space-y-16', 'w-full')}>
              <SelectStageType
                icon={cloneElement(item.icon, { color: iconColor })}
                name={item.name}
                isSelected={isActive}
                onClick={() => {
                  if (isActive) {
                    setValue(`shop.${item.type}.price`, null);
                    setValue(`shop.${item.type}.quantity`, null);
                  }
                  if (isGameSelected) {
                    setValue(`shop.${item.type}.isActive`, !isActive);
                  } else {
                    toast.error(`${item.name} 미니게임을 먼저 선택해주세요.`);
                  }
                }}
              />
              <Input
                {...register(`shop.${item.type}.price`, {
                  required: isActive
                    ? `상점의 ${item.name} 티켓 가격은 필수입니다.`
                    : false,
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: `상점의 ${item.name} 티켓 가격은 0 이상의 값을 입력해주세요.`,
                  },
                })}
                placeholder={`${item.name} 티켓 가격`}
                icon={<PointIcon fill="#898989" />}
                type="number"
                disabled={!isActive || !isGameSelected}
              />
              <Input
                {...register(`shop.${item.type}.quantity`, {
                  required: isActive
                    ? `상점의 ${item.name} 티켓 수량은 필수입니다.`
                    : false,
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: `상점의 ${item.name} 티켓 수량은 0 이상의 값을 입력해주세요.`,
                  },
                })}
                placeholder="티켓 수량"
                icon={<TicketIcon size={24} />}
                type="number"
                disabled={!isActive || !isGameSelected}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StoreContainer;
