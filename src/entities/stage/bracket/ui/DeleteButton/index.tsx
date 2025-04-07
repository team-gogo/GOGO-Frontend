import { toast } from 'react-toastify';
import MinusButtonIcon from '@/shared/assets/svg/MinusButtonIcon';
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

interface DeleteButtonProps {
  deleteMode: boolean;
  setDeleteMode: (value: boolean) => void;
}

const handleRemoveTeam = (
  round: number,
  position: number,
  side: 'left' | 'right',
  gameId: number,
  savedTeamPlacements: Record<string, TeamData>,
  setSavedTeamPlacements: (value: Record<string, TeamData>) => void,
  bracketTree: BracketNode | null,
  setBracketTree: (tree: BracketNode | null) => void,
) => {
  try {
    const placedTeams: Record<string, TeamData> = { ...savedTeamPlacements };
    const positionKey = `${round}_${position}_${side}`;

    delete placedTeams[positionKey];
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
  } catch (error) {
    console.error(error);
    toast.error('팀 삭제 중 오류가 발생했습니다.');
  }
};

const DeleteButton = ({ deleteMode, setDeleteMode }: DeleteButtonProps) => {
  return (
    <button
      type="button"
      onClick={() => setDeleteMode(!deleteMode)}
      className={cn(
        'flex',
        'items-center',
        'gap-10',
        deleteMode && 'text-red-500',
      )}
    >
      <MinusButtonIcon isActive={deleteMode} />
      <h2
        className={cn(
          'text-gray-500',
          'text-body1s',
          deleteMode && 'text-red-500',
        )}
      >
        빼기
      </h2>
    </button>
  );
};

export { DeleteButton, handleRemoveTeam };
