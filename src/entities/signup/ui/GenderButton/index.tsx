import React from 'react';
import Button from '@/shared/ui/button';
import { getGenderButtonStyles } from '../../model/getGenderButtonStyles';

interface GenderButtonProps {
  gender: 'male' | 'female';
  selectedGender: 'male' | 'female' | null;
  onClick: (gender: 'male' | 'female') => void;
}

const GenderButton = ({
  gender,
  selectedGender,
  onClick,
}: GenderButtonProps) => {
  const styles = getGenderButtonStyles(gender, selectedGender);
  return (
    <Button
      bg={styles.bg}
      textColor={styles.textColor}
      onClick={() => onClick(gender)}
      type="button"
    >
      {gender === 'male' ? '남성' : '여성'}
    </Button>
  );
};

export default GenderButton;
