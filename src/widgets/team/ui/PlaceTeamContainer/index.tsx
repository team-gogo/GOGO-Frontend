'use client';

import { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Volleyball from '@/entities/team/ui/Map/Vollyball';
import PlayerIcon from '@/shared/assets/svg/PlayerIcon';
import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';

interface Player {
  id: string;
  name: string;
  x: number;
  y: number;
}

const StrictModeDroppable = ({
  children,
  ...props
}: React.ComponentProps<typeof Droppable>) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => {
      setEnabled(true);
    });

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};

const PlaceTeamContainer = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<string>('');
  const isMounted = useRef(false);
  const courtRef = useRef<HTMLDivElement>(null);
  const [isDraggingInCourt, setIsDraggingInCourt] = useState(false);
  const [activePlayerId, setActivePlayerId] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleAddPlayer = () => {
    if (selectedPlayer && selectedPlayer !== '인원 선택') {
      const newPlayer: Player = {
        id: `player-${Date.now()}`,
        name: selectedPlayer,
        x: 0,
        y: 0,
      };
      setPlayers([...players, newPlayer]);
      setSelectedPlayer('인원 선택');
    }
  };

  const handleCourtMouseMove = (e: React.MouseEvent) => {
    if (isDraggingInCourt && activePlayerId && courtRef.current) {
      const courtRect = courtRef.current.getBoundingClientRect();
      const x = Math.max(
        0,
        Math.min(e.clientX - courtRect.left - 15, courtRect.width - 30),
      );
      const y = Math.max(
        0,
        Math.min(e.clientY - courtRect.top - 15, courtRect.height - 30),
      );

      setPlayers((prev) =>
        prev.map((player) =>
          player.id === activePlayerId ? { ...player, x, y } : player,
        ),
      );
    }
  };

  const handleCourtMouseUp = () => {
    setIsDraggingInCourt(false);
    setActivePlayerId(null);
  };

  const handlePlayerMouseDown = (e: React.MouseEvent, playerId: string) => {
    e.stopPropagation();
    setIsDraggingInCourt(true);
    setActivePlayerId(playerId);
  };

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === 'playersList' &&
      destination.droppableId === 'playersList'
    ) {
      const newPlayers = Array.from(players);
      const [removed] = newPlayers.splice(source.index, 1);
      newPlayers.splice(destination.index, 0, removed);
      setPlayers(newPlayers);
      return;
    }

    if (
      source.droppableId === 'court' &&
      destination.droppableId === 'playersList'
    ) {
      setPlayers((prev) =>
        prev.map((player) =>
          player.id === draggableId ? { ...player, x: 0, y: 0 } : player,
        ),
      );
      return;
    }

    if (
      source.droppableId === 'playersList' &&
      destination.droppableId === 'court' &&
      courtRef.current
    ) {
      const courtRect = courtRef.current.getBoundingClientRect();

      const x = courtRect.width / 2 - 15;
      const y = courtRect.height / 2 - 15;

      setPlayers((prev) =>
        prev.map((player) =>
          player.id === draggableId ? { ...player, x, y } : player,
        ),
      );
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const selectPlayer = (player: string) => {
    setSelectedPlayer(player);
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="mt-20 p-4 pt-5">
        <BackPageButton type="back" label="팀 생성하기" />
      </header>

      <div className="px-4">
        <h1 className={cn('text-h3e', 'text-white', 'mb-24', 'mt-24')}>
          경기 이름
        </h1>

        <div className="mb-4 flex items-center gap-1">
          <PlayerIcon className="mr-1" />
          <span className="text-body1s">인원을 배치 하세요</span>
        </div>
        <div>
          <DragDropContext
            onDragEnd={onDragEnd}
            className="flex justify-between"
          >
            <div className="flex">
              <div className="w-[45%] pr-4">
                <div className="mb-3 flex items-center">
                  <div className="relative mr-2 flex-1">
                    <div
                      onClick={toggleDropdown}
                      className="flex cursor-pointer items-center justify-between rounded-md bg-[#1e1e1e] px-3 py-2 text-body3s"
                    >
                      <span>{selectedPlayer || '인원 선택'}</span>
                      <svg
                        className={`h-4 w-4 text-gray-400`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    {isDropdownOpen && (
                      <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-md bg-[#1e1e1e]">
                        {[
                          '김진원',
                          '이진원',
                          '박진원',
                          '최진원',
                          '정진원',
                          '강진원',
                        ].map((player) => (
                          <div
                            key={player}
                            className="cursor-pointer border-b border-[#2a2a2a] px-3 py-2 text-body3s"
                            onClick={() => selectPlayer(player)}
                          >
                            {player}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex">
                    <button
                      onClick={handleAddPlayer}
                      className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#2a2a2a]"
                      disabled={
                        !selectedPlayer || selectedPlayer === '인원 선택'
                      }
                    >
                      <span className="text-body2s">+</span>
                    </button>
                    <button className="ml-2 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#2a2a2a]">
                      <span className="text-body2s">-</span>
                    </button>
                  </div>
                </div>

                <StrictModeDroppable droppableId="playersList">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="bg-transparent"
                    >
                      {players
                        .filter((player) => player.x === 0 && player.y === 0)
                        .map((player, index) => (
                          <Draggable
                            key={player.id}
                            draggableId={player.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mb-[1px] bg-[#2a2a2a] px-3 py-2 text-body3s"
                              >
                                {player.name}
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </StrictModeDroppable>
              </div>
              <div className="w-[40%]">
                <StrictModeDroppable droppableId="court">
                  {(provided) => (
                    <div
                      ref={(el) => {
                        provided.innerRef(el);
                        courtRef.current = el;
                      }}
                      {...provided.droppableProps}
                      className="relative aspect-square h-[500px] w-[600px] max-w-full rounded-lg bg-[#1e1e1e]"
                      onMouseMove={handleCourtMouseMove}
                      onMouseUp={handleCourtMouseUp}
                      onMouseLeave={handleCourtMouseUp}
                    >
                      <div className="absolute inset-0">
                        <Volleyball />
                      </div>

                      {players
                        .filter((player) => player.x !== 0 || player.y !== 0)
                        .map((player) => (
                          <div
                            key={player.id}
                            style={{
                              position: 'absolute',
                              left: `${player.x}px`,
                              top: `${player.y}px`,
                              zIndex: 10,
                              cursor: 'grab',
                            }}
                            className="flex flex-col items-center"
                            onMouseDown={(e) =>
                              handlePlayerMouseDown(e, player.id)
                            }
                          >
                            <div className="flex h-7 w-7 items-center justify-center rounded-full text-black">
                              <PlayerIcon className="h-3.5 w-3.5" />
                            </div>
                            <span className="mt-1 text-body3s">
                              {player.name.includes(' ')
                                ? player.name.split(' ')[1]
                                : player.name}
                            </span>
                          </div>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </StrictModeDroppable>
              </div>
            </div>
          </DragDropContext>
        </div>
      </div>

      <div className="relative bottom-4 left-0 right-0 mt-32 px-4">
        <Button
          bg="bg-blue-600"
          textColor="text-white"
          className="w-full rounded-lg py-3 text-center text-body1s"
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export default PlaceTeamContainer;
