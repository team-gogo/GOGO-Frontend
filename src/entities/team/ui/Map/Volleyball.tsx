import { useRef, useState } from 'react';
import VolleyballSvg from '@/shared/assets/svg/Map/Volleyball';
import PlayerIcon from '@/shared/assets/svg/PlayerIcon';
import { MapComponentProps } from './types';

const VolleyballMap = ({ players, onPlayerDrag }: MapComponentProps) => {
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
      className="relative h-full w-full rounded-lg bg-[#1e1e1e]"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="absolute inset-0">
        <VolleyballSvg />
      </div>

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
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
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

export default VolleyballMap;
