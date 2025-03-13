import { cloneElement } from 'react';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { SelectStageType } from '@/entities/stage/create/official';
import { TicketIcon } from '@/shared/assets/icons';
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
          const iconColor = isActive ? '#526FFE' : '#898989';
          return (
            <div key={item.type} className={cn('space-y-16', 'w-full')}>
              <SelectStageType
                icon={cloneElement(item.icon, { color: iconColor })}
                name={item.name}
                isSelected={isActive}
                onClick={() => {
                  setValue(`shop.${item.type}.isActive`, !isActive);
                }}
              />
              <Input
                {...register(`shop.${item.type}.price`, {
                  required: `${item.name} 티켓 가격은 필수입니다.`,
                })}
                placeholder={`${item.name} 티켓 가격`}
                icon={<PointIcon fill="#898989" />}
                type="number"
                onInput={preventInvalidInputNumber}
              />
              <Input
                {...register(`shop.${item.type}.quantity`, {
                  required: `${item.name} 티켓 수량은 필수입니다.`,
                })}
                placeholder="티켓 수량"
                icon={<TicketIcon size={24} />}
                type="number"
                onInput={preventInvalidInputNumber}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StoreContainer;
