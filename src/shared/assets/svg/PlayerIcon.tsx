const PlayerIcon = ({
  className,
  color = '#FFF',
}: {
  className?: string;
  color?: string;
}) => {
  return (
    <div className={className}>
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.96447 3.46447C9.90215 2.52678 11.1739 2 12.5 2C13.8261 2 15.0979 2.52678 16.0355 3.46447C16.9732 4.40215 17.5 5.67392 17.5 7C17.5 8.32608 16.9732 9.59785 16.0355 10.5355C15.0979 11.4732 13.8261 12 12.5 12C11.1739 12 9.90215 11.4732 8.96447 10.5355C8.02678 9.59785 7.5 8.32608 7.5 7C7.5 5.67392 8.02678 4.40215 8.96447 3.46447ZM12.5 4C11.7044 4 10.9413 4.31607 10.3787 4.87868C9.81607 5.44129 9.5 6.20435 9.5 7C9.5 7.79565 9.81607 8.55871 10.3787 9.12132C10.9413 9.68393 11.7044 10 12.5 10C13.2956 10 14.0587 9.68393 14.6213 9.12132C15.1839 8.55871 15.5 7.79565 15.5 7C15.5 6.20435 15.1839 5.44129 14.6213 4.87868C14.0587 4.31607 13.2956 4 12.5 4ZM10.5 16C9.70435 16 8.94129 16.3161 8.37868 16.8787C7.81607 17.4413 7.5 18.2043 7.5 19V21C7.5 21.5523 7.05228 22 6.5 22C5.94772 22 5.5 21.5523 5.5 21V19C5.5 17.6739 6.02678 16.4021 6.96447 15.4645C7.90215 14.5268 9.17392 14 10.5 14H14.5C15.8261 14 17.0979 14.5268 18.0355 15.4645C18.9732 16.4021 19.5 17.6739 19.5 19V21C19.5 21.5523 19.0523 22 18.5 22C17.9477 22 17.5 21.5523 17.5 21V19C17.5 18.2044 17.1839 17.4413 16.6213 16.8787C16.0587 16.3161 15.2956 16 14.5 16H10.5Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default PlayerIcon;
