import { cn } from '@/shared/utils/cn';

interface InputWrapper {
  title: string;
  children: React.ReactNode;
}

const InputWrapper = ({ title, children }: InputWrapper) => {
  return (
    <div className={cn('flex', 'w-full', 'flex-col', 'gap-[1rem]')}>
      <p className={cn('text-body2e', 'text-white')}>{title}</p>
      {children}
    </div>
  );
};

export default InputWrapper;
