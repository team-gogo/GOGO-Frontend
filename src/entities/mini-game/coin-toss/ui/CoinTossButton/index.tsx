import { UseFormSetValue } from 'react-hook-form';
import { CoinTossForm } from '@/shared/types/mini-game/conin-toss';
import Button from '@/shared/ui/button';

interface CoinTossButtonProps {
  side: 'FRONT' | 'BACK';
  selectedSide: string | undefined;
  setValue: UseFormSetValue<CoinTossForm>;
}

const CoinTossButton = ({
  side,
  selectedSide,
  setValue,
}: CoinTossButtonProps) => {
  return (
    <Button
      onClick={() => setValue('bet', side)}
      bg={selectedSide !== side ? 'bg-black-800' : undefined}
      border={selectedSide === side ? undefined : 'border-white'}
    >
      {side === 'FRONT' ? '앞면' : '뒷면'}
    </Button>
  );
};

export default CoinTossButton;
