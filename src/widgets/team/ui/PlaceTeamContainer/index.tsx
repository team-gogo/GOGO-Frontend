'use client';

import {
  DragDropContext,
  Droppable,
  Draggable,
  DragStart,
  DropResult,
} from '@hello-pangea/dnd';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { postTeam } from '@/entities/team/api/postTeam';
import SportMap from '@/entities/team/ui/Map';
import PlayerDropdown from '@/entities/team/ui/PlayerDropdown';
import PlayerItem from '@/entities/team/ui/PlayerItem';
import DeleteIcon from '@/shared/assets/svg/DeleteIcon';
import MinusButtonIcon from '@/shared/assets/svg/MinusButtonIcon';
import PlayerIcon from '@/shared/assets/svg/PlayerIcon';
import PlusButtonIcon from '@/shared/assets/svg/PlusButtonIcon';
import { SportType } from '@/shared/model/sportTypes';
import { Student } from '@/shared/types/stage/create';
import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';

interface Player {
  id: string;
  name: string;
  x: number;
  y: number;
  relativeX?: number;
  relativeY?: number;
}

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
  const [playerScale, setPlayerScale] = useState(1);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const gameIdParam = searchParams.get('gameId');

  const getSportType = (): SportType | null => {
    if (
      categoryParam === 'BASKET_BALL' ||
      categoryParam === 'BADMINTON' ||
      categoryParam === 'BASE_BALL' ||
      categoryParam === 'SOCCER' ||
      categoryParam === 'VOLLEY_BALL'
    ) {
      return categoryParam;
    }
    return null;
  };

  const sportType = getSportType();

  useEffect(() => {
    if (!sportType) {
      router.push('/team/create');
    }
  }, [sportType, router]);

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
      const courtElement = document.getElementById('court-droppable');
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
    if (svgBounds.width && svgBounds.height) {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => {
          if (player.x === 0 && player.y === 0) return player;

          const relX = player.relativeX ?? player.x / previousSvgBounds.width;
          const relY = player.relativeY ?? player.y / previousSvgBounds.height;

          const newX = relX * svgBounds.width;
          const newY = relY * svgBounds.height;

          return {
            ...player,
            x: newX,
            y: newY,
            relativeX: relX,
            relativeY: relY,
          };
        }),
      );
    }
  }, [
    svgBounds.width,
    svgBounds.height,
    previousSvgBounds.width,
    previousSvgBounds.height,
  ]);

  useEffect(() => {
    const updatePlayerScale = () => {
      const courtElement = document.getElementById('court-droppable');
      if (courtElement) {
        const svg = courtElement.querySelector('svg');
        if (svg) {
          const svgRect = svg.getBoundingClientRect();
          const baseWidth = 600;
          const minScale = isLargeScreen ? 0.6 : 0.5;
          const scale = Math.max(minScale, svgRect.width / baseWidth);
          setPlayerScale(scale);
        }
      }
    };

    updatePlayerScale();

    const courtElement = document.getElementById('court-droppable');
    if (courtElement) {
      const resizeObserver = new ResizeObserver(() => {
        updatePlayerScale();
      });
      resizeObserver.observe(courtElement);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [isLargeScreen]);

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
      const playerElement = document.getElementById(`player-${playerId}`);
      const courtElement = document.getElementById('court-droppable');

      if (!playerElement || !courtElement) return;

      const playerRect = playerElement.getBoundingClientRect();
      const scaledWidth = playerRect.width / playerScale;
      const scaledHeight = playerRect.height / playerScale;

      const relativeX = (x - svgBounds.left) / svgBounds.width;
      const relativeY = (y - svgBounds.top) / svgBounds.height;

      const absoluteX = relativeX * svgBounds.width;
      const absoluteY = relativeY * svgBounds.height;

      const maxX = svgBounds.width - scaledWidth;
      const maxY = svgBounds.height - scaledHeight;

      const boundedX = Math.max(0, Math.min(absoluteX, maxX));
      const boundedY = Math.max(0, Math.min(absoluteY, maxY));

      setPlayers((prev) =>
        prev.map((player) =>
          player.id === playerId
            ? {
                ...player,
                x: boundedX,
                y: boundedY,
                relativeX: boundedX / svgBounds.width,
                relativeY: boundedY / svgBounds.height,
              }
            : player,
        ),
      );
    },
    [svgBounds, playerScale],
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
      draggedPlayerRef.current = null;

      if (!result.destination) {
        return;
      }

      const { source, destination, draggableId } = result;

      if (source.droppableId === destination.droppableId) {
        if (source.droppableId === 'playersList') {
          setPlayers((prev) => {
            const newPlayers = [...prev];
            const [removed] = newPlayers.splice(source.index, 1);
            newPlayers.splice(destination.index, 0, removed);
            return newPlayers;
          });
        }
        return;
      }

      if (
        source.droppableId === 'playersList' &&
        destination.droppableId === 'court'
      ) {
        const courtElement = document.getElementById('court-droppable');
        if (!courtElement) {
          console.error('Court element not found');
          return;
        }

        const courtRect = courtElement.getBoundingClientRect();
        const playerElement = document.getElementById(
          `player-list-${draggableId}`,
        );
        if (!playerElement) return;

        const playerRect = playerElement.getBoundingClientRect();
        const dropX =
          mousePositionRef.current.x - courtRect.left - playerRect.width / 2;
        const dropY =
          mousePositionRef.current.y - courtRect.top - playerRect.height / 2;

        const boundedX = Math.max(
          0,
          Math.min(dropX, svgBounds.width - playerRect.width),
        );
        const boundedY = Math.max(
          0,
          Math.min(dropY, svgBounds.height - playerRect.height),
        );

        setPlayers((prev) =>
          prev.map((player) =>
            player.id === draggableId
              ? {
                  ...player,
                  x: boundedX,
                  y: boundedY,
                  relativeX: boundedX / svgBounds.width,
                  relativeY: boundedY / svgBounds.height,
                }
              : player,
          ),
        );
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
        gameId: String(gameIdParam),
      });
      router.push('/stage');
      toast.success('팀 생성이 완료되었습니다.');
    } catch (error) {
      console.error(error);
      toast.error('팀 생성에 실패했습니다.');
    }
  }, [placedPlayers, membersList, players, teamName, router, gameIdParam]);

  const handleGlobalMouseMove = useCallback(
    (e: MouseEvent, playerId: string) => {
      if (!draggedPlayerRef.current) return;

      const playerElement = document.getElementById(`player-${playerId}`);
      if (!playerElement) return;

      const playerRect = playerElement.getBoundingClientRect();
      const courtElement = document.getElementById('court-droppable');
      if (!courtElement) return;

      const parentRect = courtElement.getBoundingClientRect();
      const scaledWidth = playerRect.width / playerScale;
      const scaledHeight = playerRect.height / playerScale;

      const x = Math.max(
        svgBounds.left,
        Math.min(
          e.clientX - parentRect.left - scaledWidth / 2,
          svgBounds.left + svgBounds.width - scaledWidth,
        ),
      );
      const y = Math.max(
        svgBounds.top,
        Math.min(
          e.clientY - parentRect.top - scaledHeight / 2,
          svgBounds.top + svgBounds.height - scaledHeight,
        ),
      );

      handlePlayerDrag(draggedPlayerRef.current, x, y);
    },
    [handlePlayerDrag, svgBounds, playerScale],
  );

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1280);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleDeletePlayer = useCallback((playerId: string) => {
    setPlayers((prev) => {
      const playerToDelete = prev.find((p) => p.id === playerId);
      if (!playerToDelete) return prev;
      const filteredPlayers = prev.filter((p) => p.id !== playerId);

      return filteredPlayers;
    });
  }, []);

  if (!sportType) {
    return null;
  }

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="pointer-events-none fixed inset-0 z-[9999]" />
      <div
        className={`relative flex flex-col bg-black p-30 ${!isLargeScreen ? 'min-h-screen' : 'h-screen'}`}
      >
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
            <div
              className={`relative flex ${isLargeScreen ? 'flex-row justify-between' : 'flex-col items-center gap-8'}`}
            >
              <div
                className={`relative ${isLargeScreen ? 'w-[60%] pr-4' : 'mb-6 w-full'}`}
              >
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
                    <button
                      className={`relative ml-20 flex h-[30px] min-w-[80px] cursor-pointer items-center gap-1 rounded-full bg-transparent px-2 ${
                        isDeleteMode ? 'text-[#FF4646]' : 'text-[#6B6B6B]'
                      }`}
                      onClick={() => setIsDeleteMode(!isDeleteMode)}
                    >
                      <div>
                        <MinusButtonIcon isActive={isDeleteMode} />
                      </div>
                      <span className="ml-4 text-lg font-bold">빼기</span>
                    </button>
                  </div>
                </div>

                <div className="w-full overflow-x-auto pb-4">
                  <div className="inline-flex min-w-full">
                    <Droppable
                      droppableId="playersList"
                      direction="horizontal"
                      type="PLAYER"
                      isDropDisabled={false}
                    >
                      {(provided) => (
                        <div className="relative">
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            id="players-list-droppable"
                            className="flex min-h-[90px] flex-row flex-nowrap gap-3 bg-transparent text-white"
                          >
                            {unplacedPlayers.map((player, index) => (
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
                                    id={`player-list-${player.id}`}
                                    style={{
                                      ...provided.draggableProps.style,
                                      position: 'relative',
                                    }}
                                  >
                                    {isDeleteMode && (
                                      <button
                                        className="absolute -left-1 -top-1 z-10 cursor-pointer"
                                        onClick={() =>
                                          handleDeletePlayer(player.id)
                                        }
                                        style={{ transform: 'scale(0.8)' }}
                                      >
                                        <DeleteIcon />
                                      </button>
                                    )}
                                    <PlayerItem
                                      name={player.name}
                                      isDragging={snapshot.isDragging}
                                      className="mx-2 my-3"
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        </div>
                      )}
                    </Droppable>
                  </div>
                </div>
              </div>

              <div
                className={`relative ${isLargeScreen ? 'h-[500px] w-[55%]' : 'mb-10 flex h-auto min-h-[450px] w-full justify-center'}`}
              >
                <Droppable
                  droppableId="court"
                  type="PLAYER"
                  isDropDisabled={false}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`relative h-full overflow-visible rounded-lg ${!isLargeScreen ? 'mx-auto' : ''}`}
                      id="court-droppable"
                    >
                      <div
                        className={`relative h-full ${!isLargeScreen ? 'flex items-center justify-center pb-10' : ''}`}
                      >
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
                            position: 'relative',
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
                                  id={`player-${player.id}`}
                                  style={{
                                    ...provided.draggableProps.style,
                                    position: 'absolute',
                                    left: `${player.x}px`,
                                    top: `${player.y}px`,
                                    transform: `scale(${playerScale})`,
                                    transformOrigin: 'center center',
                                    transition: snapshot.isDragging
                                      ? 'none'
                                      : 'transform 0.2s, left 0.2s, top 0.2s',
                                    zIndex:
                                      snapshot.isDragging ||
                                      draggingPlayerId === player.id
                                        ? 99999
                                        : 1,
                                    pointerEvents: 'auto',
                                  }}
                                  onMouseDown={(e) => {
                                    if (e.button === 0) {
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
                                      width: '90px',
                                      height: '90px',
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
                </Droppable>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`mb-30 mt-30 ${!isLargeScreen ? 'flex justify-center pb-16' : ''}`}
        >
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
