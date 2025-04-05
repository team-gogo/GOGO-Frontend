import { useMemo } from 'react';
import TeamItem from '@/entities/stage/bracket/ui/TeamItem';
import { cn } from '@/shared/utils/cn';
import getBracketMock from '@/views/stage/bracket/Mock/getBracketMock';

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
    if (totalTeamCount === 6) {
      return [
        { top: 2, bottom: 1 },
        { top: 1, bottom: 2 },
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

  const { distribution, bracketData } = useMemo(() => {
    return {
      distribution: calculateTeamDistribution(teamCount),
      bracketData: getBracketMock(teamCount),
    };
  }, [teamCount]);

  const getTeamByRoundAndTurn = (
    round: string,
    turn: number,
    isTeamA: boolean,
  ) => {
    const match = bracketData.find(
      (match) => match.round === round && match.turn === turn,
    );
    return isTeamA ? match?.teamAId : match?.teamBId;
  };

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
            const actualIndex = startIndex + idx;

            let teamId = null;

            if (side === 'left') {
              if (actualIndex === 0) {
                teamId = getTeamByRoundAndTurn('QUARTER_FINALS', 1, true); // turn 1의 A팀(위쪽)
              } else if (actualIndex === 1) {
                teamId = getTeamByRoundAndTurn('QUARTER_FINALS', 1, false); // turn 1의 B팀(아래쪽)
              } else if (actualIndex === 2) {
                teamId = getTeamByRoundAndTurn('QUARTER_FINALS', 2, true); // turn 2의 A팀(위쪽)
              } else if (actualIndex === 3) {
                teamId = getTeamByRoundAndTurn('QUARTER_FINALS', 2, false); // turn 2의 B팀(아래쪽)
              }
            } else if (side === 'right') {
              if (actualIndex === 0) {
                teamId = getTeamByRoundAndTurn('QUARTER_FINALS', 4, false); // turn 4의 B팀(위쪽)
              } else if (actualIndex === 1) {
                teamId = getTeamByRoundAndTurn('QUARTER_FINALS', 4, true); // turn 4의 A팀(아래쪽)
              } else if (actualIndex === 2) {
                teamId = getTeamByRoundAndTurn('QUARTER_FINALS', 3, false); // turn 3의 B팀(위쪽)
              } else if (actualIndex === 3) {
                teamId = getTeamByRoundAndTurn('QUARTER_FINALS', 3, true); // turn 3의 A팀(아래쪽)
              }
            }

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
                    teamName={teamId ? `${teamId}` : 'TBD'}
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
    round?: string,
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
            let teamId = null;

            if (round === 'SEMI_FINALS') {
              if (side === 'left') {
                teamId =
                  idx === 0
                    ? getTeamByRoundAndTurn('SEMI_FINALS', 1, true) // turn 1의 A팀(위쪽)
                    : getTeamByRoundAndTurn('SEMI_FINALS', 1, false); // turn 1의 B팀(아래쪽)
              } else {
                teamId =
                  idx === 0
                    ? getTeamByRoundAndTurn('SEMI_FINALS', 2, false) // turn 2의 B팀(위쪽)
                    : getTeamByRoundAndTurn('SEMI_FINALS', 2, true); // turn 2의 A팀(아래쪽)
              }
            } else if (round === 'FINALS') {
              teamId =
                side === 'left'
                  ? getTeamByRoundAndTurn('FINALS', 1, true) // FINALS A팀(왼쪽)
                  : getTeamByRoundAndTurn('FINALS', 1, false); // FINALS B팀(오른쪽)
            }

            return (
              <div key={`${side}_${idx}`} className="relative">
                <TeamItem
                  teamName={teamId ? `${teamId}` : 'TBD'}
                  className="w-[160px]"
                />
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
          {renderBracketColumn(
            2,
            true,
            distribution[0],
            'left',
            'QUARTER_FINALS',
          )}
          {renderBracketColumn(2, false, undefined, 'left', 'SEMI_FINALS')}
          {renderBracketColumn(1, false, undefined, 'left', 'FINALS')}
        </div>

        <div className="w-[50px]" />

        <div className={cn('flex', 'flex-1', 'justify-start', 'gap-4')}>
          {renderBracketColumn(1, false, undefined, 'right', 'FINALS')}
          {renderBracketColumn(2, false, undefined, 'right', 'SEMI_FINALS')}
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
          {renderBracketColumn(2, false, undefined, 'left', 'SEMI_FINALS')}
          {renderBracketColumn(1, false, undefined, 'left', 'FINALS')}
          {renderBracketColumn(1, false, undefined, 'right', 'FINALS')}
          {renderBracketColumn(
            teamCount == 3 ? 1 : 2,
            false,
            undefined,
            'right',
            'SEMI_FINALS',
          )}
        </>
      ) : (
        <>
          {renderBracketColumn(
            2,
            true,
            distribution[0],
            'left',
            'QUARTER_FINALS',
          )}
          {renderBracketColumn(2, false, undefined, 'left', 'SEMI_FINALS')}
          {renderBracketColumn(1, false, undefined, 'left', 'FINALS')}
          {renderBracketColumn(1, false, undefined, 'right', 'FINALS')}
          {renderBracketColumn(2, false, undefined, 'right', 'SEMI_FINALS')}
          {renderBracketColumn(
            2,
            true,
            distribution[1],
            'right',
            'QUARTER_FINALS',
          )}
        </>
      )}
    </div>
  );
};

export default BracketTeamDisplay;
