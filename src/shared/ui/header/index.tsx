'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  FaqIcon,
  HelpIcon,
  Logo,
  MiniGameIcon,
  MyIcon,
  NoticeIcon,
  StageIcon,
} from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

const Header = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathName = usePathname();
  const mockUserName = '김민수';
  const navLinks = [
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
      name: '미니게임',
      href: '/mini-game',
      icon: MiniGameIcon,
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
      icon: MyIcon,
    },
  ];

  return (
    <header
      className={cn(
        'w-screen',
        'py-[32px]',
        'fixed',
        'left-0',
        'top-0',
        'justify-center',
        'flex',
      )}
    >
      <section className={cn('w-[1320px]', 'flex', 'justify-between')}>
        <Logo />
        <nav className={cn('flex', 'gap-28')}>
          {navLinks.map(({ name, href, icon }) => (
            <Link
              href={href}
              key={name}
              className={cn(
                'flex',
                'gap-8',
                'items-center',
                'text-body2s',
                'text-gray-500',
                'hover:text-white',
              )}
              onMouseEnter={() => setHoveredLink(href)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {icon({
                size: 36,
                color:
                  pathName.includes(href) ||
                  (hoveredLink && hoveredLink === href)
                    ? '#ffffff'
                    : '#727272',
              })}
              {name}
            </Link>
          ))}
        </nav>
      </section>
    </header>
  );
};

export default Header;
