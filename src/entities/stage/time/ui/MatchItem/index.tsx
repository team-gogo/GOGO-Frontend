import React from 'react';

interface MatchItemProps {
  index: number;
  teamA: string;
  teamB: string;
}

const MatchItem = ({ index, teamA, teamB }: MatchItemProps) => {
  return (
    <div className="flex min-h-20 w-[300px] items-center rounded-lg bg-gray-600 p-[8px_16px] text-white">
      <div className="mr-[20px] text-h4s font-bold">{index}</div>
      <div className="flex flex-1 items-center justify-center">
        <div className="text-16 font-medium">{teamA}</div>
        <div className="text-12 mx-[10px] opacity-70">vs</div>
        <div className="text-16 font-medium">{teamB}</div>
      </div>
    </div>
  );
};

export default MatchItem;
