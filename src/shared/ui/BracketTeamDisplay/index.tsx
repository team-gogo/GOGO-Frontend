import { useMemo } from 'react';
import TeamItem from '@/entities/stage/bracket/ui/TeamItem';
import calculateTeamDistribution, {
  GroupDistribution,
} from '@/shared/model/calculateTeamDistribution';
import { GameFormatData } from '@/shared/types/stage/game';
import { cn } from '@/shared/utils/cn';

interface BracketTeamDisplayProps {
  teamCount: number;
  bracketData: GameFormatData;
}

const BracketTeamDisplay = ({
  teamCount,
  bracketData,
}: BracketTeamDisplayProps) => {
  const { distribution } = useMemo(() => {
    return {
      distribution: calculateTeamDistribution(teamCount),
    };
  }, [teamCount]);

  const getFormatData = () => {
    if (!bracketData || !bracketData.format) return null;
    return bracketData.format;
  };

  console.log('formatData', getFormatData());

  const getWinnerTeamId = (round: string) => {
    const formatData = getFormatData();
    if (!formatData) return null;

    const formatItem = formatData.find((item) => item.round === round);

    const winningMatch = formatItem?.match.find((m) => m.winTeamId);
    if (!winningMatch) return null;

    const winner = {
      id: winningMatch.winTeamId,
      name:
        winningMatch.winTeamId === winningMatch.ateamId
          ? winningMatch.ateamName
          : winningMatch.bteamName,
    };

    return winner;
  };

  console.log(getWinnerTeamId('QUARTER_FINALS'));

  const getTeamByRoundAndTurn = (
    round: string,
    turn: number,
    AorB: 'A' | 'B',
  ) => {
    try {
      const formatData = getFormatData();
      if (!formatData) return null;

      const formatItem = formatData.find((item) => item.round === round);
      if (!formatItem) return null;

      const match = formatItem.match.find((m) => m.turn === turn);
      if (!match) return null;

      return AorB === 'A' ? match.ateamId : match.bteamId;
    } catch (error) {
      return null;
    }
  };

  const getTeamNameByRoundAndTurn = (
    round: string,
    turn: number,
    AorB: 'A' | 'B',
  ) => {
    try {
      const formatData = getFormatData();
      if (!formatData) return null;

      const formatItem = formatData.find((item) => item.round === round);
      if (!formatItem) return null;

      const match = formatItem.match.find((m) => m.turn === turn);
      if (!match) return null;

      return AorB === 'A' ? match.ateamName : match.bteamName;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const findBuyTeam = () => {
    if (teamCount === 5) {
      return { round: 'SEMI_FINALS', turn: 1, AorB: 'B' };
    } else if (teamCount === 6) {
      return [
        { round: 'SEMI_FINALS', turn: 1, AorB: 'B' },
        { round: 'SEMI_FINALS', turn: 2, AorB: 'B' },
      ];
    } else if (teamCount === 3) {
      return { round: 'SEMI_FINALS', turn: 2, AorB: 'B' };
    } else if (teamCount === 7) {
      return { round: 'SEMI_FINALS', turn: 2, AorB: 'A' };
    }
    return null;
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
            let teamName = null;
            let isWinner = false;
            const buyTeam = findBuyTeam();

            if (side === 'left') {
              if (actualIndex === 0) {
                teamId = getTeamByRoundAndTurn('QUARTER_FINALS', 1, 'A');
                teamName = getTeamNameByRoundAndTurn('QUARTER_FINALS', 1, 'A');
              } else if (actualIndex === 1) {
                teamId = getTeamByRoundAndTurn('QUARTER_FINALS', 1, 'B');
                teamName = getTeamNameByRoundAndTurn('QUARTER_FINALS', 1, 'B');
              } else if (actualIndex === 2) {
                if ((teamCount === 5 || 6) && buyTeam) {
                  teamId = getTeamByRoundAndTurn('SEMI_FINALS', 1, 'B');
                  teamName = getTeamNameByRoundAndTurn('SEMI_FINALS', 1, 'B');
                } else {
                  teamId = getTeamByRoundAndTurn('QUARTER_FINALS', 2, 'A');
                  teamName = getTeamNameByRoundAndTurn(
                    'QUARTER_FINALS',
                    2,
                    'A',
                  );
                }
              } else if (actualIndex === 3) {
                teamId = getTeamByRoundAndTurn('QUARTER_FINALS', 2, 'B');
                teamName = getTeamNameByRoundAndTurn('QUARTER_FINALS', 2, 'B');
              }
            } else if (side === 'right') {
              if (actualIndex === 0) {
                if (teamCount === 6 && buyTeam) {
                  teamId = getTeamByRoundAndTurn('SEMI_FINALS', 2, 'B');
                  teamName = getTeamNameByRoundAndTurn('SEMI_FINALS', 2, 'B');
                } else {
                  teamId = getTeamByRoundAndTurn('QUARTER_FINALS', 4, 'B');
                  teamName = getTeamNameByRoundAndTurn(
                    'QUARTER_FINALS',
                    4,
                    'B',
                  );
                }
              } else if (actualIndex === 1) {
                teamId = getTeamByRoundAndTurn('QUARTER_FINALS', 4, 'A');
                teamName = getTeamNameByRoundAndTurn('QUARTER_FINALS', 4, 'A');
              } else if (actualIndex === 2) {
                if (teamCount === 7 && buyTeam) {
                  teamId = getTeamByRoundAndTurn('SEMI_FINALS', 2, 'A');
                  teamName = getTeamNameByRoundAndTurn('SEMI_FINALS', 2, 'A');
                } else {
                  teamId = getTeamByRoundAndTurn('QUARTER_FINALS', 3, 'B');
                  teamName = getTeamNameByRoundAndTurn(
                    'QUARTER_FINALS',
                    3,
                    'B',
                  );
                }
              } else if (actualIndex === 3) {
                teamId = getTeamByRoundAndTurn('QUARTER_FINALS', 3, 'A');
                teamName = getTeamNameByRoundAndTurn('QUARTER_FINALS', 3, 'A');
              }
            }

            if (teamId) {
              const winner = getWinnerTeamId('QUARTER_FINALS');
              isWinner = winner?.id === teamId;
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
                    teamName={teamName || (teamId ? `${teamId}` : 'TBD')}
                    className="w-[160px]"
                    isWinner={isWinner}
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
            let teamName = null;
            let isWinner = false;

            if (round === 'SEMI_FINALS') {
              if (side === 'left') {
                if (idx === 0) {
                  teamId = getTeamByRoundAndTurn('SEMI_FINALS', 1, 'A');
                  teamName = getTeamNameByRoundAndTurn('SEMI_FINALS', 1, 'A');
                } else {
                  teamId = getTeamByRoundAndTurn('SEMI_FINALS', 1, 'B');
                  teamName = getTeamNameByRoundAndTurn('SEMI_FINALS', 1, 'B');
                }
              } else {
                if (teamCount === 3 && idx === 0) {
                  teamId = getTeamByRoundAndTurn('FINALS', 1, 'B');
                  teamName = getTeamNameByRoundAndTurn('FINALS', 1, 'B');
                } else if (idx === 0) {
                  teamId = getTeamByRoundAndTurn('SEMI_FINALS', 2, 'B');
                  teamName = getTeamNameByRoundAndTurn('SEMI_FINALS', 2, 'B');
                } else {
                  teamId = getTeamByRoundAndTurn('SEMI_FINALS', 2, 'A');
                  teamName = getTeamNameByRoundAndTurn('SEMI_FINALS', 2, 'A');
                }
              }
            } else if (round === 'FINALS') {
              if (side === 'left') {
                teamId = getTeamByRoundAndTurn('FINALS', 1, 'A');
                teamName = getTeamNameByRoundAndTurn('FINALS', 1, 'A');
              } else {
                teamId = getTeamByRoundAndTurn('FINALS', 1, 'B');
                teamName = getTeamNameByRoundAndTurn('FINALS', 1, 'B');
              }
            }

            if (teamId) {
              const winner = getWinnerTeamId(round || '');
              isWinner = winner?.id === teamId;
            }

            return (
              <div key={`${side}_${idx}`} className="relative">
                <TeamItem
                  teamName={teamName || (teamId ? `${teamId}` : 'TBD')}
                  className="w-[160px]"
                  isWinner={isWinner}
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
          <div className={cn('relative', 'right-[50px]')}>
            {renderBracketColumn(1, false, undefined, 'left', 'FINALS')}
          </div>
        </div>

        <div className={cn('mx-20 w-[50px]')} />

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
