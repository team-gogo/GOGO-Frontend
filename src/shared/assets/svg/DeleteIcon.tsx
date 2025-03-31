const DeleteIcon = ({ size = 36 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36" height="36" rx="18" fill="white" />
      <line x1="10" y1="17.5" x2="26" y2="17.5" stroke="black" />
    </svg>
  );
};
export default DeleteIcon;
