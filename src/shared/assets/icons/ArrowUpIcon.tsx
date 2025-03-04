import React from 'react';

interface Props {
  color?: string;
}

const ArrowUpIcon = ({ color = '#8F8F8F' }: Props) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.9393 12.4393C17.5251 11.8536 18.4749 11.8536 19.0607 12.4393L28.0607 21.4393C28.6464 22.0251 28.6464 22.9749 28.0607 23.5607C27.4749 24.1464 26.5251 24.1464 25.9393 23.5607L18 15.6213L10.0607 23.5607C9.47487 24.1464 8.52513 24.1464 7.93934 23.5607C7.35355 22.9749 7.35355 22.0251 7.93934 21.4393L16.9393 12.4393Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowUpIcon;
