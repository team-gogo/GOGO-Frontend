import { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

interface Props {
  icon: ReactNode;
  text: 'string';
}

const Title = ({ icon, text }: Props) => {
  return (
    <div className={cn('flex', 'items-center', 'gap-12')}>
      {icon}
      <p className={cn('text-body1e', 'text-white')}>{text}</p>
    </div>
  );
};

export default Title;
