import React, { useState, useEffect, useMemo } from 'react';
import { useFlip } from '../contexts/FlipContext';
import VideoThumbnail from './VideoThumbnail';
import HomeBox from './HomeBox';

interface FlippableGridCellProps {
  children: React.ReactNode;
  index: number;
  className?: string;
}

const FlippableGridCell: React.FC<FlippableGridCellProps> = ({ 
  children, 
  index,
  className = '' 
}) => {
  const { isFlipped, cellFlipStates } = useFlip();
  const [localFlipped, setLocalFlipped] = useState(false);
  
  // Determine transition duration based on index
  const transitionDuration = useMemo(() => {
    const durations = ['duration-600', 'duration-650', 'duration-700', 'duration-750', 'duration-800'];
    return durations[index % durations.length];
  }, [index]);
  
  // Update local flip state based on the cell's individual flip state
  useEffect(() => {
    // If the cell has a specific flip state, use it
    if (cellFlipStates[index] !== undefined) {
      setLocalFlipped(cellFlipStates[index]);
    } else {
      // Otherwise fall back to the global flip state
      setLocalFlipped(isFlipped);
    }
  }, [isFlipped, cellFlipStates, index]);
  
  // Render back side content based on index
  const renderBackContent = () => {
    // For work box at index 8, render HomeBox
    if (index === 8) {
      return <HomeBox />;
    }
    
    // For all other positions, render VideoThumbnail
    return <VideoThumbnail index={index} />;
  };
  
  return (
    <div className={`relative ${className}`}>
      <div 
        className={`
          w-full h-full transition-all ${transitionDuration}
          ${localFlipped ? 'rotate-y-180 opacity-0 pointer-events-none' : 'rotate-y-0 opacity-100'}
        `}
        style={{
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
        }}
      >
        {children}
      </div>
      
      <div 
        className={`
          absolute inset-0 w-full h-full transition-all ${transitionDuration}
          ${localFlipped ? 'rotate-y-0 opacity-100' : 'rotate-y-180 opacity-0 pointer-events-none'}
        `}
        style={{
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
        }}
      >
        {renderBackContent()}
      </div>
    </div>
  );
};

export default FlippableGridCell; 