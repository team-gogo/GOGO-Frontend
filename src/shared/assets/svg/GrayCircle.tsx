interface GrayCircleProps {
  isActive: boolean;
}

const GrayCircle = ({ isActive }: GrayCircleProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.5rem"
    height="1.5rem"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      cx="12"
      cy="12"
      r="11"
      fill={isActive ? '#526FFE' : '#6B6B6B'}
      stroke={isActive ? '#526FFE' : '#6B6B6B'}
      strokeWidth="2"
    />
  </svg>
);

export default GrayCircle;
