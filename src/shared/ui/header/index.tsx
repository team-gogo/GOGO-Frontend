'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useNavigation } from '@/shared/model/useNavigation';
import { cn } from '@/shared/utils/cn';

const imageSrc = '/GOGOLogo.png' as const;

const Header = () => {
  const { navItems, getColor } = useNavigation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <header
      className={cn(
        'w-full',
        'py-[2rem]',
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
          <div className="relative h-[52px] w-[152px] tablet:h-[40px] tablet:w-[120px]">
            <Image src={imageSrc} alt="GOGO Logo" fill />
          </div>
        </Link>
        <nav className={cn('flex', 'gap-28', 'tablet:gap-16')}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-8"
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={cn('laptop:hidden', 'block')}>
                <item.icon
                  color={
                    hoveredItem === item.href ? '#fff' : getColor(item.href)
                  }
                />
              </div>

              <span
                className={cn(
                  'text-gray-500',
                  'text-body2s',
                  'tablet:text-body3s',
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
