import Image from 'next/image';
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
  return (
    <div
      className={cn(
        'flex',
        'gap-[0.0625rem]',
        'justify-center',
        'flex-wrap',
        className,
      )}
    >
      <div className="sm:w-[25%] md:w-[20%] lg:w-[15%] relative w-[20%]">
        <Image
          src={GImageSrc}
          alt="GOGO Logo"
          layout="responsive"
          width={GWidth}
          height={GHeight}
        />
      </div>
      <div className="sm:w-[25%] md:w-[20%] lg:w-[15%] relative w-[20%]">
        <Image
          src={OImageSrc}
          alt="GOGO Logo"
          layout="responsive"
          width={OWidth}
          height={OHeight}
        />
      </div>
      <div className="sm:w-[25%] md:w-[20%] lg:w-[15%] relative w-[20%]">
        <Image
          src={GImageSrc}
          alt="GOGO Logo"
          layout="responsive"
          width={GWidth}
          height={GHeight}
        />
      </div>
      <div className="sm:w-[25%] md:w-[20%] lg:w-[15%] relative w-[20%]">
        <Image
          src={OImageSrc}
          alt="GOGO Logo"
          layout="responsive"
          width={OWidth}
          height={OHeight}
        />
      </div>
    </div>
  );
};

export default GOGOIcon;
