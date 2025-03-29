'use client';

import { Droppable, Draggable } from '@hello-pangea/dnd';
import { useCallback, useState, useEffect } from 'react';
import TeamItem from '@/entities/stage/bracket/ui/TeamItem';
import { cn } from '@/shared/utils/cn';

interface TeamArrayProps {
  className?: string;
  matchId?: number;
}

const VISIBLE_ITEMS = 8;
const ITEM_WIDTH = 160;
const ITEM_GAP = 8;
const CONTAINER_PADDING = 16;

const TeamArray = ({ className, matchId = 0 }: TeamArrayProps) => {
  const [teams, setTeams] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [placedTeams, setPlacedTeams] = useState<{ [key: string]: boolean }>(
    {},
  );

  useEffect(() => {
    const confirmedTeams = sessionStorage.getItem(`confirmedTeams_${matchId}`);
    const oldConfirmedTeams = sessionStorage.getItem('confirmedTeams');

    if (confirmedTeams) {
      try {
        const parsedTeams = JSON.parse(confirmedTeams);
        const teamNames = parsedTeams.map(
          (team: { teamName: string }) => team.teamName,
        );
        setTeams(teamNames);
      } catch (error) {
        console.error(`확정 팀 데이터 파싱 오류(matchId=${matchId}):`, error);
      }
    } else if (oldConfirmedTeams && matchId === 0) {
      try {
        const parsedTeams = JSON.parse(oldConfirmedTeams);
        const teamNames = parsedTeams.map(
          (team: { teamName: string }) => team.teamName,
        );
        setTeams(teamNames);

        sessionStorage.setItem(`confirmedTeams_${matchId}`, oldConfirmedTeams);
      } catch (error) {
        console.error(`구 확정 팀 데이터 파싱 오류:`, error);
      }
    } else {
      setTeams(Array.from({ length: 10 }, (_, i) => `Team ${i + 1}`));
    }

    try {
      const placedTeamsData = sessionStorage.getItem(`placedTeams_${matchId}`);
      if (placedTeamsData) {
        const placedTeamsRecord = JSON.parse(placedTeamsData);
        const placedTeamsMap: { [key: string]: boolean } = {};
        for (const key in placedTeamsRecord) {
          if (Object.prototype.hasOwnProperty.call(placedTeamsRecord, key)) {
            placedTeamsMap[placedTeamsRecord[key]] = true;
          }
        }
        setPlacedTeams(placedTeamsMap);
      }
    } catch (error) {
      console.error(error);
    }
  }, [matchId]);

  useEffect(() => {
    const handleTeamPlacement = (event: Event) => {
      try {
        const customEvent = event as CustomEvent;
        if (customEvent.detail && customEvent.detail.matchId !== matchId) {
          return;
        }

        const placedTeamsData = sessionStorage.getItem(
          `placedTeams_${matchId}`,
        );
        if (placedTeamsData) {
          const placedTeamsRecord = JSON.parse(placedTeamsData);
          const newPlacedTeams: { [key: string]: boolean } = {};
          for (const key in placedTeamsRecord) {
            if (Object.prototype.hasOwnProperty.call(placedTeamsRecord, key)) {
              newPlacedTeams[placedTeamsRecord[key]] = true;
            }
          }
          setPlacedTeams(newPlacedTeams);
        }
      } catch (error) {
        console.error(error);
      }
    };

    window.addEventListener('storage', handleTeamPlacement);
    window.addEventListener('bracketStorage', handleTeamPlacement);

    try {
      const placedTeamsData = sessionStorage.getItem(`placedTeams_${matchId}`);
      if (placedTeamsData) {
        const placedTeamsRecord = JSON.parse(placedTeamsData);
        const newPlacedTeams: { [key: string]: boolean } = {};
        for (const key in placedTeamsRecord) {
          if (Object.prototype.hasOwnProperty.call(placedTeamsRecord, key)) {
            newPlacedTeams[placedTeamsRecord[key]] = true;
          }
        }
        setPlacedTeams(newPlacedTeams);
      }
    } catch (error) {
      console.error(error);
    }

    return () => {
      window.removeEventListener('storage', handleTeamPlacement);
      window.removeEventListener('bracketStorage', handleTeamPlacement);
    };
  }, [matchId]);

  const availableTeams = teams.filter((team) => !placedTeams[team]);

  const arrowButtonStyle = {
    color: '#ffffff',
    fontSize: '24px',
  };

  const canScrollPrev = currentIndex > 0;
  const canScrollNext = currentIndex + VISIBLE_ITEMS < availableTeams.length;

  const scrollToNext = useCallback(() => {
    if (!canScrollNext) return;
    setCurrentIndex((prev) => prev + 1);
  }, [canScrollNext]);

  const scrollToPrev = useCallback(() => {
    if (!canScrollPrev) return;
    setCurrentIndex((prev) => prev - 1);
  }, [canScrollPrev]);

  const FIXED_CONTAINER_WIDTH =
    ITEM_WIDTH * VISIBLE_ITEMS + ITEM_GAP * (VISIBLE_ITEMS - 1);

  const innerContainerWidth = Math.max(
    FIXED_CONTAINER_WIDTH,
    availableTeams.length * ITEM_WIDTH +
      Math.max(0, availableTeams.length - 1) * ITEM_GAP,
  );

  const translateX = -(currentIndex * (ITEM_WIDTH + ITEM_GAP));

  return (
    <div className={cn('w-full', 'flex', 'justify-center', className)}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .dragging [data-rbd-drag-handle-draggable-id] {
          cursor: grabbing !important;
        }
        .draggable-item {
          transform-origin: 50% 50%;
          transition: transform 0.2s;
        }
        .placed-team {
          opacity: 0.5;
        }
      `,
        }}
      />
      <div className={cn('relative', 'w-[75%]', 'flex', 'justify-center')}>
        <button
          onClick={scrollToPrev}
          className={cn(
            'absolute',
            'left-[-40px]',
            'top-1/2',
            '-translate-y-1/2',
            'z-10',
            'w-[30px]',
            'h-[30px]',
            'flex',
            'items-center',
            'justify-center',
            'rounded-full',
            !canScrollPrev && 'opacity-50',
            !canScrollPrev && 'cursor-not-allowed',
          )}
          style={arrowButtonStyle}
          disabled={!canScrollPrev}
        >
          {'<'}
        </button>

        <div
          className={cn(
            'bg-gray-700',
            'rounded-lg',
            'py-16',
            'overflow-hidden',
          )}
          style={{
            width: `${FIXED_CONTAINER_WIDTH + CONTAINER_PADDING * 2}px`,
            minHeight: '80px',
          }}
        >
          <Droppable droppableId="teams" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  width:
                    availableTeams.length === 0
                      ? '100%'
                      : innerContainerWidth || CONTAINER_PADDING * 2,
                  transform:
                    availableTeams.length === 0
                      ? 'none'
                      : `translateX(${translateX}px)`,
                  transition: 'transform 0.3s ease-in-out',
                  padding: `0 ${CONTAINER_PADDING}px`,
                  minHeight: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent:
                    availableTeams.length === 0 ? 'center' : 'flex-start',
                }}
                className={cn('flex', 'gap-8')}
              >
                {availableTeams.length === 0 ? (
                  <div className="w-full text-center text-gray-400">
                    모든 팀이 배치되었습니다
                  </div>
                ) : (
                  availableTeams.map((team, index) => (
                    <Draggable
                      key={team}
                      draggableId={team}
                      index={index}
                      isDragDisabled={false}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            width: `${ITEM_WIDTH}px`,
                            opacity: snapshot.isDragging ? '1' : '1',
                            zIndex: snapshot.isDragging ? 9999 : 'auto',
                            boxShadow: snapshot.isDragging
                              ? '0 5px 15px rgba(0, 0, 0, 0.3)'
                              : 'none',
                          }}
                          className={cn(
                            'transition-transform',
                            'duration-200',
                            'ease-in-out',
                            'draggable-item',
                            snapshot.isDragging && 'draggable-clone',
                          )}
                        >
                          <TeamItem
                            teamName={team}
                            className={cn(
                              'flex-shrink-0',
                              'w-[160px]',
                              'pointer-events-auto',
                            )}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <button
          onClick={scrollToNext}
          className={cn(
            'absolute',
            'right-[-40px]',
            'top-1/2',
            '-translate-y-1/2',
            'z-10',
            'w-[30px]',
            'h-[30px]',
            'flex',
            'items-center',
            'justify-center',
            'rounded-full',
            !canScrollNext && 'opacity-50',
            !canScrollNext && 'cursor-not-allowed',
          )}
          style={arrowButtonStyle}
          disabled={!canScrollNext}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default TeamArray;
