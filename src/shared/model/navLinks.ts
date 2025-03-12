import {
  FaqIcon,
  HelpIcon,
  HumanIcon,
  NoticeIcon,
  StageIcon,
} from '../assets/svg';

const mockUserName = '김민수';
export const navLinks = [
  {
    name: '고객센터',
    href: '/help',
    icon: HelpIcon,
  },
  {
    name: 'FAQ',
    href: '/faq',
    icon: FaqIcon,
  },
  {
    name: '스테이지',
    href: '/stage',
    icon: StageIcon,
  },
  {
    name: '공지',
    href: '/notice',
    icon: NoticeIcon,
  },
  {
    name: mockUserName,
    href: '/my',
    icon: HumanIcon,
  },
];
