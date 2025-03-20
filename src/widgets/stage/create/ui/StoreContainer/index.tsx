import { cloneElement } from 'react';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { SelectStageType } from '@/entities/stage/create';
import { TicketIcon } from '@/shared/assets/icons';
import { PointIcon } from '@/shared/assets/svg';
import { StageData } from '@/shared/types/stage/create';
import Input from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';
import { STORE_ITEMS } from '../../constants/storeItems';
import { getIconColor } from '../../model/miniGameUtils';
import { toggleStoreItem } from '../../model/storeUtils';

interface Props {
  register: UseFormRegister<StageData>;
  watch: UseFormWatch<StageData>;
  setValue: UseFormSetValue<StageData>;
}

type StoreItemType = 'coinToss' | 'yavarwee' | 'plinko';

const StoreContainer = ({ register, watch, setValue }: Props) => {
  const selectedGames = (watch('miniGame') || {}) as Record<
    StoreItemType,
    { isActive: boolean } | undefined
  >;
  const selectedShop = (watch('shop') || {}) as Record<
    StoreItemType,
    { isActive: boolean } | undefined
  >;

  STORE_ITEMS.forEach((store) => {
    register(`shop.${store.type}.isActive`);
  });

  return (
    <div className={cn('space-y-16')}>
      <p className={cn('text-body2e', 'text-white')}>상점</p>
      <div className={cn('flex', 'items-center', 'gap-24', 'tablet:flex-wrap')}>
        {STORE_ITEMS.map((item) => {
          const storeType = item.type as StoreItemType;
          const storeName = item.name;
          const isActive = selectedShop[storeType]?.isActive || false;
          const isGameSelected = selectedGames[storeType]?.isActive || false;
          const iconColor = getIconColor(isActive);

          return (
            <div key={storeType} className={cn('space-y-16', 'w-full')}>
              <SelectStageType
                icon={cloneElement(<item.icon />, { color: iconColor })}
                name={item.name}
                isSelected={isActive}
                onClick={() =>
                  toggleStoreItem(
                    storeType,
                    storeName,
                    isActive,
                    isGameSelected,
                    setValue,
                  )
                }
              />
              <Input
                {...register(`shop.${storeType}.price`, {
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
                {...register(`shop.${storeType}.quantity`, {
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
