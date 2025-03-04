interface HelpIconProps {
  size: number;
  color: string;
}

const HelpIcon = ({ size, color }: HelpIconProps) => (
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
      d="M25.5 7.70261L24.5433 8.49986L18.9603 13.1524C18.6907 13.377 18.3509 13.5 18 13.5H6V19.5H18C18.3509 19.5 18.6907 19.6231 18.9603 19.8477L25.5 25.2975V8.22982V7.70261ZM25.2861 4.55568C25.8234 4.4865 26.3693 4.5719 26.8598 4.80188C27.3503 5.03185 27.7652 5.39687 28.0556 5.85416C28.346 6.31123 28.5001 6.84156 28.5 7.38304M25.2861 4.55568C24.7487 4.62486 24.2423 4.84576 23.826 5.19248L25.2861 4.55568ZM23.826 5.19248L17.4569 10.5L23.826 5.19248ZM17.4569 10.5H6C5.20435 10.5 4.44129 10.8161 3.87868 11.3787C3.31607 11.9413 3 12.7044 3 13.5V19.5C3 20.2957 3.31607 21.0588 3.87868 21.6214C4.44129 22.184 5.20435 22.5 6 22.5H17.4569L23.8257 27.8074C24.242 28.1541 24.7487 28.3752 25.2861 28.4444C25.8234 28.5136 26.3693 28.4282 26.8598 28.1982C27.3503 27.9682 27.7651 27.6032 28.0556 27.1459C28.346 26.6889 28.5001 26.1585 28.5 25.617V7.38304"
      fill={color}
    />
    <path
      d="M24.5433 8.49986L25.5 7.70261V8.22982L28.5 7.38304L25.2861 4.55568L23.826 5.19248L17.4569 10.5L24.5433 8.49986Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 10.5C15.8284 10.5 16.5 11.1716 16.5 12V28.5C16.5 29.2956 16.1839 30.0587 15.6213 30.6213C15.0587 31.1839 14.2956 31.5 13.5 31.5H12C11.2044 31.5 10.4413 31.1839 9.87868 30.6213C9.31607 30.0587 9 29.2956 9 28.5V21C9 20.1716 9.67157 19.5 10.5 19.5C11.3284 19.5 12 20.1716 12 21V28.5H13.5V12C13.5 11.1716 14.1716 10.5 15 10.5ZM25.5 12C25.5 11.1716 26.1716 10.5 27 10.5C28.5913 10.5 30.1174 11.1321 31.2426 12.2574C32.3679 13.3826 33 14.9087 33 16.5C33 18.0913 32.3679 19.6174 31.2426 20.7426C30.1174 21.8679 28.5913 22.5 27 22.5C26.1716 22.5 25.5 21.8284 25.5 21C25.5 20.1716 26.1716 19.5 27 19.5C27.7957 19.5 28.5587 19.1839 29.1213 18.6213C29.6839 18.0587 30 17.2957 30 16.5C30 15.7043 29.6839 14.9413 29.1213 14.3787C28.5587 13.8161 27.7957 13.5 27 13.5C26.1716 13.5 25.5 12.8284 25.5 12Z"
      fill={color}
    />
  </svg>
);

export default HelpIcon;
