'use client';

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { useCallback, useState } from 'react';
import TeamItem from '@/entities/stage/bracket/ui/TeamItem';
import { cn } from '@/shared/utils/cn';

interface TeamArrayProps {
  className?: string;
}

const VISIBLE_ITEMS = 8;
const ITEM_WIDTH = 160;
const ITEM_GAP = 8;
const CONTAINER_PADDING = 16;

const TeamArray = ({ className }: TeamArrayProps) => {
  const [teams, setTeams] = useState(
    Array.from({ length: 10 }, (_, i) => `TBD ${i + 1}`),
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const arrowButtonStyle = {
    color: '#ffffff',
    fontSize: '24px',
  };

  const canScrollPrev = currentIndex > 0;
  const canScrollNext = currentIndex + VISIBLE_ITEMS < teams.length;

  const scrollToNext = useCallback(() => {
    if (!canScrollNext) return;
    setCurrentIndex((prev) => prev + 1);
  }, [canScrollNext]);

  const scrollToPrev = useCallback(() => {
    if (!canScrollPrev) return;
    setCurrentIndex((prev) => prev - 1);
  }, [canScrollPrev]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newTeams = Array.from(teams);
    const [reorderedItem] = newTeams.splice(result.source.index, 1);
    newTeams.splice(result.destination.index, 0, reorderedItem);

    setTeams(newTeams);
  };

  const visibleContainerWidth =
    ITEM_WIDTH * VISIBLE_ITEMS + ITEM_GAP * (VISIBLE_ITEMS - 1);
  const innerContainerWidth =
    ITEM_WIDTH * teams.length + ITEM_GAP * (teams.length - 1);
  const translateX = -(currentIndex * (ITEM_WIDTH + ITEM_GAP));

  return (
    <div className={cn('w-full', 'flex', 'justify-center', className)}>
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
            width: `${visibleContainerWidth + CONTAINER_PADDING * 2}px`,
          }}
        >
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="teams" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    width: innerContainerWidth,
                    transform: `translateX(${translateX}px)`,
                    transition: 'transform 0.3s ease-in-out',
                    padding: `0 ${CONTAINER_PADDING}px`,
                  }}
                  className={cn('flex', 'gap-8')}
                >
                  {teams.map((team, index) => (
                    <Draggable key={team} draggableId={team} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            zIndex: snapshot.isDragging ? 9999 : 'auto',
                          }}
                          className={cn(snapshot.isDragging && 'opacity-100')}
                        >
                          <TeamItem
                            teamName={team}
                            className={cn('flex-shrink-0', 'w-[160px]')}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
