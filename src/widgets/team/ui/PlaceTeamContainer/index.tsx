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

  const onDragEnd = useCallback((result: DragEndResult) => {
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
        Math.min(mouseX - courtRect.left, courtRect.width),
      );
      const relativeY = Math.max(
        0,
        Math.min(mouseY - courtRect.top, courtRect.height),
      );

      setPlayers((prev) =>
        prev.map((player) =>
          player.id === draggableId
            ? { ...player, x: relativeX, y: relativeY }
            : player,
        ),
      );
    }
  }, []);

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
      router.push('/');
    } catch (error) {
      console.error('팀 생성 실패:', error);
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
                className={cn(
                  'mx-8 my-10 flex h-[100px] w-[100px] flex-col items-center justify-center rounded-full border-[#2a2a2a] bg-[#2a2a2a] p-10 text-center text-white',
                  snapshot.isDragging && 'opacity-50',
                )}
              >
                <PlayerIcon className="mb-1" />
                <span className="text-body3s text-white">{player.name}</span>
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
    <div className={cn('h-screen', 'bg-black', 'p-30', 'flex', 'flex-col')}>
      <header className={cn('mb-30')}>
        <BackPageButton type="back" label="팀 배치하기" />
      </header>
      <div className={cn('flex-1', 'flex', 'flex-col', 'mt-28')}>
        <h1 className={cn('text-h3e', 'text-white', 'mb-28')}>경기 이름</h1>
        <div className="px-4">
          <div className="mb-28 mt-28 flex items-center gap-1">
            <PlayerIcon className="mr-1" />
            <span className="text-body1s text-white">인원을 배치 하세요</span>
          </div>
          <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <div className="flex justify-between">
              <div className="w-[60%] pr-4">
                <div className="mb-3 flex items-center">
                  <PlayerDropdown
                    selectedPlayer={selectedPlayer}
                    isOpen={isDropdownOpen}
                    membersList={membersList}
                    onToggle={toggleDropdown}
                    onSelect={selectPlayer}
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
                    <PlayerList players={unplacedPlayers} provided={provided} />
                  )}
                </StrictModeDroppable>
              </div>
              <div className="h-[500px] w-[55%]">
                <StrictModeDroppable droppableId="court" type="PLAYER">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="relative h-full"
                    >
                      <SportMap
                        type={sportType}
                        players={placedPlayers}
                        onPlayerDrag={handlePlayerDrag}
                      />
                      {provided.placeholder}
                    </div>
                  )}
                </StrictModeDroppable>
              </div>
            </div>
          </DragDropContext>
        </div>
      </div>
      <div className={cn('mt-30', 'mb-30')}>
        <Button bg="bg-main-600" textColor="text-white" onClick={handleSubmit}>
          확인
        </Button>
      </div>
    </div>
  );
};

export default PlaceTeamContainer;
