const LineStroke = ({ height = 20 }: { height?: number }) => {
  return (
    <svg
      width="1"
      height={height}
      viewBox="0 0 1 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="0.5" y1="2.18557e-08" x2="0.499999" y2="20" stroke="#4D4D4D" />
    </svg>
  );
};

export default LineStroke;
