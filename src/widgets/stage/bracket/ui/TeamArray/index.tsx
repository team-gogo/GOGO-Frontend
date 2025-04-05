import { Droppable, Draggable } from '@hello-pangea/dnd';
import { createPortal } from 'react-dom';
import TeamItem from '@/entities/stage/bracket/ui/TeamItem';
import { cn } from '@/shared/utils/cn';

interface TeamData {
  teamId: number;
  teamName: string;
}

interface TeamArrayProps {
  availableTeams: TeamData[];
  currentIndex: number;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollToPrev: () => void;
  scrollToNext: () => void;
  isDragging: boolean;
  portalRef: React.RefObject<HTMLDivElement>;
  translateX: number;
  innerContainerWidth: number;
}

const TeamArray = ({
  availableTeams,
  canScrollPrev,
  canScrollNext,
  scrollToPrev,
  scrollToNext,
  isDragging,
  portalRef,
  translateX,
  innerContainerWidth,
}: TeamArrayProps) => {
  const ITEM_WIDTH = 160;
  const ITEM_GAP = 8;
  const CONTAINER_PADDING = 16;
  const VISIBLE_ITEMS = 8;
  const FIXED_CONTAINER_WIDTH =
    ITEM_WIDTH * VISIBLE_ITEMS + ITEM_GAP * (VISIBLE_ITEMS - 1);

  const renderDraggable = (team: TeamData, index: number) => {
    return (
      <Draggable
        key={team.teamId}
        draggableId={team.teamId.toString()}
        index={index}
      >
        {(provided, snapshot) => {
          const draggableContent = (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                ...provided.draggableProps.style,
                width: `${ITEM_WIDTH}px`,
                zIndex: snapshot.isDragging ? 999 : 1,
                boxShadow: snapshot.isDragging
                  ? '0 5px 15px rgba(0, 0, 0, 0.3)'
                  : 'none',
                opacity: 1,
                position: snapshot.isDragging ? 'absolute' : 'static',
                transformOrigin: 'center center',
                pointerEvents: 'auto',
              }}
              className={cn(
                'select-none',
                'cursor-grab',
                snapshot.isDragging && 'cursor-grabbing',
                snapshot.isDragging && 'z-[999]',
              )}
            >
              <TeamItem
                teamName={team.teamName}
                className={cn(
                  'flex-shrink-0',
                  'w-[160px]',
                  'pointer-events-auto',
                  'visible',
                  'opacity-100',
                )}
              />
            </div>
          );

          return (
            <>
              {snapshot.isDragging && portalRef.current
                ? createPortal(draggableContent, portalRef.current)
                : draggableContent}
              {/* @ts-expect-error - DraggableProvided*/}
              {provided.placeholder}
            </>
          );
        }}
      </Draggable>
    );
  };

  return (
    <div className={cn('w-full', 'flex', 'justify-center', 'mb-30', 'mt-20')}>
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
            'text-white',
            'text-2xl',
            !canScrollPrev && 'opacity-50',
            !canScrollPrev && 'cursor-not-allowed',
          )}
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
            'relative',
            isDragging && 'z-0',
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
                className={cn('flex', 'gap-8')}
                style={{
                  width:
                    availableTeams.length === 0
                      ? '100%'
                      : innerContainerWidth || CONTAINER_PADDING * 2,
                  padding: `0 ${CONTAINER_PADDING}px`,
                  minHeight: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent:
                    availableTeams.length === 0 ? 'center' : 'flex-start',
                  transformStyle: 'preserve-3d',
                  transform: 'none',
                  position: 'relative',
                  left: `${translateX}px`,
                  transition: 'left 0.3s ease-in-out',
                }}
              >
                {availableTeams.length === 0 ? (
                  <div className="w-full text-center text-gray-400">
                    모든 팀이 배치되었습니다
                  </div>
                ) : (
                  availableTeams.map((team, index) =>
                    renderDraggable(team, index),
                  )
                )}
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
            'text-white',
            'text-2xl',
            !canScrollNext && 'opacity-50',
            !canScrollNext && 'cursor-not-allowed',
          )}
          disabled={!canScrollNext}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default TeamArray;
