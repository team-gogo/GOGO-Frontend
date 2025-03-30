import { GIcon, OIcon } from '@/shared/assets/svg';
import { cn } from '@/shared/utils/cn';

interface SizeProps {
  GWidth?: string;
  GHeight?: string;
  OWidth?: string;
  OHeight?: string;
}

const GOGOIcon = ({ GWidth, GHeight, OWidth, OHeight }: SizeProps) => {
  return (
    <div className={cn('flex', 'gap-[0.0625rem]')}>
      <GIcon GWidth={GWidth} GHeight={GHeight} />
      <OIcon OWidth={OWidth} OHeight={OHeight} />
      <GIcon GWidth={GWidth} GHeight={GHeight} />
      <OIcon OWidth={OWidth} OHeight={OHeight} />
    </div>
  );
};

export default GOGOIcon;
