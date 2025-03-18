'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import BackPageButton from '@/shared/ui/backPageButton';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';

// 임시 데이터 (실제로는 API에서 가져오거나 상태 관리 라이브러리를 사용할 수 있습니다)
const initialMembers = [
  { id: 'member-1', name: '김진원' },
  { id: 'member-2', name: '이진원' },
  { id: 'member-3', name: '박진원' },
  { id: 'member-4', name: '최진원' },
  { id: 'member-5', name: '정진원' },
];

// 포지션 데이터 (실제로는 엔티티에서 가져올 수 있습니다)
const initialPositions = [
  { id: 'position-1', name: '탑', members: [] },
  { id: 'position-2', name: '정글', members: [] },
  { id: 'position-3', name: '미드', members: [] },
  { id: 'position-4', name: '원딜', members: [] },
  { id: 'position-5', name: '서폿', members: [] },
];

const PlaceTeamContainer = () => {
  const [members, setMembers] = useState(initialMembers);
  const [positions, setPositions] = useState(initialPositions);

  // 드래그 앤 드롭 처리 함수
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // 드롭 위치가 없는 경우 (드래그만 하고 드롭하지 않은 경우)
    if (!destination) {
      return;
    }

    // 같은 위치에 드롭한 경우
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // 멤버 목록에서 포지션으로 드래그한 경우
    if (
      source.droppableId === 'members' &&
      destination.droppableId.startsWith('position-')
    ) {
      const positionId = destination.droppableId;
      const memberIndex = source.index;
      const member = members[memberIndex];

      // 이미 해당 포지션에 멤버가 있는지 확인
      const positionIndex = positions.findIndex((p) => p.id === positionId);
      if (positions[positionIndex].members.length > 0) {
        // 이미 멤버가 있으면 교체
        const replacedMember = positions[positionIndex].members[0];

        // 포지션 업데이트
        const newPositions = [...positions];
        newPositions[positionIndex].members = [member];
        setPositions(newPositions);

        // 멤버 목록 업데이트 (교체된 멤버 추가, 드래그한 멤버 제거)
        const newMembers = [...members];
        newMembers.splice(memberIndex, 1);
        newMembers.push(replacedMember);
        setMembers(newMembers);
      } else {
        // 포지션이 비어있으면 추가
        const newPositions = [...positions];
        newPositions[positionIndex].members = [member];
        setPositions(newPositions);

        // 멤버 목록에서 제거
        const newMembers = [...members];
        newMembers.splice(memberIndex, 1);
        setMembers(newMembers);
      }
    }

    // 포지션에서 멤버 목록으로 드래그한 경우
    else if (
      destination.droppableId === 'members' &&
      source.droppableId.startsWith('position-')
    ) {
      const positionId = source.droppableId;
      const positionIndex = positions.findIndex((p) => p.id === positionId);

      // 포지션에서 멤버 가져오기
      const member = positions[positionIndex].members[0];

      // 포지션 업데이트 (멤버 제거)
      const newPositions = [...positions];
      newPositions[positionIndex].members = [];
      setPositions(newPositions);

      // 멤버 목록에 추가
      const newMembers = [...members];
      newMembers.splice(destination.index, 0, member);
      setMembers(newMembers);
    }

    // 포지션 간 이동
    else if (
      source.droppableId.startsWith('position-') &&
      destination.droppableId.startsWith('position-')
    ) {
      const sourcePositionId = source.droppableId;
      const destPositionId = destination.droppableId;

      const sourcePositionIndex = positions.findIndex(
        (p) => p.id === sourcePositionId,
      );
      const destPositionIndex = positions.findIndex(
        (p) => p.id === destPositionId,
      );

      // 소스 포지션에서 멤버 가져오기
      const member = positions[sourcePositionIndex].members[0];

      // 대상 포지션에 이미 멤버가 있는지 확인
      if (positions[destPositionIndex].members.length > 0) {
        // 멤버 교체
        const replacedMember = positions[destPositionIndex].members[0];

        const newPositions = [...positions];
        newPositions[sourcePositionIndex].members = [replacedMember];
        newPositions[destPositionIndex].members = [member];
        setPositions(newPositions);
      } else {
        // 대상 포지션이 비어있는 경우
        const newPositions = [...positions];
        newPositions[sourcePositionIndex].members = [];
        newPositions[destPositionIndex].members = [member];
        setPositions(newPositions);
      }
    }
  };

  return (
    <div className={cn('h-screen', 'bg-black', 'p-30', 'flex', 'flex-col')}>
      <header className={cn('mb-30')}>
        <BackPageButton type="back" label="팀 생성하기" />
      </header>

      <div className={cn('flex', 'flex-1', 'gap-30')}>
        {/* 왼쪽 영역: 멤버 목록 */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={cn('w-1/3', 'bg-gray-900', 'rounded-lg', 'p-4')}>
            <h2 className={cn('text-white', 'text-xl', 'mb-4')}>경기 인원</h2>
            <Droppable droppableId="members">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={cn('space-y-2')}
                >
                  {members.map((member, index) => (
                    <Draggable
                      key={member.id}
                      draggableId={member.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={cn(
                            'bg-gray-800',
                            'p-3',
                            'rounded',
                            'text-white',
                            'flex',
                            'items-center',
                            'justify-between',
                          )}
                        >
                          <span>{member.name}</span>
                          <span className={cn('text-gray-400')}>
                            드래그하여 배치
                          </span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* 오른쪽 영역: 포지션 */}
          <div className={cn('w-2/3', 'bg-gray-900', 'rounded-lg', 'p-4')}>
            <h2 className={cn('text-white', 'text-xl', 'mb-4')}>포지션 배치</h2>
            <div className={cn('grid', 'grid-cols-5', 'gap-4')}>
              {positions.map((position) => (
                <Droppable key={position.id} droppableId={position.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={cn(
                        'bg-gray-800',
                        'p-3',
                        'rounded',
                        'min-h-[100px]',
                        'flex',
                        'flex-col',
                        'items-center',
                        'justify-center',
                        'border',
                        'border-gray-700',
                        snapshot.isDraggingOver ? 'border-blue-500' : '',
                      )}
                    >
                      <div className={cn('text-white', 'mb-2')}>
                        {position.name}
                      </div>
                      {position.members.length > 0 ? (
                        position.members.map((member, index) => (
                          <Draggable
                            key={member.id}
                            draggableId={member.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={cn(
                                  'bg-blue-700',
                                  'p-2',
                                  'rounded',
                                  'text-white',
                                  'w-full',
                                  'text-center',
                                )}
                              >
                                {member.name}
                              </div>
                            )}
                          </Draggable>
                        ))
                      ) : (
                        <div className={cn('text-gray-500', 'text-sm')}>
                          비어 있음
                        </div>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </div>
        </DragDropContext>
      </div>

      <div className={cn('mt-60', 'mb-30')}>
        <Button bg="bg-main-600" textColor="text-white">
          확인
        </Button>
      </div>
    </div>
  );
};

export default PlaceTeamContainer;
