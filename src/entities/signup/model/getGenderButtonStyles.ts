interface GenderButtonStyles {
  bg: string;
  textColor: string;
}

export const getGenderButtonStyles = (
  gender: 'MALE' | 'FEMALE',
  selectedGender: 'MALE' | 'FEMALE' | null,
): GenderButtonStyles => ({
  bg: selectedGender === gender ? 'bg-main-400' : 'bg-gray-700',
  textColor: selectedGender === gender ? 'text-white' : 'text-gray-400',
});
