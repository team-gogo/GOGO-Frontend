import Button from '@/shared/ui/button';

interface YavarweeButtonProps {
  number: '1' | '2' | '3';
  onBet: (value: '1' | '2' | '3') => void;
  onClick?: () => void;
  isPending: boolean;
}

const YavarweeButton = ({
  number,
  onBet,
  onClick,
  isPending,
}: YavarweeButtonProps) => {
  return (
    <Button
      onClick={() => {
        onBet(number);
        if (onClick) onClick();
      }}
      bg="bg-black-800 hover:bg-main-600"
      border={
        isPending ? 'border-transparent' : 'border-white hover:border-main-600'
      }
      disabled={isPending}
    >
      {number}
    </Button>
  );
};

export default YavarweeButton;
