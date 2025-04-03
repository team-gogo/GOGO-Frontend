import {
  DragDropContext,
  Draggable,
  DragStart,
  Droppable,
} from '@hello-pangea/dnd';
import { useCallback, useEffect, useRef, useState } from 'react';
import SportMap from '@/entities/team/ui/Map';
import PlayerItem from '@/entities/team/ui/PlayerItem';
import { TeamDetailType } from '@/shared/types/match';

interface DetailFormationProps {
  category:
    | 'SOCCER'
    | 'BASKET_BALL'
    | 'BASE_BALL'
    | 'VOLLEY_BALL'
    | 'BADMINTON'
    // | 'LOL'
    | 'ETC';
  team1DetailData?: TeamDetailType;
  team2DetailData?: TeamDetailType;
  isModalUsed?: boolean;
}

interface Player {
  id: string;
  name: string;
  x: number;
  y: number;
  relativeX?: number;
  relativeY?: number;
  team: 'A' | 'B' | null;
}

const DetailFormation = ({
  category,
  team1DetailData,
  team2DetailData,
  isModalUsed = false,
}: DetailFormationProps) => {
  const draggedPlayerRef = useRef<string | null>(null);
  const mousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const [players, setPlayers] = useState<Player[]>([]);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [playerScale, setPlayerScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
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

  useEffect(() => {
    const mapCenterX = svgBounds.width / 2;

    if (team1DetailData?.participant) {
      const team1Players = team1DetailData.participant.map((participant) => ({
        id: participant.studentId.toString(),
        name: participant.name,
        x: parseFloat(participant.positionX),
        y: parseFloat(participant.positionY),
        team: 'A' as const, // 팀 A로 설정
      }));
      setPlayers((prev) => [...prev, ...team1Players]);
    }

    if (team2DetailData?.participant) {
      const team2Players = team2DetailData.participant.map((participant) => ({
        id: participant.studentId.toString(),
        name: participant.name,
        x: mapCenterX * 2 - parseFloat(participant.positionX),
        y: parseFloat(participant.positionY),
        team: 'B' as const, // 팀 B로 설정
      }));
      setPlayers((prev) => [...prev, ...team2Players]);
    }
  }, [team1DetailData, team2DetailData, svgBounds]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        mousePositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDragging]);

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
            width: Math.max(svgRect.width - 90),
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

  const onDragStart = useCallback((start: DragStart) => {
    setIsDragging(true);
    draggedPlayerRef.current = start.draggableId;
  }, []);

  const onDragEnd = useCallback(() => {
    setIsDragging(false);
    draggedPlayerRef.current = null;
  }, []);

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

      const baseMarginRatio = 0.02;
      const maxMarginRatio = 0.05;
      const marginScale = isLargeScreen
        ? 0
        : Math.min((500 - svgRect.height) / 500, 1);
      const verticalMarginRatio =
        baseMarginRatio + (maxMarginRatio - baseMarginRatio) * marginScale;
      const verticalMargin = viewBox.height * verticalMarginRatio;

      const horizontalMargin = scaledWidth * 0.01;
      const maxX = viewBox.width - scaledWidth - horizontalMargin;
      const maxY =
        viewBox.height * 0.8 - verticalMargin - scaledHeight * scaleY;
      const minY = verticalMargin;

      const boundedX = Math.max(
        horizontalMargin,
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

      const relativeX = boundedX / viewBox.width;
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

      const baseMarginRatio = 0.01;
      const maxMarginRatio = 0.02;
      const marginScale = isLargeScreen
        ? 0
        : Math.min((500 - svgRect.height) / 500, 1);
      const verticalMarginRatio =
        baseMarginRatio + (maxMarginRatio - baseMarginRatio) * marginScale;
      const verticalMargin = viewBox.height * verticalMarginRatio;

      const horizontalMargin = scaledWidth * 0.01;
      const maxX = isModalUsed
        ? viewBox.width / 2 - scaledWidth - horizontalMargin
        : viewBox.width - scaledWidth - horizontalMargin;
      const maxY = viewBox.height - verticalMargin - scaledHeight * scaleY;
      const minY = verticalMargin;

      const boundedX = Math.max(
        horizontalMargin,
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

      const relativeX = isModalUsed
        ? boundedX / (viewBox.width / 2)
        : boundedX / viewBox.width;
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

  if (!category) {
    return null;
  }

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="px-4">
        <div className="relative flex justify-center">
          <div
            className={`relative w-full ${isLargeScreen ? 'h-[500px]' : 'h-[400px]'}`}
            style={{
              maxWidth: isLargeScreen ? 'none' : '100%',
              minWidth: isModalUsed ? '660px' : '780px',
              margin: '0 auto',
            }}
          >
            <Droppable droppableId="court" type="PLAYER" isDropDisabled={false}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="relative h-full overflow-visible rounded-lg"
                  id="court-droppable"
                >
                  <div className="relative h-full">
                    <SportMap
                      type={category}
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
                      isModalUsed={isModalUsed}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        pointerEvents: 'all',
                      }}
                    >
                      {players.map((player, index) => (
                        <Draggable
                          key={index}
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
                                team={player.team}
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
    </DragDropContext>
  );
};

export default DetailFormation;
