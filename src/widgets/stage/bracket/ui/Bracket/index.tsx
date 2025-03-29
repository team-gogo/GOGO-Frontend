'use client';

import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
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
  isEmpty: boolean;
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
        teamName: '',
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

    if (targetRound === 1) {
      return Array(4)
        .fill(null)
        .map((_, idx) => ({
          round: 1,
          position: idx,
          teamName: '',
          left: null,
          right: null,
          isEmpty: true,
        }));
    }

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

  const renderFirstRoundGroup = (
    teamCount: number,
    nodes: BracketNode[],
    round: number,
    side: 'left' | 'right',
  ) => {
    let placedTeams: Record<string, string> = {};
    try {
      const placedTeamsData = sessionStorage.getItem('placedTeams');
      if (placedTeamsData) {
        placedTeams = JSON.parse(placedTeamsData);
      }
    } catch (error) {
      console.error('배치된 팀 정보 가져오기 오류:', error);
    }

    return (
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
            const defaultNode = {
              round: 1,
              position: _idx,
              teamName: '',
              left: null,
              right: null,
              isEmpty: true,
            };
            const node = nodes[_idx] || defaultNode;
            const droppableId = `round_${round}_position_${node.position}_side_${side}`;

            const positionKey = `${round}_${node.position}_${side}`;
            const placedTeamName = placedTeams[positionKey] || '';
            const hasTeam = !!placedTeamName;

            return (
              <div key={droppableId} className="relative">
                {!hasTeam && (
                  <TeamItem
                    teamName=""
                    isEmpty={true}
                    className={cn(
                      'w-[160px]',
                      'absolute',
                      'top-0',
                      'left-0',
                      'z-0',
                      'team-item-empty',
                    )}
                  />
                )}
                <Droppable key={droppableId} droppableId={droppableId}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={cn(
                        'w-[160px]',
                        'h-[48px]',
                        'relative',
                        'rounded-lg',
                        'transition-all',
                        'duration-200',
                        'z-10',
                        snapshot.isDraggingOver && !hasTeam
                          ? 'border-2 border-blue-400 bg-blue-500/40'
                          : 'bg-transparent',
                        snapshot.isDraggingOver && hasTeam && 'bg-red-500/20',
                      )}
                    >
                      {hasTeam && (
                        <TeamItem
                          teamName={placedTeamName}
                          isEmpty={false}
                          className="w-[160px]"
                        />
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
      </div>
    );
  };

  const isLeafNode = (round: number): boolean => {
    return round === 1;
  };

  const renderBracketColumn = (
    round: number,
    position: number,
    isFirstRound: boolean = false,
    distribution?: GroupDistribution,
    side: 'left' | 'right' = 'left',
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
          {renderFirstRoundGroup(distribution.top, topNodes, round, side)}
          {renderFirstRoundGroup(distribution.bottom, bottomNodes, round, side)}
        </div>
      );
    }

    let placedTeams: Record<string, string> = {};
    try {
      const placedTeamsData = sessionStorage.getItem('placedTeams');
      if (placedTeamsData) {
        placedTeams = JSON.parse(placedTeamsData);
      }
    } catch (error) {
      console.error('배치된 팀 정보 가져오기 오류:', error);
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
            const defaultNode = {
              round,
              position: _idx,
              teamName: '',
              left: null,
              right: null,
              isEmpty: true,
            };
            const node = nodesInRound[_idx] || defaultNode;
            const droppableId = `round_${round}_position_${node.position}_side_${side}`;
            const isLeaf = isLeafNode(round);

            const positionKey = `${round}_${node.position}_${side}`;
            const placedTeamName = placedTeams[positionKey] || '';
            const hasTeam = isLeaf ? !!placedTeamName : false;

            return (
              <div key={droppableId} className="relative">
                {isLeaf ? (
                  <>
                    {!hasTeam && (
                      <TeamItem
                        teamName=""
                        isEmpty={true}
                        className={cn(
                          'w-[160px]',
                          'absolute',
                          'top-0',
                          'left-0',
                          'z-0',
                          'team-item-empty',
                        )}
                      />
                    )}
                    <Droppable droppableId={droppableId}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={cn(
                            'w-[160px]',
                            'h-[48px]',
                            'relative',
                            'rounded-lg',
                            'transition-all',
                            'duration-200',
                            'z-10',
                            snapshot.isDraggingOver && !hasTeam
                              ? 'border-2 border-blue-400 bg-blue-500/40'
                              : 'bg-transparent',
                            snapshot.isDraggingOver &&
                              hasTeam &&
                              'bg-red-500/20',
                          )}
                        >
                          {hasTeam && (
                            <TeamItem
                              teamName={placedTeamName}
                              isEmpty={false}
                              className="w-[160px]"
                            />
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </>
                ) : (
                  <TeamItem teamName="TBD" className="w-[160px]" />
                )}
              </div>
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
            false,
            undefined,
            'left',
          )}
          {renderBracketColumn(2, 1, false, undefined, 'left')}
          {renderBracketColumn(2, 1, false, undefined, 'right')}
          {renderBracketColumn(
            1,
            firstRoundDistribution[1].top + firstRoundDistribution[1].bottom,
            false,
            undefined,
            'right',
          )}
        </div>
      );
    }

    return (
      <div
        className={cn('flex', 'justify-between', 'w-full', 'h-full', 'gap-4')}
      >
        {renderBracketColumn(1, 0, true, firstRoundDistribution[0], 'left')}
        {renderBracketColumn(
          2,
          Math.ceil(
            (firstRoundDistribution[0].top + firstRoundDistribution[0].bottom) /
              2,
          ),
          false,
          undefined,
          'left',
        )}
        {renderBracketColumn(3, 1, false, undefined, 'left')}
        {renderBracketColumn(3, 1, false, undefined, 'right')}
        {renderBracketColumn(
          2,
          Math.ceil(
            (firstRoundDistribution[1].top + firstRoundDistribution[1].bottom) /
              2,
          ),
          false,
          undefined,
          'right',
        )}
        {renderBracketColumn(1, 0, true, firstRoundDistribution[1], 'right')}
      </div>
    );
  };

  const renderControls = () => (
    <div className={cn('flex', 'gap-4', 'mb-4')}>
      <button
        type="button"
        onClick={() => setTotalTeams((prev) => Math.max(2, prev - 1))}
        className={cn(
          'px-4',
          'py-2',
          'bg-gray-600',
          'text-white',
          'rounded',
          'hover:bg-gray-500',
          'transition-colors',
        )}
      >
        -
      </button>
      <span className={cn('text-white', 'flex', 'items-center')}>
        {totalTeams}
      </span>
      <button
        type="button"
        onClick={() => setTotalTeams((prev) => Math.min(8, prev + 1))}
        className={cn(
          'px-4',
          'py-2',
          'bg-gray-600',
          'text-white',
          'rounded',
          'hover:bg-gray-500',
          'transition-colors',
        )}
      >
        +
      </button>
    </div>
  );

  const handleTeamDrop = (
    teamName: string,
    round: number,
    position: number,
    side: 'left' | 'right',
  ) => {
    console.log(
      `팀 ${teamName}을 라운드 ${round}, 포지션 ${position}, 위치 ${side}에 배치합니다.`,
    );

    try {
      let placedTeams: Record<string, string> = {};
      const placedTeamsData = sessionStorage.getItem('placedTeams');
      if (placedTeamsData) {
        placedTeams = JSON.parse(placedTeamsData);
      }

      const positionKey = `${round}_${position}_${side}`;
      placedTeams[positionKey] = teamName;

      sessionStorage.setItem('placedTeams', JSON.stringify(placedTeams));

      if (!bracketTree) {
        const newRoot = createBracketTree(totalTeams);
        if (newRoot) {
          setBracketTree(newRoot);
        }
      } else {
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

      window.dispatchEvent(new Event('storage'));

      setTimeout(() => {
        window.dispatchEvent(new Event('storage'));
      }, 100);
    } catch (error) {
      console.error('팀 배치 중 오류 발생:', error);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (typeof document !== 'undefined') {
      document.body.classList.remove('dragging');
    }

    console.log('드래그 종료:', result);

    if (!result.destination) {
      console.log('드롭 대상이 없습니다.');
      return;
    }

    console.log(
      `드래그 소스: ${result.source.droppableId}, 드롭 대상: ${result.destination.droppableId}`,
    );

    if (
      result.source.droppableId === 'teams' &&
      result.destination.droppableId.startsWith('round_')
    ) {
      const parts = result.destination.droppableId.split('_');
      const roundNum = parseInt(parts[1]);
      const positionNum = parseInt(parts[3]);
      const side = parts[5] as 'left' | 'right';

      console.log(
        `팀 ${result.draggableId}를 라운드 ${roundNum}, 포지션 ${positionNum}, 위치 ${side}에 배치 시도`,
      );

      handleTeamDrop(result.draggableId, roundNum, positionNum, side);

      try {
        window.dispatchEvent(new Event('storage'));
      } catch (error) {
        console.error('스토리지 이벤트 발생 중 오류:', error);
      }
    } else {
      console.log('드래그 소스가 팀 목록이 아니거나 대상이 유효하지 않습니다.');
    }
  };

  useEffect(() => {
    try {
      const savedBracketState = sessionStorage.getItem('bracketState');
      if (savedBracketState) {
        const parsedState = JSON.parse(savedBracketState);
        setBracketTree(parsedState);
      }
    } catch (error) {
      console.error('저장된 브래킷 상태 복원 중 오류 발생:', error);
    }
  }, []);

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragStart={() => {
        if (typeof document !== 'undefined') {
          document.body.classList.add('dragging');
        }
      }}
      enableDefaultSensors={true}
      dragHandleUsageInstructions=""
    >
      <div
        className={cn('min-h-[600px]', 'bg-black', 'p-30', 'flex', 'flex-col')}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
            [data-rbd-drag-placeholder] {
              opacity: 0 !important;
            }
            [data-rbd-draggable-context-id] {
              transition: transform 0.1s;
            }
            .draggable-clone {
              z-index: 9999 !important;
              cursor: grabbing !important;
              opacity: 1 !important;
              box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3) !important;
            }
            .relative {
              position: relative;
            }
            .team-item-empty {
              visibility: visible !important;
              opacity: 0.4 !important;
            }
            
            [data-rbd-placeholder-context-id] {
              display: none !important;
            }
            
            div[data-rbd-draggable-id] {
              transition: none !important;
            }
          `,
          }}
        />
        {renderControls()}
        <header className={cn('mb-30')}>
          <h1 className={cn('text-h3e', 'text-white')}>{finalStage}강</h1>
        </header>
        <div className={cn('flex-1', 'bg-gray-700', 'rounded-lg', 'p-20')}>
          {renderBracket()}
        </div>
      </div>
      <TeamArray className="mb-30" />
    </DragDropContext>
  );
};

export default Bracket;
