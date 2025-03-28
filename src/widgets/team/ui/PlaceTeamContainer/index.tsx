'use client';

import {
  DragDropContext,
  Droppable,
  Draggable,
  DragStart,
} from '@hello-pangea/dnd';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from 'react-toastify';
import { postTeam } from '@/entities/team/api/postTeam';
import SportMap from '@/entities/team/ui/Map';
import PlayerItem from '@/entities/team/ui/PlayerItem';
import FingerIcon from '@/shared/assets/svg/FingerIcon';
import { SportType } from '@/shared/model/sportTypes';
import { Student } from '@/shared/types/stage/create';
import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';

interface PlaceTeamContainerProps {
  params: {
    gameId: string;
    category: string;
  };
}

interface Player {
  id: string;
  name: string;
  x: number;
  y: number;
  relativeX?: number;
  relativeY?: number;
}

const PlaceTeamContainer = ({ params }: PlaceTeamContainerProps) => {
  const [players, setPlayers] = useState<Player[]>([]);
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
  const [playerScale, setPlayerScale] = useState(1);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  const { gameId, category } = params;

  const getSportType = (): SportType | null => {
    if (
      category === 'BASKET_BALL' ||
      category === 'BADMINTON' ||
      category === 'BASE_BALL' ||
      category === 'SOCCER' ||
      category === 'VOLLEY_BALL'
    ) {
      return category;
    }
    return null;
  };

  const sportType = getSportType();

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
      const members = JSON.parse(storedMembers);
      setMembersList(members);

      const courtElement = document.getElementById('court-droppable');
      const svg = courtElement?.querySelector('svg');

      if (courtElement && svg) {
        const svgRect = svg.getBoundingClientRect();
        const viewBox = svg.viewBox.baseVal;

        const initialPlayers = members.map(
          (member: Student, index: number) => ({
            id: `player-${index}`,
            name: `${member.grade}${member.classNumber}${String(member.studentNumber).padStart(2, '0')} ${member.name}`,
            x: viewBox.width / 4 / (viewBox.width / svgRect.width),
            y: viewBox.height / 2 / (viewBox.height / svgRect.height),
            relativeX: 0.25,
            relativeY: 0.5,
          }),
        );
        setPlayers(initialPlayers);
      }
    }
  }, []);

  useEffect(() => {
    const updateSvgBounds = () => {
      const courtElement = document.getElementById('court-droppable');
      if (courtElement) {
        const svg = courtElement.querySelector('svg');
        if (svg) {
          const courtRect = courtElement.getBoundingClientRect();
          const svgRect = svg.getBoundingClientRect();
          const viewBox = svg.viewBox.baseVal;

          const newBounds = {
            width: svgRect.width,
            height: svgRect.height,
            left: svgRect.left - courtRect.left,
            top: svgRect.top - courtRect.top,
          };

          setSvgBounds(newBounds);

          setPlayers((prevPlayers) =>
            prevPlayers.map((player) => {
              if (player.x === 0 && player.y === 0) return player;

              const scaleX = viewBox.width / svgRect.width;
              const scaleY = viewBox.height / svgRect.height;

              const svgX = player.relativeX
                ? player.relativeX * (viewBox.width / 2)
                : player.x * scaleX;
              const svgY = player.relativeY
                ? player.relativeY * viewBox.height
                : player.y * scaleY;

              const playerWidth = isLargeScreen ? 90 : 60;
              const playerHeight = isLargeScreen ? 90 : 60;
              const scale = isLargeScreen ? 0.9 : 0.6;
              const scaledWidth = playerWidth * scale * scaleX;
              const scaledHeight = playerHeight * scale * scaleY;

              const maxX = viewBox.width / 2 - scaledWidth;
              const maxY = viewBox.height - scaledHeight;

              const boundedX = Math.max(0, Math.min(svgX, maxX));
              const boundedY = Math.max(0, Math.min(svgY, maxY));

              const screenX = boundedX / scaleX;
              const screenY = boundedY / scaleY;

              return {
                ...player,
                x: screenX,
                y: screenY,
                relativeX: boundedX / (viewBox.width / 2),
                relativeY: boundedY / viewBox.height,
              };
            }),
          );
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
  }, [sportType, isLargeScreen, svgBounds.width, svgBounds.height]);

  useEffect(() => {
    const updatePlayerScale = () => {
      const courtElement = document.getElementById('court-droppable');
      if (courtElement) {
        const svg = courtElement.querySelector('svg');
        if (svg) {
          const svgRect = svg.getBoundingClientRect();
          const baseWidth = 600;
          const minWidth = 780;

          const effectiveWidth = Math.max(svgRect.width, minWidth);

          const minScale = isLargeScreen ? 0.8 : 0.6;
          const maxScale = isLargeScreen ? 0.9 : 0.6;
          const calculatedScale = effectiveWidth / baseWidth;
          const scale = Math.min(maxScale, Math.max(minScale, calculatedScale));
          setPlayerScale(scale);
        }
      }
    };

    updatePlayerScale();

    const courtElement = document.getElementById('court-droppable');
    if (courtElement) {
      const resizeObserver = new ResizeObserver(() => {
        updatePlayerScale();
        const svg = courtElement.querySelector('svg');
        if (svg) {
          const courtRect = courtElement.getBoundingClientRect();
          const svgRect = svg.getBoundingClientRect();
          setSvgBounds({
            width: Math.max(svgRect.width, 300),
            height: svgRect.height,
            left: svgRect.left - courtRect.left,
            top: svgRect.top - courtRect.top,
          });
        }
      });
      resizeObserver.observe(courtElement);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [isLargeScreen]);

  useEffect(() => {
    const updatePlayerPositions = () => {
      const courtElement = document.getElementById('court-droppable');
      const svg = courtElement?.querySelector('svg');

      if (!courtElement || !svg) return;

      const svgRect = svg.getBoundingClientRect();
      const viewBox = svg.viewBox.baseVal;

      const baseMarginRatio = 0.05;
      const maxMarginRatio = 0.25;
      const marginScale = isLargeScreen
        ? 0
        : Math.min((500 - svgRect.height) / 500, 1);
      const verticalMarginRatio =
        baseMarginRatio + (maxMarginRatio - baseMarginRatio) * marginScale;
      const verticalMargin = viewBox.height * verticalMarginRatio;

      const heightScale = isLargeScreen
        ? 1
        : Math.min(svgRect.height / 500, 0.7);

      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => {
          if (!player.relativeX || !player.relativeY) return player;

          const svgX = player.relativeX * (viewBox.width / 2);
          const svgY = (player.relativeY * viewBox.height) / heightScale;

          const playerWidth = isLargeScreen ? 90 : 60;
          const playerHeight = isLargeScreen ? 90 : 60;
          const scaledWidth = playerWidth * playerScale;
          const scaledHeight = playerHeight * playerScale;

          const maxX = viewBox.width / 2 - scaledWidth;
          const maxY = viewBox.height - verticalMargin - scaledHeight;
          const minY = verticalMargin;

          const boundedX = Math.max(0, Math.min(svgX, maxX));
          const boundedY = Math.max(minY, Math.min(svgY, maxY));

          const scaleX = viewBox.width / svgRect.width;
          const scaleY = viewBox.height / svgRect.height;

          const screenX = boundedX / scaleX;
          const screenY =
            ((boundedY - minY) / scaleY) * heightScale +
            verticalMargin / scaleY;

          const normalizedY = (boundedY - minY) / (maxY - minY);
          const relativeX = boundedX / (viewBox.width / 2);
          const relativeY = normalizedY * heightScale;

          return {
            ...player,
            x: screenX,
            y: screenY,
            relativeX,
            relativeY,
          };
        }),
      );
    };

    const resizeObserver = new ResizeObserver(() => {
      updatePlayerPositions();
    });

    const courtElement = document.getElementById('court-droppable');
    if (courtElement) {
      resizeObserver.observe(courtElement);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [isLargeScreen, playerScale]);

  const handlePlayerDrag = useCallback(
    (playerId: string, x: number, y: number) => {
      const playerElement = document.getElementById(`player-${playerId}`);
      const courtElement = document.getElementById('court-droppable');
      const svg = courtElement?.querySelector('svg');

      if (!playerElement || !courtElement || !svg) return;

      const svgRect = svg.getBoundingClientRect();
      const viewBox = svg.viewBox.baseVal;
      const playerWidth = isLargeScreen ? 90 : 60;
      const playerHeight = isLargeScreen ? 90 : 60;
      const scaledWidth = playerWidth * playerScale;
      const scaledHeight = playerHeight * playerScale;

      const scaleX = viewBox.width / svgRect.width;
      const scaleY = viewBox.height / svgRect.height;

      const svgX = (x - svgRect.left) * scaleX;
      const svgY = (y - svgRect.top) * scaleY;

      const baseMarginRatio = 0.05;
      const maxMarginRatio = 0.25;
      const marginScale = isLargeScreen
        ? 0
        : Math.min((500 - svgRect.height) / 500, 1);
      const verticalMarginRatio =
        baseMarginRatio + (maxMarginRatio - baseMarginRatio) * marginScale;
      const verticalMargin = viewBox.height * verticalMarginRatio;

      const maxX = viewBox.width / 2 - scaledWidth * scaleX;
      const maxY = viewBox.height - verticalMargin - scaledHeight * scaleY;
      const minY = verticalMargin;

      const boundedX = Math.max(
        0,
        Math.min(svgX - (scaledWidth * scaleX) / 2, maxX),
      );
      const boundedY = Math.max(
        minY,
        Math.min(svgY - (scaledHeight * scaleY) / 2, maxY),
      );

      const heightScale = isLargeScreen
        ? 1
        : Math.min(svgRect.height / 500, 0.7);

      const normalizedY = (boundedY - minY) / (maxY - minY);

      const screenX = boundedX / scaleX;
      const screenY =
        ((boundedY - minY) / scaleY) * heightScale + verticalMargin / scaleY;

      const relativeX = boundedX / (viewBox.width / 2);
      const relativeY = normalizedY * heightScale;

      setPlayers((prev) =>
        prev.map((player) =>
          player.id === playerId
            ? {
                ...player,
                x: screenX,
                y: screenY,
                relativeX,
                relativeY,
              }
            : player,
        ),
      );
    },
    [playerScale, isLargeScreen],
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

  const onDragEnd = useCallback(() => {
    setIsDragging(false);
    draggedPlayerRef.current = null;
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      const participants = players.map((player) => {
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
        gameId,
      });
      router.push('/stage');
      toast.success('팀 생성이 완료되었습니다.');
    } catch (error) {
      console.error(error);
      toast.error('팀 생성에 실패했습니다.');
    }
  }, [players, membersList, teamName, router, gameId]);

  const handleGlobalMouseMove = useCallback(
    (e: MouseEvent, playerId: string) => {
      if (!draggedPlayerRef.current) return;

      const playerElement = document.getElementById(`player-${playerId}`);
      const courtElement = document.getElementById('court-droppable');
      const svg = courtElement?.querySelector('svg');

      if (!playerElement || !courtElement || !svg) return;

      const svgRect = svg.getBoundingClientRect();
      const viewBox = svg.viewBox.baseVal;
      const playerWidth = isLargeScreen ? 90 : 60;
      const playerHeight = isLargeScreen ? 90 : 60;
      const scaledWidth = playerWidth * playerScale;
      const scaledHeight = playerHeight * playerScale;

      const scaleX = viewBox.width / svgRect.width;
      const scaleY = viewBox.height / svgRect.height;

      const svgX = (e.clientX - svgRect.left) * scaleX;
      const svgY = (e.clientY - svgRect.top) * scaleY;

      const baseMarginRatio = 0.05;
      const maxMarginRatio = 0.25;
      const marginScale = isLargeScreen
        ? 0
        : Math.min((500 - svgRect.height) / 500, 1);
      const verticalMarginRatio =
        baseMarginRatio + (maxMarginRatio - baseMarginRatio) * marginScale;
      const verticalMargin = viewBox.height * verticalMarginRatio;

      const maxX = viewBox.width / 2 - scaledWidth * scaleX;
      const maxY = viewBox.height - verticalMargin - scaledHeight * scaleY;
      const minY = verticalMargin;

      const boundedX = Math.max(
        0,
        Math.min(svgX - (scaledWidth * scaleX) / 2, maxX),
      );
      const boundedY = Math.max(
        minY,
        Math.min(svgY - (scaledHeight * scaleY) / 2, maxY),
      );

      const heightScale = isLargeScreen
        ? 1
        : Math.min(svgRect.height / 500, 0.7);

      const normalizedY = (boundedY - minY) / (maxY - minY);

      const screenX = boundedX / scaleX;
      const screenY =
        ((boundedY - minY) / scaleY) * heightScale + verticalMargin / scaleY;

      const relativeX = boundedX / (viewBox.width / 2);
      const relativeY = normalizedY * heightScale;

      setPlayers((prev) =>
        prev.map((player) =>
          player.id === playerId
            ? {
                ...player,
                x: screenX,
                y: screenY,
                relativeX,
                relativeY,
              }
            : player,
        ),
      );
    },
    [playerScale, isLargeScreen],
  );

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setIsLargeScreen(true);
      } else if (width < 1280) {
        setIsLargeScreen(false);
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
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
          <div className="flex flex-row items-center justify-between">
            <h1 className="mb-28 text-h3e text-white">경기 이름</h1>
            <div className="flex flex-row items-center justify-center gap-10">
              <FingerIcon />
              <h2 className="text-h3 text-white">인원을 배치 하세요</h2>
            </div>
          </div>
          <div className="px-4">
            <div className="relative flex justify-center">
              <div
                className={`relative w-full ${isLargeScreen ? 'h-[500px]' : 'h-[400px]'}`}
                style={{
                  maxWidth: isLargeScreen ? 'none' : '100%',
                  minWidth: '780px',
                  margin: '0 auto',
                }}
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
                      className="relative h-full overflow-visible rounded-lg"
                      id="court-droppable"
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
                              handlePlayerDrag(
                                draggedPlayerRef.current,
                                x + svgBounds.left,
                                y + svgBounds.top,
                              );
                            }
                          }}
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            pointerEvents: 'all',
                          }}
                        >
                          {players.map((player, index) => (
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
                                      width: isLargeScreen ? '90px' : '60px',
                                      height: isLargeScreen ? '90px' : '60px',
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
          className={`mb-28 mt-28 ${!isLargeScreen ? 'flex justify-center pb-16' : ''}`}
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
