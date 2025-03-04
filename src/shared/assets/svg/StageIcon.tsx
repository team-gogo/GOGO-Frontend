interface StageIconProps {
  size?: number;
  color?: string;
}

const StageIcon = ({ size = 36, color = '#727272' }: StageIconProps) => (
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
      d="M3 13.5C3 12.6716 3.67157 12 4.5 12H9C9.82843 12 10.5 12.6716 10.5 13.5V22.5C10.5 23.3284 9.82843 24 9 24H4.5C3.67157 24 3 23.3284 3 22.5V13.5ZM6 15V21H7.5V15H6ZM13.7574 13.7574C14.8826 12.6321 16.4087 12 18 12C19.5913 12 21.1174 12.6321 22.2426 13.7574C23.3679 14.8826 24 16.4087 24 18C24 19.5913 23.3679 21.1174 22.2426 22.2426C21.1174 23.3679 19.5913 24 18 24C16.4087 24 14.8826 23.3679 13.7574 22.2426C12.6321 21.1174 12 19.5913 12 18C12 16.4087 12.6321 14.8826 13.7574 13.7574ZM18 15C17.2043 15 16.4413 15.3161 15.8787 15.8787C15.3161 16.4413 15 17.2043 15 18C15 18.7957 15.3161 19.5587 15.8787 20.1213C16.4413 20.6839 17.2043 21 18 21C18.7957 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7957 21 18C21 17.2043 20.6839 16.4413 20.1213 15.8787C19.5587 15.3161 18.7957 15 18 15ZM25.5 13.5C25.5 12.6716 26.1716 12 27 12H31.5C32.3284 12 33 12.6716 33 13.5V22.5C33 23.3284 32.3284 24 31.5 24H27C26.1716 24 25.5 23.3284 25.5 22.5V13.5ZM28.5 15V21H30V15H28.5Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.5 9C7.10217 9 6.72064 9.15804 6.43934 9.43934C6.15804 9.72064 6 10.1022 6 10.5V25.5C6 25.8978 6.15804 26.2794 6.43934 26.5607C6.72064 26.842 7.10218 27 7.5 27H16.5V9H7.5ZM7.5 6C6.30653 6 5.16193 6.47411 4.31802 7.31802C3.47411 8.16193 3 9.30653 3 10.5V25.5C3 26.6935 3.47411 27.8381 4.31802 28.682C5.16193 29.5259 6.30653 30 7.5 30H28.5C29.6935 30 30.8381 29.5259 31.682 28.682C32.5259 27.8381 33 26.6935 33 25.5V10.5C33 9.30653 32.5259 8.16193 31.682 7.31802C30.8381 6.47411 29.6935 6 28.5 6H7.5ZM19.5 9V27H28.5C28.8978 27 29.2794 26.842 29.5607 26.5607C29.842 26.2794 30 25.8978 30 25.5V10.5C30 10.1022 29.842 9.72064 29.5607 9.43934C29.2794 9.15804 28.8978 9 28.5 9H19.5Z"
      fill={color}
    />
  </svg>
);

export default StageIcon;
