'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useNavigation } from '@/shared/model/useNavigation';
import { useUserStore } from '@/shared/stores';
import { cn } from '@/shared/utils/cn';
import { useGetMyInfo } from '@/views/my/model/useGetMyInfo';
import GOGOIcon from '../GOGOIcon';

const Header = () => {
  const { navItems, getColor } = useNavigation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { data: userData } = useGetMyInfo();

  const { setUserName, setStudentId } = useUserStore();

  useEffect(() => {
    if (userData) {
      setUserName(userData.name);
      setStudentId(userData.studentId);
    }
  }, [userData]);

  return (
    <header
      className={cn(
        'w-full',
        'tablet:py-[32px]',
        'py-[24px]',
        'flex',
        'border-b-1',
        'border-solid',
        'border-gray-700',
        'justify-center',
        'px-16',
      )}
    >
      <div className={cn('flex', 'justify-between', 'w-full', 'w-[1320px]')}>
        <Link href="/stage">
          <div className={cn('flex', 'max-w-[11.75rem]')}>
            <GOGOIcon className="h-auto w-full" />
          </div>
        </Link>
        <nav className={cn('flex', 'tablet:gap-28', 'gap-16')}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-8"
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={cn('hidden', 'laptop:block')}>
                <item.icon
                  size={24}
                  color={
                    hoveredItem === item.href ? '#fff' : getColor(item.href)
                  }
                />
              </div>

              <span
                className={cn(
                  'text-gray-500',
                  'tablet:text-body2s',
                  'text-body3s',
                )}
                style={{
                  color:
                    hoveredItem === item.href ? '#fff' : getColor(item.href),
                }}
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
