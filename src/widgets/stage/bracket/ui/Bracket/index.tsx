'use client';

import { useEffect, useState } from 'react';
import LeftBracketLine from '@/shared/assets/svg/BarcketLine/LeftBarcketLine';
import MiddleBracketLine from '@/shared/assets/svg/BarcketLine/MiddleBarcketLine';
import RightBracketLine from '@/shared/assets/svg/BarcketLine/RightBarcketLine';
import { cn } from '@/shared/utils/cn';

const Bracket = () => {
  const [finalStage, setFinalStage] = useState(4);

  useEffect(() => {
    const confirmedTeams = sessionStorage.getItem('confirmedTeams');
    if (confirmedTeams) {
      const teams = JSON.parse(confirmedTeams);
      const teamCount = teams.length;

      if (teamCount <= 4) {
        setFinalStage(4);
      } else if (teamCount <= 8) {
        setFinalStage(8);
      } else if (teamCount <= 16) {
        setFinalStage(16);
      }
    }
  }, []);

  const renderBracketLines = () => {
    switch (finalStage) {
      case 16:
        return (
          <>
            <LeftBracketLine />
            <MiddleBracketLine />
            <MiddleBracketLine />
            <RightBracketLine />
          </>
        );
      case 8:
        return (
          <>
            <LeftBracketLine />
            <MiddleBracketLine />
            <RightBracketLine />
          </>
        );
      case 4:
      default:
        return (
          <>
            <LeftBracketLine />
            <RightBracketLine />
          </>
        );
    }
  };

  return (
    <div className={cn('h-[50vh]', 'bg-black', 'p-30', 'flex', 'flex-col')}>
      <header className={cn('mb-30')}>
        <h1 className={cn('text-h3e', 'text-white')}>{finalStage}강</h1>
      </header>
      <div className={cn('h-[100%]', 'bg-gray-700', 'rounded-lg', 'p-20')}>
        <div
          className={cn(
            'w-full',
            'h-full',
            'flex',
            'items-center',
            'justify-center',
            'gap-20',
          )}
        >
          {renderBracketLines()}
        </div>
      </div>
    </div>
  );
};

export default Bracket;
