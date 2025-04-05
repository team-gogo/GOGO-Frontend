import {
  DeleteButton,
  handleRemoveTeam,
} from '@/entities/stage/bracket/ui/DeleteButton';
import RandomAddButton from '@/entities/stage/bracket/ui/RandomAddButton';
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

interface BracketHeaderProps {
  finalStage: number;
  deleteMode: boolean;
  setDeleteMode: (value: boolean) => void;
  gameId: number;
  savedTeamPlacements: Record<string, TeamData>;
  setSavedTeamPlacements: (value: Record<string, TeamData>) => void;
  bracketTree: BracketNode | null;
  setBracketTree: (tree: BracketNode | null) => void;
  firstRoundDistribution: [
    { top: number; bottom: number },
    { top: number; bottom: number },
  ];
}

const BracketHeader = ({
  finalStage,
  deleteMode,
  setDeleteMode,
  gameId,
  savedTeamPlacements,
  setSavedTeamPlacements,
  bracketTree,
  setBracketTree,
  firstRoundDistribution,
}: BracketHeaderProps) => {
  return (
    <header className={cn('mb-30', 'flex', 'justify-between')}>
      <h1 className={cn('text-h3e', 'text-white')}>{finalStage}강</h1>
      <div className={cn('flex', 'gap-24')}>
        <RandomAddButton
          gameId={gameId}
          savedTeamPlacements={savedTeamPlacements}
          setSavedTeamPlacements={setSavedTeamPlacements}
          bracketTree={bracketTree}
          setBracketTree={setBracketTree}
          finalStage={finalStage}
          firstRoundDistribution={firstRoundDistribution}
        />
        <DeleteButton deleteMode={deleteMode} setDeleteMode={setDeleteMode} />
      </div>
    </header>
  );
};

export { BracketHeader, handleRemoveTeam };
