import React from 'react';
import Input from '@/shared/ui/input';

interface DateInputProps {
  date: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInput = ({ date, onChange }: DateInputProps) => {
  return (
    <div className="flex-1">
      <Input
        type="date"
        placeholder="날짜를 입력해주세요"
        value={date}
        onChange={onChange}
        showBorder={true}
        onClick={(e) => {
          const input = e.target as HTMLInputElement;
          if (input.showPicker) {
            input.showPicker();
          }
        }}
      />
    </div>
  );
};

export default DateInput;
