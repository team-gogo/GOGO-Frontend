interface Props {
  size?: number;
  color?: string;
}

const SearchIcon = ({ size = 40, color = '#727272' }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5644 4.34831C13.1821 3.67825 14.9159 3.33337 16.6668 3.33337C18.4178 3.33337 20.1516 3.67825 21.7693 4.34831C23.387 5.01838 24.8568 6.0005 26.0949 7.23862C27.333 8.47673 28.3152 9.94659 28.9852 11.5643C29.6553 13.1819 30.0002 14.9157 30.0002 16.6667C30.0002 18.4177 29.6553 20.1515 28.9852 21.7692C28.5288 22.871 27.9277 23.9042 27.1995 24.8423L36.1787 33.8215C36.8296 34.4724 36.8296 35.5277 36.1787 36.1786C35.5278 36.8294 34.4725 36.8294 33.8217 36.1786L24.8425 27.1994C23.9043 27.9276 22.8711 28.5287 21.7693 28.9851C20.1516 29.6552 18.4178 30 16.6668 30C14.9159 30 13.1821 29.6552 11.5644 28.9851C9.94671 28.315 8.47685 27.3329 7.23874 26.0948C6.00062 24.8567 5.0185 23.3868 4.34844 21.7692C3.67837 20.1515 3.3335 18.4177 3.3335 16.6667C3.3335 14.9157 3.67837 13.1819 4.34844 11.5643C5.0185 9.94659 6.00062 8.47673 7.23874 7.23862C8.47685 6.0005 9.94671 5.01838 11.5644 4.34831ZM16.6668 6.66671C15.3536 6.66671 14.0533 6.92536 12.84 7.42791C11.6267 7.93046 10.5243 8.66705 9.59576 9.59564C8.66718 10.5242 7.93058 11.6266 7.42803 12.8399C6.92549 14.0531 6.66683 15.3535 6.66683 16.6667C6.66683 17.9799 6.92549 19.2803 7.42803 20.4935C7.93058 21.7068 8.66718 22.8092 9.59576 23.7378C10.5243 24.6664 11.6267 25.403 12.84 25.9055C14.0533 26.4081 15.3536 26.6667 16.6668 26.6667C17.9801 26.6667 19.2804 26.4081 20.4937 25.9055C21.7069 25.403 22.8093 24.6664 23.7379 23.7378C24.6665 22.8092 25.4031 21.7068 25.9056 20.4935C26.4082 19.2803 26.6668 17.9799 26.6668 16.6667C26.6668 15.3535 26.4082 14.0531 25.9056 12.8399C25.4031 11.6266 24.6665 10.5242 23.7379 9.59564C22.8093 8.66705 21.7069 7.93046 20.4937 7.42791C19.2804 6.92537 17.98 6.66671 16.6668 6.66671Z"
        fill={color}
      />
    </svg>
  );
};

export default SearchIcon;
