import { UseFormSetValue } from 'react-hook-form';
import { StageData } from '@/shared/types/stage/create';
import { MiniGameType } from '../constants/miniGames';

export const getIconColor = (isActive: boolean) =>
  isActive ? '#526FFE' : '#898989';

export const toggleMiniGame = (
  game: MiniGameType,
  isActive: boolean,
  setValue: UseFormSetValue<StageData>,
) => {
  if (isActive) {
    setValue(`miniGame.${game}.maxBettingPoint`, null);
    setValue(`miniGame.${game}.minBettingPoint`, null);
    setValue(`miniGame.${game}.initialTicketCount`, null);

    setValue(`shop.${game}.isActive`, false);
    setValue(`shop.${game}.price`, null);
    setValue(`shop.${game}.quantity`, null);
  }
  setValue(`miniGame.${game}.isActive`, !isActive);
};
