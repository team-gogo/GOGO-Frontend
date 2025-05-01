import { GameState, Result } from '@/shared/types/mini-game/yavarwee';

export function getStatusText(gameState: GameState, result: Result) {
  switch (gameState) {
    case 'betting':
      return '포인트를 배팅해주세요!';
    case 'showing':
      return '공의 위치를 확인하세요!';
    case 'hiding':
      return '공을 숨기는 중...';
    case 'shuffling':
      return '컵을 섞는 중...';
    case 'selecting':
      return '컵을 선택해주세요!';
    case 'result':
      return result === 'correct' ? '정답입니다!' : '틀렸습니다!';
    default:
      return '';
  }
}
