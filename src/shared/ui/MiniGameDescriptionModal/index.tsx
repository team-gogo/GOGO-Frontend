'use client';

import React, { useEffect } from 'react';
import { GameType } from '@/shared/model/sportTypes';
import ModalLayout from '@/shared/ui/modalLayout';
import SportTypeLabel from '@/shared/ui/sportTypelabel';
import { cn } from '@/shared/utils/cn';

interface MiniGameDescriptionModalProps {
  onClose: (e: React.MouseEvent) => void;
  selectedGame: GameType | null;
  toggleGameSelection: (sort: GameType) => void;
  isFastMode?: boolean;
}

const MiniGameDescriptionModal = ({
  onClose,
  selectedGame,
  toggleGameSelection,
  isFastMode = false,
}: MiniGameDescriptionModalProps) => {
  const gameTypes: GameType[] = isFastMode
    ? ['COINTOSS']
    : ['YAVARWEE', 'COINTOSS', 'PLINKO'];

  useEffect(() => {
    if (isFastMode && selectedGame !== 'COINTOSS') {
      toggleGameSelection('COINTOSS');
    }
  }, [isFastMode, selectedGame, toggleGameSelection]);

  const gameDescription = {
    YAVARWEE:
      '3개의 컵 중 하나의 컵에 공을 숨기고 섞습니다. 공이 들어가있는 컵을 정확히 찾으면 다음 라운드로 진행합니다! 성공할때마다 X1.1, X1.3, X1.5, X2, X5 배율로 포인트가 지급됩니다.',
    COINTOSS:
      '앞, 뒷면에 포인트를 배팅하고 예측에 성공하면 포인트를 2배로 얻습니다!',
    PLINKO:
      '플레이어가 공을 떨어뜨리면 핀에 부딪히며 랜덤한 경로로 내려갑니다. 최종적으로 도착한 슬롯에 적혀진 만큼의 보상을 얻습니다.',
  };

  return (
    <ModalLayout
      title="게임 설명"
      onClose={onClose}
      containerClassName={cn(
        'rounded-lg',
        'bg-gray-700',
        'px-[40px]',
        'py-[36px]',
        'max-w-[40.9375rem]',
        'w-full',
        'space-y-24',
      )}
    >
      <div className={cn('flex', 'flex-wrap', 'gap-y-12', 'gap-x-16')}>
        {gameTypes.map((game) => (
          <SportTypeLabel
            key={game}
            type={game}
            asButton
            isSelected={selectedGame === game}
            onClick={() => toggleGameSelection(game)}
            isHaveBorder={true}
          />
        ))}
      </div>
      <div
        className={cn(
          'flex',
          'p-[1.5rem]',
          'justify-center',
          'items-center',
          'bg-gray-600',
          'rounded-xl',
          'min-h-[7.5rem]',
        )}
      >
        <p className={cn('text-body1s', 'text-white')}>
          {selectedGame ? gameDescription[selectedGame] : '게임을 선택하세요.'}
        </p>
      </div>
    </ModalLayout>
  );
};

export default MiniGameDescriptionModal;
