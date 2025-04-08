import { UseFormSetValue } from 'react-hook-form';
import { YavarweeForm } from '@/shared/types/mini-game/yavarwee';
import Button from '@/shared/ui/button';

interface YavarweeButtonProps {
  number: '1' | '2' | '3';
  setValue: UseFormSetValue<YavarweeForm>;
  onClick?: () => void;
}

const YavarweeButton = ({ number, setValue, onClick }: YavarweeButtonProps) => {
  return (
    <Button
      onClick={() => {
        setValue('bet', number);
        if (onClick) onClick();
      }}
      bg="bg-black-800 hover:bg-main-600"
      border="border-white hover:border-main-600"
    >
      {`${number}`}
    </Button>
  );
};

export default YavarweeButton;
