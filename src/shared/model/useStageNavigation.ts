import { useState } from 'react';

const useStageNavigation = (stagesLength: number, visibleCount: number) => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + 1 <= stagesLength - visibleCount ? prev + 1 : prev,
    );
  };

  return {
    startIndex,
    handlePrev,
    handleNext,
  };
};

export default useStageNavigation;
