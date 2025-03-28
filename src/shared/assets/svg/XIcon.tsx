import React from 'react';

interface Props {
  className?: string;
}

const XIcon = ({ className }: Props) => {
  return (
    <svg
      width="40"
      height="40"
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.82116 8.82153C9.47204 8.17066 10.5273 8.17066 11.1782 8.82153L19.9997 17.643L28.8212 8.82153C29.472 8.17066 30.5273 8.17066 31.1782 8.82153C31.8291 9.4724 31.8291 10.5277 31.1782 11.1786L22.3567 20L31.1782 28.8215C31.8291 29.4724 31.8291 30.5277 31.1782 31.1786C30.5273 31.8294 29.472 31.8294 28.8212 31.1786L19.9997 22.3571L11.1782 31.1786C10.5273 31.8294 9.47204 31.8294 8.82116 31.1786C8.17029 30.5277 8.17029 29.4724 8.82116 28.8215L17.6427 20L8.82116 11.1786C8.17029 10.5277 8.17029 9.4724 8.82116 8.82153Z"
        fill="white"
      />
    </svg>
  );
};

export default XIcon;
