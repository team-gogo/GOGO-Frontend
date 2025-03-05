interface NoticeIconProps {
  size?: number;
  color?: string;
}

const NoticeIcon = ({ size = 36, color = '#727272' }: NoticeIconProps) => (
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
      d="M18.0001 6C17.6023 6 17.2208 6.15804 16.9395 6.43934C16.6582 6.72064 16.5001 7.10218 16.5001 7.5C16.5001 8.08004 16.1657 8.60809 15.6413 8.85604C14.1648 9.55422 12.9061 10.641 12.0001 12C11.1004 13.3496 10.5823 14.917 10.5001 16.5365V21C10.5001 21.0602 10.4965 21.1204 10.4893 21.1803C10.3689 22.1747 10.0507 23.1333 9.55546 24H26.4448C25.9495 23.1333 25.6314 22.1747 25.511 21.1803C25.5038 21.1204 25.5001 21.0602 25.5001 21V16.5365C25.418 14.917 24.8999 13.3496 24.0001 12C23.0942 10.641 21.8355 9.55422 20.3589 8.85604C19.8346 8.60809 19.5001 8.08004 19.5001 7.5C19.5001 7.10218 19.3421 6.72064 19.0608 6.43934C18.7795 6.15804 18.398 6 18.0001 6ZM21.0001 27H15.0001C15.0001 27.7957 15.3162 28.5587 15.8788 29.1213C16.4414 29.6839 17.2045 30 18.0001 30C18.7958 30 19.5588 29.6839 20.1215 29.1213C20.6841 28.5587 21.0001 27.7957 21.0001 27ZM12.0001 27C12.0001 28.5913 12.6323 30.1174 13.7575 31.2426C14.8827 32.3679 16.4088 33 18.0001 33C19.5914 33 21.1176 32.3679 22.2428 31.2426C23.368 30.1174 24.0001 28.5913 24.0001 27H30.0001C30.6814 27 31.2771 26.5409 31.4506 25.8822C31.6242 25.2234 31.3321 24.5304 30.7393 24.1947C30.1262 23.8476 29.6032 23.3613 29.2124 22.7751C28.8372 22.2122 28.5939 21.5723 28.5001 20.903V16.5C28.5001 16.4765 28.4996 16.4531 28.4985 16.4297C28.3964 14.2544 27.7043 12.1479 26.4963 10.3359C25.4456 8.75986 24.0391 7.45835 22.3952 6.53358C22.212 5.70089 21.7944 4.93031 21.1821 4.31802C20.3382 3.47411 19.1936 3 18.0001 3C16.8067 3 15.6621 3.47411 14.8182 4.31802C14.2059 4.93031 13.7882 5.70089 13.6051 6.53358C11.9612 7.45836 10.5547 8.75986 9.50399 10.3359C8.29602 12.1479 7.60389 14.2544 7.50179 16.4297C7.50069 16.4531 7.50014 16.4765 7.50014 16.5V20.903C7.40642 21.5723 7.16311 22.2122 6.78784 22.7751C6.39704 23.3613 5.87406 23.8476 5.26101 24.1947C4.66822 24.5304 4.37607 25.2234 4.54964 25.8822C4.72321 26.5409 5.3189 27 6.00014 27H12.0001Z"
      fill={color}
    />
  </svg>
);
export default NoticeIcon;
