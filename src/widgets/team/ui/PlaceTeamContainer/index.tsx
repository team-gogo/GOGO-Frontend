'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DragStart,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { postTeam } from '@/entities/team/api/postTeam';
import SportMap from '@/entities/team/ui/Map';
import { Player } from '@/entities/team/ui/Map/types';
import PlayerDropdown from '@/entities/team/ui/PlayerDropdown';
import PlayerItem from '@/entities/team/ui/PlayerItem';
import MinusButtonIcon from '@/shared/assets/svg/MinusButtonIcon';
import PlayerIcon from '@/shared/assets/svg/PlayerIcon';
import PlusButtonIcon from '@/shared/assets/svg/PlusButtonIcon';
import { SportType } from '@/shared/model/sportTypes';
import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';

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

  if (!enabled) return null;

  return <Droppable {...props}>{children}</Droppable>;
};

interface DragEndResult {
  source: { droppableId: string; index: number };
  destination: { droppableId: string; index: number } | null;
  draggableId: string;
}

const PlaceTeamContainer = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [membersList, setMembersList] = useState<string[]>([]);
  const isMounted = useRef(false);
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const draggedPlayerRef = useRef<string | null>(null);
  const mousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const searchParams = useSearchParams();
  const sportParam = searchParams.get('sport');
  const teamNameParam = searchParams.get('teamName');
  const membersParam = searchParams.get('members');

  const getSportType = (): SportType => {
    if (
      sportParam === 'BASKET_BALL' ||
      sportParam === 'BADMINTON' ||
      sportParam === 'BASE_BALL'
    ) {
      return sportParam;
    }
    return 'VOLLEY_BALL';
  };

  const sportType: SportType = getSportType();

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (teamNameParam) {
      setTeamName(teamNameParam);
    }
    if (membersParam) {
      try {
        const parsedMembers = JSON.parse(decodeURIComponent(membersParam));
        setMembersList(parsedMembers);
      } catch (error) {
        console.error(error);
      }
    }
  }, [teamNameParam, membersParam]);

  const handleAddPlayer = useCallback(() => {
    if (selectedPlayer && selectedPlayer !== '인원 선택') {
      const newPlayer: Player = {
        id: `player-${Date.now()}`,
        name: selectedPlayer,
        x: 0,
        y: 0,
      };
      setPlayers((prev) => [...prev, newPlayer]);
      setSelectedPlayer('인원 선택');
    }
  }, [selectedPlayer]);

  const handlePlayerDrag = useCallback(
    (playerId: string, x: number, y: number) => {
      setPlayers((prev) =>
        prev.map((player) =>
          player.id === playerId ? { ...player, x, y } : player,
        ),
      );
    },
    [],
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        mousePositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDragging]);

  const onDragStart = useCallback((start: DragStart) => {
    setIsDragging(true);
    draggedPlayerRef.current = start.draggableId;
  }, []);

  const onDragEnd = useCallback(
    (result: DragEndResult) => {
      setIsDragging(false);
      const { source, destination, draggableId } = result;

      if (!destination) {
        return;
      }

      if (
        source.droppableId === 'playersList' &&
        destination.droppableId === 'playersList'
      ) {
        setPlayers((prev) => {
          const newPlayers = Array.from(prev);
          const [removed] = newPlayers.splice(source.index, 1);
          newPlayers.splice(destination.index, 0, removed);
          return newPlayers;
        });
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
        destination.droppableId === 'court'
      ) {
        const courtElement = document.querySelector(
          '[data-rbd-droppable-id="court"]',
        );

        if (!courtElement) return;

        const courtRect = courtElement.getBoundingClientRect();
        const { x: mouseX, y: mouseY } = mousePositionRef.current;

        const relativeX = Math.max(
          0,
          Math.min(mouseX - courtRect.left, courtRect.width - 100),
        );
        const relativeY = Math.max(
          0,
          Math.min(mouseY - courtRect.top, courtRect.height - 100),
        );

        setPlayers((prev) =>
          prev.map((player) =>
            player.id === draggableId
              ? { ...player, x: relativeX, y: relativeY }
              : player,
          ),
        );

        handlePlayerDrag(draggableId, relativeX, relativeY);
      }
    },
    [handlePlayerDrag],
  );

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const selectPlayer = useCallback((player: string) => {
    setSelectedPlayer(player);
    setIsDropdownOpen(false);
  }, []);

  const placedPlayers = useMemo(
    () => players.filter((player) => player.x !== 0 || player.y !== 0),
    [players],
  );

  const unplacedPlayers = useMemo(
    () => players.filter((player) => player.x === 0 && player.y === 0),
    [players],
  );

  const handleSubmit = useCallback(async () => {
    try {
      const participants = placedPlayers.map((player) => ({
        studentId: Number(
          membersList[players.findIndex((p) => p.id === player.id)],
        ),
        positionX: player.x.toString(),
        positionY: player.y.toString(),
      }));

      await postTeam({
        teamName,
        participants,
      });
      // router.push('/');
    } catch (error) {
      console.error(error);
    }
  }, [placedPlayers, membersList, players, teamName, router]);

  const PlayerList = useMemo(() => {
    const MemoizedPlayerList = ({
      players,
      provided,
    }: {
      players: Player[];
      provided: DroppableProvided;
    }) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className="flex min-h-[120px] flex-row flex-wrap gap-4 bg-transparent text-white"
      >
        {players.map((player, index) => (
          <Draggable key={player.id} draggableId={player.id} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  ...provided.draggableProps.style,
                }}
              >
                <PlayerItem
                  name={player.name}
                  isDragging={snapshot.isDragging}
                  className="mx-8 my-10"
                />
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    );

    return MemoizedPlayerList;
  }, []);

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="pointer-events-none fixed inset-0 z-[9999]" />
      <div className="relative flex h-screen flex-col bg-black p-30">
        <header className="mb-30">
          <BackPageButton type="back" label="팀 배치하기" />
        </header>
        <div className="mt-28 flex flex-1 flex-col">
          <h1 className="mb-28 text-h3e text-white">경기 이름</h1>
          <div className="px-4">
            <div className="mb-28 mt-28 flex items-center gap-1">
              <PlayerIcon className="mr-1" />
              <span className="text-body1s text-white">인원을 배치 하세요</span>
            </div>
            <div className="relative flex justify-between">
              <div className="relative w-[60%] pr-4">
                <div className="mb-3 flex items-center">
                  <PlayerDropdown
                    selectedPlayer={selectedPlayer}
                    isOpen={isDropdownOpen}
                    membersList={membersList}
                    onToggle={toggleDropdown}
                    onSelect={selectPlayer}
                    selectedPlayers={players.map((player) => player.name)}
                  />
                  <div className="flex w-52 justify-between px-10">
                    <button
                      onClick={handleAddPlayer}
                      className="relative flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-transparent text-white"
                      disabled={
                        !selectedPlayer || selectedPlayer === '인원 선택'
                      }
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlusButtonIcon />
                      </div>
                    </button>
                    <button className="relative ml-20 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-transparent">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <MinusButtonIcon />
                      </div>
                    </button>
                  </div>
                </div>

                <StrictModeDroppable
                  droppableId="playersList"
                  direction="horizontal"
                  type="PLAYER"
                >
                  {(provided) => (
                    <div className="relative">
                      <PlayerList
                        players={unplacedPlayers}
                        provided={provided}
                      />
                    </div>
                  )}
                </StrictModeDroppable>
              </div>

              <div className="relative h-[500px] w-[55%]">
                <StrictModeDroppable droppableId="court" type="PLAYER">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="relative h-full overflow-hidden rounded-lg"
                    >
                      <SportMap
                        type={sportType}
                        players={[]}
                        onPlayerDrag={handlePlayerDrag}
                      />
                      <div className="absolute inset-0">
                        {placedPlayers.map((player, index) => (
                          <Draggable
                            key={player.id}
                            draggableId={player.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  position: 'absolute',
                                  left: `${player.x}px`,
                                  top: `${player.y}px`,
                                  transform: snapshot.isDragging
                                    ? provided.draggableProps.style?.transform
                                    : 'none',
                                  ...provided.draggableProps.style,
                                }}
                              >
                                <PlayerItem
                                  name={player.name}
                                  isDragging={snapshot.isDragging}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </StrictModeDroppable>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-30 mt-30">
          <Button
            bg="bg-main-600"
            textColor="text-white"
            onClick={handleSubmit}
          >
            확인
          </Button>
        </div>
      </div>
    </DragDropContext>
  );
};

export default PlaceTeamContainer;
