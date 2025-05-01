import { UseFormSetValue } from 'react-hook-form';
import { CoinTossForm } from '@/shared/types/mini-game/coin-toss';
import Button from '@/shared/ui/button';

interface CoinTossButtonProps {
  side: 'FRONT' | 'BACK';
  selectedSide: string | undefined;
  setValue: UseFormSetValue<CoinTossForm>;
  isPlaying: boolean;
  isPending: boolean;
}

const CoinTossButton = ({
  side,
  selectedSide,
  setValue,
  isPlaying,
  isPending,
}: CoinTossButtonProps) => {
  const isSelected = selectedSide === side;

  return (
    <Button
      onClick={() => setValue('bet', side)}
      bg={!isSelected ? 'bg-black-800' : undefined}
      border={
        !isSelected && !isPlaying && !isPending ? 'border-white' : undefined
      }
      disabled={isPlaying || isPending}
    >
      {side === 'FRONT' ? '앞면' : '뒷면'}
    </Button>
  );
};

export default CoinTossButton;
