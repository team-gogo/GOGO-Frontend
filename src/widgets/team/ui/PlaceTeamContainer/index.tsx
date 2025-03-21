'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { postTeam } from '@/entities/team/api/postTeam';
import SportMap from '@/entities/team/ui/Map';
import { Player } from '@/entities/team/ui/Map/types';
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

  const onDragEnd = useCallback(
    (result: DragEndResult) => {
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
        destination.droppableId === 'court'
      ) {
        setPlayers((prev) =>
          prev.map((player) =>
            player.id === draggableId ? { ...player, x: 200, y: 200 } : player,
          ),
        );
      }
    },
    [players],
  );

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const selectPlayer = (player: string) => {
    setSelectedPlayer(player);
    setIsDropdownOpen(false);
  };

  const placedPlayers = useMemo(
    () => players.filter((player) => player.x !== 0 || player.y !== 0),
    [players],
  );

  const unplacedPlayers = useMemo(
    () => players.filter((player) => player.x === 0 && player.y === 0),
    [players],
  );

  const handleSubmit = async () => {
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
  };

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <header className="mt-20 p-4 pt-5">
        <BackPageButton type="back" label="팀 생성하기" />
      </header>

      <div className="px-4">
        <h1 className={cn('text-h3e', 'text-white', 'mb-24', 'mt-24')}>
          경기 이름
        </h1>
        <div className="mb-28 mt-28 flex items-center gap-1">
          <PlayerIcon className="mr-1" />
          <span className="text-body1s">인원을 배치 하세요</span>
        </div>
        <div>
          <DragDropContext
            onDragEnd={onDragEnd}
            className="flex justify-between"
          >
            <div className="flex justify-between">
              <div className="w-[45%] pr-4">
                <div className="mb-3 flex items-center">
                  <div className="relative mr-2 flex-1 py-8">
                    <div
                      onClick={toggleDropdown}
                      className="flex cursor-pointer items-center justify-between rounded-md bg-[#2a2a2a] p-18 text-body3s"
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
                        {membersList.map((member) => (
                          <div
                            key={member}
                            className="cursor-pointer border-b border-[#2a2a2a] px-3 py-2 text-body3s"
                            onClick={() => selectPlayer(member)}
                          >
                            {member}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex w-52 justify-between px-10">
                    <button
                      onClick={handleAddPlayer}
                      className="relative flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-transparent"
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

                <StrictModeDroppable droppableId="playersList">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex flex-row flex-wrap gap-4 bg-transparent"
                    >
                      {unplacedPlayers.map((player, index) => (
                        <Draggable
                          key={player.id}
                          draggableId={player.id}
                          index={index}
                          className="h-20"
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={cn(
                                'mx-8 my-10 flex h-[100px] w-[100px] flex-col items-center justify-center rounded-full border-[#2a2a2a] bg-[#2a2a2a] p-10 text-center',
                              )}
                            >
                              <PlayerIcon className="mb-1" />
                              <span className="text-body3s">{player.name}</span>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </StrictModeDroppable>
              </div>
              <div className="h-[500px] w-[55%]">
                <StrictModeDroppable droppableId="court">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="h-full"
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

      <div className="relative bottom-4 left-0 right-0 mt-32 px-4">
        <Button
          bg="bg-blue-600"
          textColor="text-white"
          className="w-full rounded-lg py-3 text-center text-body1s"
          onClick={handleSubmit}
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export default PlaceTeamContainer;
