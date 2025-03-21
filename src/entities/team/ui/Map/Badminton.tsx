import { useRef, useState } from 'react';
import BadmintonSvg from '@/shared/assets/svg/Map/Badminton';
import PlayerIcon from '@/shared/assets/svg/PlayerIcon';
import { MapComponentProps } from './types';

const BadmintonMap = ({ players, onPlayerDrag }: MapComponentProps) => {
  const courtRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activePlayerId, setActivePlayerId] = useState<string | null>(null);

  const handleMouseDown = (e: React.MouseEvent, playerId: string) => {
    e.stopPropagation();
    setIsDragging(true);
    setActivePlayerId(playerId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && activePlayerId && courtRef.current && onPlayerDrag) {
      const courtRect = courtRef.current.getBoundingClientRect();
      const x = Math.max(
        0,
        Math.min(e.clientX - courtRect.left - 15, courtRect.width - 30),
      );
      const y = Math.max(
        0,
        Math.min(e.clientY - courtRect.top - 15, courtRect.height - 30),
      );

      onPlayerDrag(activePlayerId, x, y);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setActivePlayerId(null);
  };

  return (
    <div
      ref={courtRef}
      className="relative flex h-full w-full justify-end rounded-lg bg-[#1e1e1e]"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <BadmintonSvg />

      {players.map((player) => (
        <div
          key={player.id}
          style={{
            position: 'absolute',
            left: `${player.x}px`,
            top: `${player.y}px`,
            zIndex: 10,
            cursor:
              isDragging && activePlayerId === player.id ? 'grabbing' : 'grab',
          }}
          className="flex flex-col items-center"
          onMouseDown={(e) => handleMouseDown(e, player.id)}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full text-center text-white">
            <PlayerIcon className="h-3.5 w-3.5" />
          </div>
          <span className="mt-1 text-body3s">
            {player.name.includes(' ')
              ? player.name.split(' ')[1]
              : player.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default BadmintonMap;
