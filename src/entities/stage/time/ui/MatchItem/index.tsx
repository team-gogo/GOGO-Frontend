import React from 'react';

interface MatchItemProps {
  index: number;
  teamAName: string;
  teamBName: string;
  teamAId: number;
  teamBId: number;
  selected: boolean;
  solved: boolean;
  onClick?: () => void;
}

const MatchItem = ({
  index,
  teamAName,
  teamBName,
  selected = false,
  solved = false,
  onClick,
}: MatchItemProps) => {
  return (
    <div
      className={`flex min-h-[60px] w-full items-center rounded-lg ${solved ? 'bg-gray-600' : 'bg-main-600'} ${selected ? 'outline-3 outline outline-main-600' : ''} cursor-pointer text-white phone:p-4 mobile:p-6 pad:p-8 desktop:min-w-[300px] desktop:p-6`}
      onClick={onClick}
    >
      <div className="font-bold phone:mr-2 phone:text-body2s mobile:mr-3 mobile:text-body1s pad:mr-4 pad:text-h4s desktop:mr-4">
        {index}
      </div>
      <div className="flex flex-1 items-center justify-center desktop:gap-4">
        <div className="pad:text-16 max-w-[35%] truncate font-medium phone:text-caption1s mobile:text-body2s">
          {teamAName}
        </div>
        <div className="pad:text-12 mx-[10px] opacity-70 phone:text-caption2s mobile:text-caption1s">
          vs
        </div>
        <div className="pad:text-16 max-w-[35%] truncate font-medium phone:text-caption1s mobile:text-body2s">
          {teamBName}
        </div>
      </div>
    </div>
  );
};

export default MatchItem;
