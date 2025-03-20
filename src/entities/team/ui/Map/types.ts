import { SportType } from '@/shared/model/sportTypes';

export interface Player {
  id: string;
  name: string;
  x: number;
  y: number;
}

export interface SportMapProps {
  type: SportType;
  players: Player[];
  onPlayerDrag?: (playerId: string, x: number, y: number) => void;
}

export interface MapComponentProps {
  players: Player[];
  onPlayerDrag?: (playerId: string, x: number, y: number) => void;
}
