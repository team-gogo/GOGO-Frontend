'use client';
import { usePathname } from 'next/navigation';
import { useUserNameStore } from '@/shared/stores';
import { FaqIcon, HelpIcon, HumanIcon, NoticeIcon } from '../assets/svg';

export const useNavigation = () => {
  const pathname = usePathname();
  const { userName } = useUserNameStore();

  const isActive = (path: string): boolean => pathname === path;

  const getColor = (path: string): string =>
    isActive(path) ? '#fff' : '#6B6B6B';

  const navItems = [
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
      name: '공지',
      href: '/notice',
      icon: NoticeIcon,
    },
    {
      name: userName || '홍길동',
      href: '/my',
      icon: HumanIcon,
    },
  ];

  return { navItems, getColor };
};
