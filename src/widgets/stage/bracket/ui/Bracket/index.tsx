'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/shared/utils/cn';

interface GroupDistribution {
  top: number;
  bottom: number;
}

const Bracket = () => {
  const [totalTeams, setTotalTeams] = useState(4);
  const [finalStage, setFinalStage] = useState(4);
  const [firstRoundDistribution, setFirstRoundDistribution] = useState<
    [GroupDistribution, GroupDistribution]
  >([
    { top: 1, bottom: 1 },
    { top: 1, bottom: 1 },
  ]);

  const calculateTeamDistribution = (
    teamCount: number,
  ): [GroupDistribution, GroupDistribution] => {
    if (teamCount <= 4) {
      const leftTotal = Math.ceil(teamCount / 2);
      const rightTotal = Math.floor(teamCount / 2);
      return [
        { top: leftTotal, bottom: 0 },
        { top: rightTotal, bottom: 0 },
      ];
    }

    // 8강의 경우 왼쪽/오른쪽 배분
    const leftTotal = Math.ceil(teamCount / 2);
    const rightTotal = Math.floor(teamCount / 2);

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

  const createBracket = (teamCount: number): void => {
    if (teamCount < 2) return;
    setFinalStage(teamCount <= 4 ? 4 : 8);
    setFirstRoundDistribution(calculateTeamDistribution(teamCount));
  };

  useEffect(() => {
    createBracket(totalTeams);
  }, [totalTeams]);

  const renderTeamSlot = () => (
    <div
      className={cn(
        'w-[160px]',
        'h-[60px]',
        'bg-gray-600',
        'rounded',
        'flex',
        'items-center',
        'justify-center',
      )}
    />
  );

  const renderFirstRoundGroup = (teamCount: number) => (
    <div
      className={cn(
        'flex-1',
        'flex',
        'flex-col',
        'justify-around',
        'items-center',
      )}
    >
      {Array(teamCount)
        .fill(null)
        .map((_, _idx) => renderTeamSlot())}
    </div>
  );

  const renderBracketColumn = (
    round: number,
    position: number,
    isFirstRound: boolean = false,
    distribution?: GroupDistribution,
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
          {renderFirstRoundGroup(distribution.top)}
          {renderFirstRoundGroup(distribution.bottom)}
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
          round === 2 && 'w-[200px]',
        )}
      >
        {Array(position)
          .fill(null)
          .map((_, _idx) => renderTeamSlot())}
      </div>
    );
  };

  const renderBracket = () => {
    if (finalStage === 4) {
      return (
        <div
          className={cn('flex', 'justify-between', 'w-full', 'h-full', 'gap-4')}
        >
          {renderBracketColumn(
            1,
            firstRoundDistribution[0].top + firstRoundDistribution[0].bottom,
          )}{' '}
          {/* 준결승1 */}
          {renderBracketColumn(2, 1)} {/* 결승1 */}
          {renderBracketColumn(2, 1)} {/* 결승2 */}
          {renderBracketColumn(
            1,
            firstRoundDistribution[1].top + firstRoundDistribution[1].bottom,
          )}{' '}
          {/* 준결승2 */}
        </div>
      );
    }

    // 8강 새로운 레이아웃
    return (
      <div
        className={cn('flex', 'justify-between', 'w-full', 'h-full', 'gap-4')}
      >
        {renderBracketColumn(1, 0, true, firstRoundDistribution[0])}{' '}
        {/* 8강 왼쪽 */}
        {renderBracketColumn(
          2,
          Math.ceil(
            (firstRoundDistribution[0].top + firstRoundDistribution[0].bottom) /
              2,
          ),
        )}{' '}
        {/* 4강 왼쪽 */}
        {renderBracketColumn(3, 1)} {/* 결승1 */}
        {renderBracketColumn(3, 1)} {/* 결승2 */}
        {renderBracketColumn(
          2,
          Math.ceil(
            (firstRoundDistribution[1].top + firstRoundDistribution[1].bottom) /
              2,
          ),
        )}{' '}
        {/* 4강 오른쪽 */}
        {renderBracketColumn(1, 0, true, firstRoundDistribution[1])}{' '}
        {/* 8강 오른쪽 */}
      </div>
    );
  };

  const renderControls = () => (
    <div className={cn('flex', 'gap-4', 'mb-4')}>
      <button
        onClick={() => setTotalTeams((prev) => Math.max(2, prev - 1))}
        className={cn('px-4', 'py-2', 'bg-gray-600', 'text-white', 'rounded')}
      >
        -
      </button>
      <span className={cn('text-white', 'flex', 'items-center')}>
        {totalTeams}
      </span>
      <button
        onClick={() => setTotalTeams((prev) => Math.min(8, prev + 1))}
        className={cn('px-4', 'py-2', 'bg-gray-600', 'text-white', 'rounded')}
      >
        +
      </button>
    </div>
  );

  return (
    <div
      className={cn('min-h-[600px]', 'bg-black', 'p-30', 'flex', 'flex-col')}
    >
      {renderControls()}
      <header className={cn('mb-30')}>
        <h1 className={cn('text-h3e', 'text-white')}>{finalStage}강</h1>
      </header>
      <div className={cn('flex-1', 'bg-gray-700', 'rounded-lg', 'p-20')}>
        {renderBracket()}
      </div>
    </div>
  );
};

export default Bracket;
