interface RankBarProps {
  height: number;
  color: string;
  rankText: string;
}

const RankBar: React.FC<RankBarProps> = ({ height, color, rankText }) => {
  const maxHeight = 175;
  const adjustedHeight = (height / 100) * maxHeight;

  return (
    <svg
      width="123"
      height={adjustedHeight}
      viewBox={`0 0 123 ${adjustedHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={`M0 12C0 5.37259 5.37258 0 12 0H111C117.627 0 123 5.37258 123 12V${adjustedHeight}H0V12Z`}
        fill={color}
      />
      <text
        x="61.5"
        y={adjustedHeight / 2}
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
