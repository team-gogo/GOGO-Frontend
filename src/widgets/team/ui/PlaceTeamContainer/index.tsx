'use client';

import { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Volleyball from '@/entities/team/ui/Map/Vollyball';
import PlayerIcon from '@/shared/assets/svg/PlayerIcon';
import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';

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
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      const newPlayer: Player = {
        id: `player-${Date.now()}`,
        name: newPlayerName.trim(),
        x: 0,
        y: 0,
      };
      setPlayers([...players, newPlayer]);
      setNewPlayerName('');
    }
  };

  const onDragEnd = (result: {
    source: { droppableId: string; index: number };
    destination: { droppableId: string; index: number } | null;
  }) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const newPlayers = [...players];
    const [movedPlayer] = newPlayers.splice(source.index, 1);

    if (destination.droppableId === 'court') {
      const newX = destination.index * 50;
      const newY = destination.index * 50;

      newPlayers.splice(destination.index, 0, {
        ...movedPlayer,
        x: newX,
        y: newY,
      });
    } else {
      newPlayers.splice(destination.index, 0, movedPlayer);
    }

    setPlayers(newPlayers);
  };

  return (
    <div>
      <header>
        <BackPageButton type="back" label="팀 생성하기" />
      </header>

      <h2>경기 이름</h2>

      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <div>
            <h3>인원을 배치 하세요</h3>

            <div>
              <input
                type="text"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                placeholder="인원 이름"
              />
              <button onClick={handleAddPlayer}>추가</button>
            </div>

            <StrictModeDroppable droppableId="playersList">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
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

          <div>
            <div style={{ height: '400px', width: '100%' }}>
              <div>
                <Volleyball />
              </div>

              <div>
                <StrictModeDroppable droppableId="court">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {players
                        .filter((player) => player.x !== 0 || player.y !== 0)
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
                                style={{
                                  position: 'absolute',
                                  left: `${player.x}px`,
                                  top: `${player.y}px`,
                                }}
                              >
                                <PlayerIcon />
                                <span>{player.name}</span>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </StrictModeDroppable>
              </div>
            </div>
          </div>
        </div>
      </DragDropContext>

      <div>
        <Button bg="bg-main-600" textColor="text-white">
          확인
        </Button>
      </div>
    </div>
  );
};

export default PlaceTeamContainer;
