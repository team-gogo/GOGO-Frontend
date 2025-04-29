import React from 'react';
import Input from '@/shared/ui/input';

interface StartTimeInputProps {
  startTime: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StartTimeInput = ({ startTime, onChange }: StartTimeInputProps) => {
  return (
    <div className="flex-1">
      <Input
        type="time"
        placeholder="시작 시간을 입력해주세요"
        value={startTime}
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

export default StartTimeInput;
