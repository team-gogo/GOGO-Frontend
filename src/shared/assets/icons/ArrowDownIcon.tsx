interface Props {
  color?: string;
  size?: number;
}

const ArrowDownIcon = ({ color = '#8F8F8F', size = 36 }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.93934 12.4393C8.52513 11.8536 9.47487 11.8536 10.0607 12.4393L18 20.3787L25.9393 12.4393C26.5251 11.8536 27.4749 11.8536 28.0607 12.4393C28.6464 13.0251 28.6464 13.9749 28.0607 14.5607L19.0607 23.5607C18.4749 24.1464 17.5251 24.1464 16.9393 23.5607L7.93934 14.5607C7.35355 13.9749 7.35355 13.0251 7.93934 12.4393Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowDownIcon;
