import { UseFormSetValue } from 'react-hook-form';
import { OfficialStageData } from '@/shared/types/stage/create/official';
import { MiniGameType } from '../constants/miniGames';

export const getIconColor = (isActive: boolean) =>
  isActive ? '#526FFE' : '#898989';

export const toggleMiniGame = (
  game: MiniGameType,
  isActive: boolean,
  setValue: UseFormSetValue<OfficialStageData>,
) => {
  if (isActive) {
    setValue(`miniGame.${game}.maxBettingPoint`, null);
    setValue(`miniGame.${game}.minBettingPoint`, null);
    setValue(`miniGame.${game}.initialTicketCount`, null);
  }
  setValue(`miniGame.${game}.isActive`, !isActive);
};
