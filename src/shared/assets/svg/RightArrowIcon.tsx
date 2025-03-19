const RightArrowIcon = ({
  color = '#6B6B6B',
  size = '1.5rem',
}: {
  color?: string;
  size?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 25"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.29289 5.79289C8.68342 5.40237 9.31658 5.40237 9.70711 5.79289L15.7071 11.7929C16.0976 12.1834 16.0976 12.8166 15.7071 13.2071L9.70711 19.2071C9.31658 19.5976 8.68342 19.5976 8.29289 19.2071C7.90237 18.8166 7.90237 18.1834 8.29289 17.7929L13.5858 12.5L8.29289 7.20711C7.90237 6.81658 7.90237 6.18342 8.29289 5.79289Z"
      fill={color}
    />
  </svg>
);

export default RightArrowIcon;
