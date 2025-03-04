import React from 'react';
import Button from '@/shared/ui/button';
import { getGenderButtonStyles } from '../../model/getGenderButtonStyles';

interface GenderButtonProps {
  gender: 'MALE' | 'FEMALE';
  selectedGender: 'MALE' | 'FEMALE' | null;
  onClick: (gender: 'MALE' | 'FEMALE') => void;
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
      {gender === 'MALE' ? '남성' : '여성'}
    </Button>
  );
};

export default GenderButton;
