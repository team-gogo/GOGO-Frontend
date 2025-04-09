import { useState, useEffect } from 'react';

interface SvgBounds {
  width: number;
  height: number;
  left: number;
  top: number;
}

const useSvgBounds = (isLargeScreen: boolean) => {
  const [svgBounds, setSvgBounds] = useState<SvgBounds>({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });

  useEffect(() => {
    const updateSvgBounds = () => {
      const courtElement = document.getElementById('court-droppable');
      if (courtElement) {
        const svg = courtElement.querySelector('svg');
        if (svg) {
          const courtRect = courtElement.getBoundingClientRect();
          const svgRect = svg.getBoundingClientRect();
          setSvgBounds({
            width: Math.max(svgRect.width, 300),
            height: svgRect.height,
            left: svgRect.left - courtRect.left,
            top: svgRect.top - courtRect.top,
          });
        }
      }
    };

    updateSvgBounds();
    window.addEventListener('resize', updateSvgBounds);
    const timeoutId = setTimeout(updateSvgBounds, 100);

    return () => {
      window.removeEventListener('resize', updateSvgBounds);
      clearTimeout(timeoutId);
    };
  }, [isLargeScreen]);

  return svgBounds;
};

export default useSvgBounds;
