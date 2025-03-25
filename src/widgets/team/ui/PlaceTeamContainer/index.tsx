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
  DropResult,
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
import { Student } from '@/shared/types/stage/create';
import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';

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

const PlaceTeamContainer = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [membersList, setMembersList] = useState<Student[]>([]);
  const isMounted = useRef(false);
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const draggedPlayerRef = useRef<string | null>(null);
  const mousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [draggingPlayerId, setDraggingPlayerId] = useState<string | null>(null);
  const [svgBounds, setSvgBounds] = useState<{
    width: number;
    height: number;
    left: number;
    top: number;
  }>({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });
  const [previousSvgBounds, setPreviousSvgBounds] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const searchParams = useSearchParams();
  const sportParam = searchParams.get('sport');
  const matchIdParam = searchParams.get('matchId');

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
    const storedTeamName = sessionStorage.getItem('teamName');
    const storedMembers = sessionStorage.getItem('members');

    if (storedTeamName) {
      setTeamName(storedTeamName);
    }
    if (storedMembers) {
      setMembersList(JSON.parse(storedMembers));
    }
  }, []);

  useEffect(() => {
    const updateSvgBounds = () => {
      const courtElement = document.querySelector(
        '[data-rbd-droppable-id="court"]',
      );
      if (courtElement) {
        const svg = courtElement.querySelector('svg');
        if (svg) {
          const svgRect = svg.getBoundingClientRect();
          const parentRect = courtElement.getBoundingClientRect();

          setPreviousSvgBounds({
            width: svgBounds.width,
            height: svgBounds.height,
          });

          setSvgBounds({
            width: svgRect.width,
            height: svgRect.height,
            left: svgRect.left - parentRect.left,
            top: svgRect.top - parentRect.top,
          });
        }
      }
    };

    updateSvgBounds();
    window.addEventListener('resize', updateSvgBounds);
    const timeoutId = setTimeout(updateSvgBounds, 100);

    return () => {
      window.removeEventListener('resize', updateSvgBounds);
      clearTimeout(timeoutId);
    };
  }, [sportType, svgBounds.width, svgBounds.height]);

  useEffect(() => {
    if (previousSvgBounds.width && previousSvgBounds.height) {
      const widthRatio = svgBounds.width / previousSvgBounds.width;
      const heightRatio = svgBounds.height / previousSvgBounds.height;

      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => {
          if (player.x === 0 && player.y === 0) return player;

          return {
            ...player,
            x: player.x * widthRatio,
            y: player.y * heightRatio,
          };
        }),
      );
    }
  }, [svgBounds.width, svgBounds.height]);

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
      const playerElement = document.querySelector(
        `[data-rbd-draggable-id="${playerId}"]`,
      );
      const courtElement = document.querySelector(
        '[data-rbd-droppable-id="court"]',
      );

      if (!playerElement || !courtElement) return;

      const playerRect = playerElement.getBoundingClientRect();

      const relativeX = (x - svgBounds.left) / svgBounds.width;
      const relativeY = (y - svgBounds.top) / svgBounds.height;

      const absoluteX = relativeX * svgBounds.width;
      const absoluteY = relativeY * svgBounds.height;

      const maxX = svgBounds.width - playerRect.width;
      const maxY = svgBounds.height - playerRect.height;

      const boundedX = Math.max(0, Math.min(absoluteX, maxX));
      const boundedY = Math.max(0, Math.min(absoluteY, maxY));

      setPlayers((prev) =>
        prev.map((player) =>
          player.id === playerId
            ? { ...player, x: boundedX, y: boundedY }
            : player,
        ),
      );
    },
    [svgBounds],
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
    (result: DropResult) => {
      setIsDragging(false);
      const { source, destination, draggableId } = result;

      if (!destination) {
        return;
      }

      if (
        source.droppableId === 'playersList' &&
        destination.droppableId === 'court'
      ) {
        const courtElement = document.querySelector(
          '[data-rbd-droppable-id="court"]',
        );
        const playerElement = document.querySelector(
          `[data-rbd-draggable-id="${draggableId}"]`,
        );

        if (!courtElement || !playerElement) return;

        const courtRect = courtElement.getBoundingClientRect();
        const playerRect = playerElement.getBoundingClientRect();
        const { x: mouseX, y: mouseY } = mousePositionRef.current;

        const relativeX = (mouseX - courtRect.left) / svgBounds.width;
        const relativeY = (mouseY - courtRect.top) / svgBounds.height;

        const absoluteX = relativeX * svgBounds.width;
        const absoluteY = relativeY * svgBounds.height;

        const boundedX = Math.max(
          svgBounds.left,
          Math.min(
            absoluteX - playerRect.width / 2,
            svgBounds.left + svgBounds.width - playerRect.width,
          ),
        );
        const boundedY = Math.max(
          svgBounds.top,
          Math.min(
            absoluteY - playerRect.height / 2,
            svgBounds.top + svgBounds.height - playerRect.height,
          ),
        );

        setPlayers((prev) =>
          prev.map((player) =>
            player.id === draggableId
              ? { ...player, x: boundedX, y: boundedY }
              : player,
          ),
        );
      } else {
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
        } else if (
          source.droppableId === 'court' &&
          destination.droppableId === 'playersList'
        ) {
          setPlayers((prev) =>
            prev.map((player) =>
              player.id === draggableId ? { ...player, x: 0, y: 0 } : player,
            ),
          );
        }
      }
    },
    [svgBounds],
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
      const participants = placedPlayers.map((player) => {
        const memberIndex = players.findIndex((p) => p.id === player.id);
        const member = membersList[memberIndex];
        return {
          studentId: member.studentId,
          positionX: player.x.toString(),
          positionY: player.y.toString(),
        };
      });

      await postTeam({
        teamName,
        participants,
        matchId: String(matchIdParam),
      });
      // router.push('/');
    } catch (error) {
      console.error(error);
    }
  }, [placedPlayers, membersList, players, teamName, router, matchIdParam]);

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

  const handleGlobalMouseMove = useCallback(
    (e: MouseEvent, playerId: string) => {
      if (!draggedPlayerRef.current) return;

      const playerElement = document.querySelector(
        `[data-rbd-draggable-id="${playerId}"]`,
      );

      if (!playerElement) return;

      const playerRect = playerElement.getBoundingClientRect();
      const courtElement = document.querySelector(
        '[data-rbd-droppable-id="court"]',
      );
      if (!courtElement) return;

      const parentRect = courtElement.getBoundingClientRect();

      const x = Math.max(
        svgBounds.left,
        Math.min(
          e.clientX - parentRect.left - playerRect.width / 2,
          svgBounds.left + svgBounds.width - playerRect.width,
        ),
      );
      const y = Math.max(
        svgBounds.top,
        Math.min(
          e.clientY - parentRect.top - playerRect.height / 2,
          svgBounds.top + svgBounds.height - playerRect.height,
        ),
      );

      handlePlayerDrag(draggedPlayerRef.current, x, y);
    },
    [handlePlayerDrag, svgBounds],
  );

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
                    membersList={membersList.map(
                      (member) =>
                        `${member.grade}${member.classNumber}${String(member.studentNumber).padStart(2, '0')} ${member.name}`,
                    )}
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
                      <div className="relative h-full">
                        <SportMap
                          type={sportType}
                          isMapDragging={draggingPlayerId !== null}
                          onPositionChange={(x, y) => {
                            if (draggingPlayerId && draggedPlayerRef.current) {
                              if (x === -1 && y === -1) {
                                setDraggingPlayerId(null);
                                draggedPlayerRef.current = null;
                                return;
                              }
                              handlePlayerDrag(draggedPlayerRef.current, x, y);
                            }
                          }}
                        />
                        <div
                          className="absolute"
                          style={{
                            left: `${svgBounds.left}px`,
                            top: `${svgBounds.top}px`,
                            width: `${svgBounds.width}px`,
                            height: `${svgBounds.height}px`,
                            pointerEvents: 'all',
                          }}
                        >
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
                                    transform: `translate3d(${player.x}px, ${player.y}px, 0)`,
                                    transition: snapshot.isDragging
                                      ? 'none'
                                      : 'transform 0.2s',
                                    zIndex:
                                      snapshot.isDragging ||
                                      draggingPlayerId === player.id
                                        ? 99999
                                        : 1,
                                    pointerEvents: 'auto',
                                    willChange: 'transform',
                                  }}
                                  onMouseDown={(e) => {
                                    if (
                                      e.button === 0 &&
                                      !snapshot.isDragging
                                    ) {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      setDraggingPlayerId(player.id);
                                      draggedPlayerRef.current = player.id;

                                      const handleMouseMove = (e: MouseEvent) =>
                                        handleGlobalMouseMove(e, player.id);

                                      const handleMouseUp = () => {
                                        setDraggingPlayerId(null);
                                        draggedPlayerRef.current = null;
                                        window.removeEventListener(
                                          'mousemove',
                                          handleMouseMove,
                                        );
                                        window.removeEventListener(
                                          'mouseup',
                                          handleMouseUp,
                                        );
                                      };

                                      window.addEventListener(
                                        'mousemove',
                                        handleMouseMove,
                                      );
                                      window.addEventListener(
                                        'mouseup',
                                        handleMouseUp,
                                      );
                                    }
                                  }}
                                >
                                  <PlayerItem
                                    name={player.name}
                                    isDragging={
                                      snapshot.isDragging ||
                                      draggingPlayerId === player.id
                                    }
                                    style={{
                                      position: 'relative',
                                      cursor: 'move',
                                      userSelect: 'none',
                                      touchAction: 'none',
                                      pointerEvents: 'auto',

                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                    className="transition-transform"
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </div>
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
