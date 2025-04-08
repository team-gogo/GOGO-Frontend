import { UseFormSetValue } from 'react-hook-form';
import { YavarweeForm } from '@/shared/types/mini-game/yavarwee';
import Button from '@/shared/ui/button';

interface YavarweeButtonProps {
  number: '1' | '2' | '3';
  selectedNumber: string | undefined;
  setValue: UseFormSetValue<YavarweeForm>;
  onClick?: () => void;
}

const YavarweeButton = ({
  number,
  selectedNumber,
  setValue,
  onClick,
}: YavarweeButtonProps) => {
  const isSelected = selectedNumber === number;

  return (
    <Button
      onClick={() => {
        setValue('bet', number);
        if (onClick) onClick();
      }}
      bg={!isSelected ? 'bg-black-800' : undefined}
      border={!isSelected ? 'border-white' : undefined}
    >
      {`${number}`}
    </Button>
  );
};

export default YavarweeButton;
