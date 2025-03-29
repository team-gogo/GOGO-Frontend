import React from 'react';

interface MatchItemProps {
  index: number;
  teamA: string;
  teamB: string;
}

const MatchItem = ({ index, teamA, teamB }: MatchItemProps) => {
  return (
    <div className="flex min-h-20 w-[270px] items-center rounded-lg bg-gray-600 p-[8px_16px] text-white">
      <div className="mr-[20px] text-[24px] font-bold">{index}</div>
      <div className="flex flex-1 items-center justify-center">
        <div className="text-[18px] font-medium">{teamA}</div>
        <div className="mx-[10px] text-[16px] opacity-70">vs</div>
        <div className="text-[18px] font-medium">{teamB}</div>
      </div>
    </div>
  );
};

export default MatchItem;
