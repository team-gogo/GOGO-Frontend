export interface Player {
  id: string;
  name: string;
  x: number;
  y: number;
}

export interface MapComponentProps {
  players: Player[];
  onPlayerDrag?: (playerId: string, x: number, y: number) => void;
}
