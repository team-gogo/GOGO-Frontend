'use client';

import { useState, forwardRef, useImperativeHandle } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { toast } from 'react-toastify';
import { SearchIcon } from '@/shared/assets/icons';
import { StageData, Student } from '@/shared/types/stage/create';
import Input from '@/shared/ui/input';
import ModalLayout from '@/shared/ui/modalLayout';
import SearchResults from '@/shared/ui/SearchResults';
import { cn } from '@/shared/utils/cn';
import { useSearchStudentQuery } from '@/widgets/stage/create/model/useSearchStudentQuery';

interface Props {
  register: UseFormRegister<StageData>;
  setValue: UseFormSetValue<StageData>;
  title?: string;
  description?: string;
}

interface StudentResponse {
  students: Student[];
}

export interface InviteStudentInputRef {
  getSelectedStudents: () => Student[];
}

const InviteStudentInput = forwardRef<InviteStudentInputRef, Props>(
  (
    {
      register,
      setValue,
      title = '관리할 학생 (최대 5명)',
      description = '관리할 학생은 선택사항입니다.',
    },
    ref,
  ) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);

    useImperativeHandle(ref, () => ({
      getSelectedStudents: () => selectedStudents,
    }));

    const { data, isLoading } = useSearchStudentQuery(searchTerm) as {
      data: StudentResponse | undefined;
      isLoading: boolean;
    };

    const students = data?.students || [];

    const handleInputClick = () => {
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    const handleStudentSelect = (students: Student[]) => {
      if (students.length > 5) {
        toast.error('최대 5명까지 선택 가능합니다.');
        return;
      }
      setSelectedStudents(students);
      setValue(
        'maintainer',
        students.map((student) => student.studentId),
      );
      setSearchTerm('');
      setIsModalOpen(false);
    };

    const getStudentId = (student: Student) => student.studentId;

    return (
      <div className={cn('space-y-16')}>
        <div className={cn('flex', 'gap-12', 'items-center')}>
          <p className={cn('text-white', 'text-body2e')}>{title}</p>
          <p className={cn('text-caption1s', 'text-gray-500')}>{description}</p>
        </div>
        <Input
          {...register('maintainer')}
          placeholder="학생을 입력해주세요"
          icon={<SearchIcon size={24} color="#fff" />}
          onClick={handleInputClick}
          readOnly
          value={selectedStudents
            .map(
              (s) =>
                `${s.grade}${s.classNumber}${String(s.studentNumber).padStart(2, '0')} ${s.name}`,
            )
            .join(', ')}
        />

        {isModalOpen && (
          <ModalLayout
            showHeader={false}
            onClose={handleCloseModal}
            containerClassName="bg-gray-700 rounded-lg w-full max-w-[40.5rem]"
          >
            <div className={cn('px-24', 'pt-24')}>
              <Input
                placeholder="학생을 입력해주세요"
                showBorder={true}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<SearchIcon size={24} color="#fff" />}
              />
            </div>
            <SearchResults<Student>
              items={students}
              isLoading={isLoading}
              SearchinputValue={searchTerm}
              onSelect={handleStudentSelect}
              getDisplayName={(student) =>
                `${student.grade}${student.classNumber}${String(student.studentNumber).padStart(2, '0')} ${student.name}`
              }
              isAbsolute={false}
              multiSelect={true}
              selectedItems={selectedStudents}
              getItemId={getStudentId}
              showCheckbox={true}
              istotalSelect={true}
              isDisabled={false}
            />
          </ModalLayout>
        )}
      </div>
    );
  },
);

InviteStudentInput.displayName = 'InviteStudentInput';

export default InviteStudentInput;
