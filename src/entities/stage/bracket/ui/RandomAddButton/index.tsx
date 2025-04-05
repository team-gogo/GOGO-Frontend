import { toast } from 'react-toastify';
import PlusButtonIcon from '@/shared/assets/svg/PlusButtonIcon';
import { cn } from '@/shared/utils/cn';

interface TeamData {
  teamId: number;
  teamName: string;
}

interface BracketNode {
  round: number;
  position: number;
  teamName: string;
  teamId?: number;
  left: BracketNode | null;
  right: BracketNode | null;
  isEmpty: boolean;
}

interface RandomAddButtonProps {
  gameId: number;
  savedTeamPlacements: Record<string, TeamData>;
  setSavedTeamPlacements: (value: Record<string, TeamData>) => void;
  bracketTree: BracketNode | null;
  setBracketTree: (tree: BracketNode | null) => void;
  finalStage: number;
  firstRoundDistribution: [
    { top: number; bottom: number },
    { top: number; bottom: number },
  ];
}

const RandomAddButton = ({
  gameId,
  savedTeamPlacements,
  setSavedTeamPlacements,
  bracketTree,
  setBracketTree,
  finalStage,
  firstRoundDistribution,
}: RandomAddButtonProps) => {
  const handleRandomPlacement = () => {
    try {
      const placedTeams: Record<string, TeamData> = { ...savedTeamPlacements };
      const placedTeamsData = sessionStorage.getItem(`placedTeams_${gameId}`);
      if (placedTeamsData) {
        Object.assign(placedTeams, JSON.parse(placedTeamsData));
      }

      const confirmedTeamsData = sessionStorage.getItem(
        `confirmedTeams_${gameId}`,
      );
      if (!confirmedTeamsData) {
        toast.error('배치할 팀이 없습니다.');
        return;
      }

      const parsedTeams = JSON.parse(confirmedTeamsData);
      const allTeams = parsedTeams as TeamData[];

      const placedTeamIds = Object.values(placedTeams).map((t) => t.teamId);
      const availableTeams = allTeams.filter(
        (team) => !placedTeamIds.includes(team.teamId),
      );

      if (availableTeams.length === 0) {
        toast.error('모든 팀이 이미 배치되었습니다.');
        return;
      }

      const emptyPositions: Array<{
        round: number;
        position: number;
        side: 'left' | 'right';
      }> = [];

      if (finalStage === 4) {
        const round = 1;
        const leftCount =
          firstRoundDistribution[0].top + firstRoundDistribution[0].bottom;
        const rightCount =
          firstRoundDistribution[1].top + firstRoundDistribution[1].bottom;

        for (let i = 0; i < leftCount; i++) {
          const positionKey = `${round}_${i}_left`;
          if (!placedTeams[positionKey]) {
            emptyPositions.push({ round, position: i, side: 'left' });
          }
        }

        for (let i = 0; i < rightCount; i++) {
          const positionKey = `${round}_${i}_right`;
          if (!placedTeams[positionKey]) {
            emptyPositions.push({ round, position: i, side: 'right' });
          }
        }
      } else {
        const round = 1;

        for (let i = 0; i < firstRoundDistribution[0].top; i++) {
          const positionKey = `${round}_${i}_left`;
          if (!placedTeams[positionKey]) {
            emptyPositions.push({ round, position: i, side: 'left' });
          }
        }

        for (let i = 0; i < firstRoundDistribution[0].bottom; i++) {
          const position = firstRoundDistribution[0].top + i;
          const positionKey = `${round}_${position}_left`;
          if (!placedTeams[positionKey]) {
            emptyPositions.push({ round, position, side: 'left' });
          }
        }

        for (let i = 0; i < firstRoundDistribution[1].top; i++) {
          const positionKey = `${round}_${i}_right`;
          if (!placedTeams[positionKey]) {
            emptyPositions.push({ round, position: i, side: 'right' });
          }
        }

        for (let i = 0; i < firstRoundDistribution[1].bottom; i++) {
          const position = firstRoundDistribution[1].top + i;
          const positionKey = `${round}_${position}_right`;
          if (!placedTeams[positionKey]) {
            emptyPositions.push({ round, position, side: 'right' });
          }
        }
      }

      if (emptyPositions.length === 0) {
        toast.error('비어있는 위치가 없습니다.');
        return;
      }

      const maxPositions = Math.min(
        availableTeams.length,
        emptyPositions.length,
      );

      const shuffledTeams = [...availableTeams].sort(() => Math.random() - 0.5);
      const shuffledPositions = [...emptyPositions].sort(
        () => Math.random() - 0.5,
      );

      for (let i = 0; i < maxPositions; i++) {
        const team = shuffledTeams[i];
        const { round, position, side } = shuffledPositions[i];
        const positionKey = `${round}_${position}_${side}`;
        placedTeams[positionKey] = team;
      }

      sessionStorage.setItem(
        `placedTeams_${gameId}`,
        JSON.stringify(placedTeams),
      );
      setSavedTeamPlacements(placedTeams);

      const customEvent = new CustomEvent('bracketStorage', {
        detail: { gameId },
      });
      window.dispatchEvent(customEvent);

      if (bracketTree) {
        const cloneTree = (node: BracketNode): BracketNode => {
          return {
            ...node,
            left: node.left ? cloneTree(node.left) : null,
            right: node.right ? cloneTree(node.right) : null,
          };
        };

        const updatedTree = cloneTree(bracketTree);
        setBracketTree(updatedTree);
      }
      if (allTeams.length === 3) {
        const placedTeamsData = sessionStorage.getItem(`placedTeams_${gameId}`);
        if (placedTeamsData) {
          const placedTeamsObj = JSON.parse(placedTeamsData);
          const byeTeam = placedTeamsObj['1_0_right'];
          if (byeTeam) {
            sessionStorage.setItem(
              `threeTeamBye_${gameId}`,
              JSON.stringify(byeTeam),
            );
          }
        }
      }
      toast.success(`${maxPositions}개 팀이 랜덤으로 배치되었습니다.`);
    } catch (error) {
      console.error(error);
      toast.error('팀 랜덤 배치 중 오류가 발생했습니다.');
    }
  };

  return (
    <button
      type="button"
      className={cn('flex', 'items-center', 'gap-10')}
      onClick={handleRandomPlacement}
    >
      <PlusButtonIcon color="#6B6B6B" />
      <h2 className={cn('text-gray-500', 'text-body1s')}>랜덤 추가</h2>
    </button>
  );
};

export default RandomAddButton;
