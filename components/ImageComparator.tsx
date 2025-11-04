import React, { useState, useRef, useEffect } from 'react';

interface ImageComparatorProps {
  original: string;
  enhanced: string;
}

export const ImageComparator: React.FC<ImageComparatorProps> = ({ original, enhanced }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let newPosition = ((clientX - rect.left) / rect.width) * 100;
    newPosition = Math.max(0, Math.min(100, newPosition));
    setSliderPosition(newPosition);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) handleMove(e.touches[0].clientX);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);


  return (
    <div 
      ref={containerRef} 
      className="relative w-full max-w-4xl mx-auto aspect-video select-none glass-ui rounded-lg overflow-hidden"
      onMouseLeave={handleMouseUp}
    >
      <img
        src={original}
        alt="Original"
        className="absolute top-0 left-0 w-full h-full object-contain"
        draggable={false}
      />
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={enhanced}
          alt="Enhanced"
          className="absolute top-0 left-0 w-full h-full object-contain"
          draggable={false}
        />
      </div>
      <div
        className="absolute top-0 h-full w-1 bg-purple-400 cursor-ew-resize glow-purple"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-9 h-9 bg-purple-500 border-2 border-white rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
            </svg>
        </div>
      </div>
    </div>
  );
};
