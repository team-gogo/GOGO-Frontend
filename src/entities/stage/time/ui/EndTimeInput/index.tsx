import React from 'react';
import Input from '@/shared/ui/input';

interface EndTimeInputProps {
  endTime: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EndTimeInput = ({ endTime, onChange }: EndTimeInputProps) => {
  return (
    <div className="flex-1">
      <Input
        type="time"
        placeholder="끝나는 시간을 입력해주세요"
        value={endTime}
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

export default EndTimeInput;
