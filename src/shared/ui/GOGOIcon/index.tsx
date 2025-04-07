'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/shared/utils/cn';

interface SizeProps {
  GWidth?: number;
  GHeight?: number;
  OWidth?: number;
  OHeight?: number;
  className?: string;
}

const GImageSrc = '/GIcon.png' as const;
const OImageSrc = '/OIcon.png' as const;

const GOGOIcon = ({
  GWidth = 44,
  GHeight = 46,
  OWidth = 48,
  OHeight = 47,
  className,
}: SizeProps) => {
  const [animateIndexes, setAnimateIndexes] = useState<number[]>([]);

  useEffect(() => {
    const delays = [0, 0, 500, 500];
    delays.forEach((ms, index) => {
      setTimeout(() => {
        setAnimateIndexes((prev) => [...prev, index]);
      }, ms);
    });
  }, []);

  return (
    <div
      className={cn('flex flex-wrap justify-center gap-[0.0625rem]', className)}
    >
      {[
        { src: GImageSrc, width: GWidth, height: GHeight },
        { src: OImageSrc, width: OWidth, height: OHeight },
        { src: GImageSrc, width: GWidth, height: GHeight },
        { src: OImageSrc, width: OWidth, height: OHeight },
      ].map((item, idx) => (
        <div
          key={idx}
          className={cn(
            'sm:w-[25%] md:w-[20%] lg:w-[15%] relative w-[20%]',
            animateIndexes.includes(idx) && 'animate-bounce-once',
          )}
        >
          <Image
            src={item.src}
            alt="GOGO Logo"
            layout="responsive"
            width={item.width}
            height={item.height}
          />
        </div>
      ))}
    </div>
  );
};

export default GOGOIcon;
