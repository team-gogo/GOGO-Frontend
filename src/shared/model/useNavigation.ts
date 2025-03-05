'use client';
import { usePathname } from 'next/navigation';
import { navLinks } from './navLinks';

export const useNavigation = () => {
  const pathname = usePathname();

  const isActive = (path: string): boolean => pathname === path;

  const getColor = (path: string): string =>
    isActive(path) ? '#fff' : '#6B6B6B';

  const navItems = navLinks;
  return { navItems, getColor };
};
