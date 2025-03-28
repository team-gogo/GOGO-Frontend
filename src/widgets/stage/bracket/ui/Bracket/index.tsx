'use client';

import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import TeamItem from '@/entities/stage/bracket/ui/TeamItem';
import { cn } from '@/shared/utils/cn';
import TeamArray from '@/widgets/stage/bracket/ui/TeamArray';

interface GroupDistribution {
  top: number;
  bottom: number;
}

interface BracketNode {
  round: number;
  position: number;
  teamName: string;
  left: BracketNode | null;
  right: BracketNode | null;
  isEmpty?: boolean;
}

const Bracket = () => {
  const [totalTeams, setTotalTeams] = useState(4);
  const [finalStage, setFinalStage] = useState(4);
  const [bracketTree, setBracketTree] = useState<BracketNode | null>(null);
  const [firstRoundDistribution, setFirstRoundDistribution] = useState<
    [GroupDistribution, GroupDistribution]
  >([
    { top: 1, bottom: 1 },
    { top: 1, bottom: 1 },
  ]);

  const createBracketTree = (teamCount: number): BracketNode | null => {
    if (teamCount < 2) return null;

    const rounds = teamCount <= 4 ? 2 : 3;
    const totalPositions = Math.pow(2, rounds);

    const nodes: BracketNode[][] = Array(rounds)
      .fill(null)
      .map(() => []);

    for (let i = 0; i < totalPositions / 2; i++) {
      nodes[0].push({
        round: 1,
        position: i,
        teamName: 'TBD',
        left: null,
        right: null,
        isEmpty: true,
      });
    }

    for (let round = 1; round < rounds; round++) {
      const prevRoundNodes = nodes[round - 1];
      for (let i = 0; i < prevRoundNodes.length; i += 2) {
        const node: BracketNode = {
          round: round + 1,
          position: Math.floor(i / 2),
          teamName: 'TBD',
          left: prevRoundNodes[i],
          right: prevRoundNodes[i + 1] || null,
          isEmpty: true,
        };
        nodes[round].push(node);
      }
    }

    return nodes[rounds - 1][0];
  };

  const calculateTeamDistribution = (
    teamCount: number,
  ): [GroupDistribution, GroupDistribution] => {
    if (teamCount <= 4) {
      const leftTotal = Math.ceil(teamCount / 2);
      const rightTotal = Math.floor(teamCount / 2);
      return [
        { top: leftTotal, bottom: 0 },
        { top: rightTotal, bottom: 0 },
      ];
    }

    const leftTotal = Math.ceil(teamCount / 2);
    const rightTotal = Math.floor(teamCount / 2);

    return [
      {
        top: Math.ceil(leftTotal / 2),
        bottom: Math.floor(leftTotal / 2),
      },
      {
        top: Math.ceil(rightTotal / 2),
        bottom: Math.floor(rightTotal / 2),
      },
    ];
  };

  const createBracket = (teamCount: number): void => {
    if (teamCount < 2) return;
    setFinalStage(teamCount <= 4 ? 4 : 8);
    setFirstRoundDistribution(calculateTeamDistribution(teamCount));
    setBracketTree(createBracketTree(teamCount));
  };

  useEffect(() => {
    createBracket(totalTeams);
  }, [totalTeams]);

  const getNodesAtRound = (
    root: BracketNode | null,
    targetRound: number,
  ): BracketNode[] => {
    if (!root) return [];

    const result: BracketNode[] = [];
    const queue = [root];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (current.round === targetRound) {
        result.push(current);
      } else if (current.round < targetRound) {
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
      }
    }

    return result.sort((a, b) => a.position - b.position);
  };

  const updateTeamInTree = (
    teamName: string,
    round: number,
    position: number,
  ) => {
    if (!bracketTree) return;

    const updateNode = (node: BracketNode): BracketNode => {
      if (node.round === round && node.position === position) {
        return {
          ...node,
          teamName,
          isEmpty: false,
        };
      }

      return {
        ...node,
        left: node.left ? updateNode(node.left) : null,
        right: node.right ? updateNode(node.right) : null,
      };
    };

    setBracketTree(updateNode(bracketTree));
  };

  const renderFirstRoundGroup = (
    teamCount: number,
    nodes: BracketNode[],
    round: number,
  ) => (
    <div
      className={cn(
        'flex-1',
        'flex',
        'flex-col',
        'justify-around',
        'items-center',
      )}
    >
      {Array(teamCount)
        .fill(null)
        .map((_, _idx) => {
          const node = nodes[_idx];
          const droppableId = `round_${round}_position_${node?.position ?? _idx}`;

          return (
            <Droppable key={droppableId} droppableId={droppableId}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    'w-[160px]',
                    snapshot.isDraggingOver && 'bg-blue-500/20',
                    'rounded-lg',
                  )}
                >
                  <TeamItem
                    teamName={node?.teamName || 'TBD'}
                    isEmpty={node?.isEmpty ?? true}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
    </div>
  );

  const renderBracketColumn = (
    round: number,
    position: number,
    isFirstRound: boolean = false,
    distribution?: GroupDistribution,
  ) => {
    const nodesInRound = getNodesAtRound(bracketTree, round);

    if (isFirstRound && distribution) {
      const topNodes = nodesInRound.slice(0, distribution.top);
      const bottomNodes = nodesInRound.slice(
        distribution.top,
        distribution.top + distribution.bottom,
      );

      return (
        <div
          className={cn(
            'flex',
            'flex-col',
            'h-full',
            'items-center',
            'w-[180px]',
            'gap-4',
          )}
        >
          {renderFirstRoundGroup(distribution.top, topNodes, round)}
          {renderFirstRoundGroup(distribution.bottom, bottomNodes, round)}
        </div>
      );
    }

    return (
      <div
        className={cn(
          'flex',
          'flex-col',
          'justify-around',
          'h-full',
          'items-center',
          'w-[180px]',
          round === 2 && 'w-[200px]',
        )}
      >
        {Array(position)
          .fill(null)
          .map((_, _idx) => {
            const node = nodesInRound[_idx];
            const droppableId = `round_${round}_position_${node?.position ?? _idx}`;

            return (
              <Droppable key={droppableId} droppableId={droppableId}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cn(
                      'w-[160px]',
                      snapshot.isDraggingOver && 'bg-blue-500/20',
                      'rounded-lg',
                    )}
                  >
                    <TeamItem
                      teamName={node?.teamName || 'TBD'}
                      isEmpty={node?.isEmpty ?? true}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
      </div>
    );
  };

  const renderBracket = () => {
    if (finalStage === 4) {
      return (
        <div
          className={cn('flex', 'justify-between', 'w-full', 'h-full', 'gap-4')}
        >
          {renderBracketColumn(
            1,
            firstRoundDistribution[0].top + firstRoundDistribution[0].bottom,
          )}
          {renderBracketColumn(2, 1)}
          {renderBracketColumn(2, 1)}
          {renderBracketColumn(
            1,
            firstRoundDistribution[1].top + firstRoundDistribution[1].bottom,
          )}
        </div>
      );
    }

    return (
      <div
        className={cn('flex', 'justify-between', 'w-full', 'h-full', 'gap-4')}
      >
        {renderBracketColumn(1, 0, true, firstRoundDistribution[0])}
        {renderBracketColumn(
          2,
          Math.ceil(
            (firstRoundDistribution[0].top + firstRoundDistribution[0].bottom) /
              2,
          ),
        )}
        {renderBracketColumn(3, 1)}
        {renderBracketColumn(3, 1)}
        {renderBracketColumn(
          2,
          Math.ceil(
            (firstRoundDistribution[1].top + firstRoundDistribution[1].bottom) /
              2,
          ),
        )}
        {renderBracketColumn(1, 0, true, firstRoundDistribution[1])}
      </div>
    );
  };

  const renderControls = () => (
    <div className={cn('flex', 'gap-4', 'mb-4')}>
      <button
        onClick={() => setTotalTeams((prev) => Math.max(2, prev - 1))}
        className={cn('px-4', 'py-2', 'bg-gray-600', 'text-white', 'rounded')}
      >
        -
      </button>
      <span className={cn('text-white', 'flex', 'items-center')}>
        {totalTeams}
      </span>
      <button
        onClick={() => setTotalTeams((prev) => Math.min(8, prev + 1))}
        className={cn('px-4', 'py-2', 'bg-gray-600', 'text-white', 'rounded')}
      >
        +
      </button>
    </div>
  );

  const handleTeamDrop = (
    teamName: string,
    round: number,
    position: number,
  ) => {
    updateTeamInTree(teamName, round, position);
  };

  return (
    <DragDropContext onDragEnd={() => {}}>
      <div
        className={cn('min-h-[600px]', 'bg-black', 'p-30', 'flex', 'flex-col')}
      >
        {renderControls()}
        <header className={cn('mb-30')}>
          <h1 className={cn('text-h3e', 'text-white')}>{finalStage}강</h1>
        </header>
        <div className={cn('flex-1', 'bg-gray-700', 'rounded-lg', 'p-20')}>
          {renderBracket()}
        </div>
      </div>
      <TeamArray className="mb-30" onTeamDrop={handleTeamDrop} />
    </DragDropContext>
  );
};

export default Bracket;
