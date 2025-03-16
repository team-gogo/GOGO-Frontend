import { UseFormSetValue } from 'react-hook-form';
import { toast } from 'react-toastify';
import { StageData } from '@/shared/types/stage/create';
import { StoreItemType } from '../constants/storeItems';

export const getIconColor = (isActive: boolean) =>
  isActive ? '#526FFE' : '#898989';

export const toggleStoreItem = (
  item: StoreItemType,
  isActive: boolean,
  isGameSelected: boolean,
  setValue: UseFormSetValue<StageData>,
) => {
  if (isActive) {
    setValue(`shop.${item}.price`, null);
    setValue(`shop.${item}.quantity`, null);
  }
  if (isGameSelected) {
    setValue(`shop.${item}.isActive`, !isActive);
  } else {
    toast.error(`${item} 미니게임을 먼저 선택해주세요.`);
  }
};
