import { useMemo } from 'react';
import TeamItem from '@/entities/stage/bracket/ui/TeamItem';
import { cn } from '@/shared/utils/cn';

interface BracketTeamDisplayProps {
  teamCount: number;
}

interface GroupDistribution {
  top: number;
  bottom: number;
}

const BracketTeamDisplay = ({ teamCount }: BracketTeamDisplayProps) => {
  const calculateTeamDistribution = (
    totalTeamCount: number,
  ): [GroupDistribution, GroupDistribution] => {
    console.log(totalTeamCount);
    if (totalTeamCount === 5) {
      return [
        { top: 2, bottom: 1 },
        { top: 1, bottom: 1 },
      ];
    } else if (totalTeamCount === 6) {
      return [
        { top: 2, bottom: 1 },
        { top: 1, bottom: 2 },
      ];
    } else if (totalTeamCount === 7) {
      return [
        { top: 2, bottom: 2 },
        { top: 2, bottom: 1 },
      ];
    } else if (totalTeamCount === 8) {
      return [
        { top: 2, bottom: 2 },
        { top: 2, bottom: 2 },
      ];
    }

    const leftTotal = Math.ceil(totalTeamCount / 2);
    const rightTotal = Math.floor(totalTeamCount / 2);

    return [
      {
        top: Math.ceil(leftTotal / 2),
        bottom: Math.floor(leftTotal / 2),
      },
      {
        top: Math.ceil(rightTotal / 2),
        bottom: Math.floor(rightTotal / 2),
      },
    ];
  };

  const { distribution } = useMemo(() => {
    return {
      distribution: calculateTeamDistribution(teamCount),
    };
  }, [teamCount]);

  const renderFirstRoundGroup = (
    count: number,
    side: 'left' | 'right',
    startIndex: number = 0,
  ) => {
    return (
      <div
        className={cn(
          'flex-1',
          'flex',
          'flex-col',
          'justify-around',
          'items-center',
        )}
      >
        {Array(count)
          .fill(null)
          .map((_, idx) => {
            const actualIndex = startIndex + idx + 1;
            const teamId =
              side === 'left'
                ? actualIndex <= 4
                  ? actualIndex
                  : null
                : actualIndex <= 4
                  ? actualIndex + 4
                  : null;

            return (
              <div key={`${side}_${idx}`} className="relative">
                <div
                  className={cn(
                    'w-[160px]',
                    'h-[48px]',
                    'relative',
                    'rounded-lg',
                    'z-10',
                  )}
                >
                  <TeamItem
                    teamName={teamId ? `${teamId}` : ''}
                    isEmpty={teamId === null}
                    className="w-[160px]"
                  />
                </div>
              </div>
            );
          })}
      </div>
    );
  };

  const renderBracketColumn = (
    position: number,
    isFirstRound: boolean = false,
    distribution?: GroupDistribution,
    side: 'left' | 'right' = 'left',
  ) => {
    if (isFirstRound && distribution) {
      return (
        <div
          className={cn(
            'flex',
            'flex-col',
            'h-full',
            'items-center',
            'w-[180px]',
            'gap-4',
          )}
        >
          {renderFirstRoundGroup(distribution.top, side, 0)}
          {distribution.bottom > 0 &&
            renderFirstRoundGroup(distribution.bottom, side, distribution.top)}
        </div>
      );
    }

    return (
      <div
        className={cn(
          'flex',
          'flex-col',
          'justify-around',
          'h-full',
          'items-center',
          'w-[180px]',
          !isFirstRound && position <= 2 && 'w-[200px]',
        )}
      >
        {Array(position)
          .fill(null)
          .map((_, idx) => {
            return (
              <div key={`${side}_${idx}`} className="relative">
                <TeamItem teamName="TBD" className="w-[160px]" />
              </div>
            );
          })}
      </div>
    );
  };

  if (teamCount == 5) {
    return (
      <div
        className={cn(
          'flex',
          'justify-between',
          'w-full',
          'h-full',
          'relative',
          'z-10',
        )}
      >
        <div className={cn('flex', 'flex-1', 'justify-end', 'gap-4')}>
          {renderBracketColumn(2, true, distribution[0], 'left')}
          {renderBracketColumn(2, false, undefined, 'left')}
          {renderBracketColumn(1, false, undefined, 'left')}
        </div>

        <div className="w-[50px]" />

        <div className={cn('flex', 'flex-1', 'justify-start', 'gap-4')}>
          {renderBracketColumn(1, false, undefined, 'right')}
          {renderBracketColumn(2, false, undefined, 'right')}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex',
        'justify-between',
        'w-full',
        'h-full',
        'gap-4',
        'relative',
        'z-10',
      )}
      style={
        {
          '--bracket-left-teams': distribution[0].top + distribution[0].bottom,
          '--bracket-right-teams': distribution[1].top + distribution[1].bottom,
        } as React.CSSProperties
      }
    >
      {teamCount <= 4 ? (
        <>
          {renderBracketColumn(1, false, undefined, 'left')}
          {renderBracketColumn(1, false, undefined, 'left')}
          {renderBracketColumn(1, false, undefined, 'right')}
          {renderBracketColumn(1, false, undefined, 'right')}
        </>
      ) : (
        <>
          {renderBracketColumn(2, true, distribution[0], 'left')}
          {renderBracketColumn(2, false, undefined, 'left')}
          {renderBracketColumn(1, false, undefined, 'left')}
          {renderBracketColumn(1, false, undefined, 'right')}
          {renderBracketColumn(2, false, undefined, 'right')}
          {renderBracketColumn(2, true, distribution[1], 'right')}
        </>
      )}
    </div>
  );
};

export default BracketTeamDisplay;
