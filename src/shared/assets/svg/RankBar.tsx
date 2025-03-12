import React from 'react';

interface RankBarProps {
  height: number;
  color: string;
  rankText: number;
}

const RankBar: React.FC<RankBarProps> = ({ height, color, rankText }) => {
  const maxHeight = 178;
  const adjustedHeight = (height / 100) * maxHeight;

  return (
    <svg
      className="w-[120px] mobile:w-[80px]"
      height={adjustedHeight}
      viewBox={`0 0 120 ${adjustedHeight}`}
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={`M0 12C0 5.37258 5.37258 0 12 0H108C114.627 0 120 5.37258 120 12V${adjustedHeight}H0V12Z`}
        fill={color}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontSize="24"
        fontWeight="bold"
      >
        {rankText}
      </text>
    </svg>
  );
};

export default RankBar;
