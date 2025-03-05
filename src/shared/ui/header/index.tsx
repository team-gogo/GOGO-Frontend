'use client';

import Link from 'next/link';
import { Logo } from '@/shared/assets/svg';
import { useNavigation } from '@/shared/model/useNavigation';
import { cn } from '@/shared/utils/cn';

const Header = () => {
  const { navItems, getColor } = useNavigation();
  return (
    <header
      className={cn(
        'w-full',
        'py-[32px]',
        'tablet:py-[24px]',
        'flex',
        'border-b-1',
        'border-solid',
        'border-gray-700',
        'justify-center',
        'px-16',
      )}
    >
      <div className={cn('flex', 'justify-between', 'w-full', 'w-[1320px]')}>
        <Link href="/">
          <Logo className="tablet:h-[34px] tablet:w-[100px] h-[48px] w-[140px]" />
        </Link>
        <nav className={cn('flex', 'gap-28', 'tablet:gap-16')}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-5"
            >
              <div className={cn('laptop:hidden block')}>
                <item.icon color={getColor(item.href)} />
              </div>

              <span
                className={cn(
                  'text-gray-500',
                  'text-body2s',
                  'tablet:text-body3s',
                )}
                style={{ color: getColor(item.href) }}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
