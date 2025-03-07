import React, { useState, useEffect, useMemo } from 'react';
import { useFlip } from '../contexts/FlipContext';
import VideoThumbnail from './VideoThumbnail';
import HomeBox from './HomeBox';

interface FlippableGridCellProps {
  children: React.ReactNode;
  index: number;
  className?: string;
}

/**
 * FlippableGridCell - Handles the 3D flip animation between front and back content
 * Simplified implementation focusing on reliable interaction
 */
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
      {/* Simplified structure with clearer z-index and pointer-events handling */}
      <div 
        className="w-full h-full perspective-1000"
        style={{ perspective: '1000px' }}
      >
        <div 
          className={`relative w-full h-full transition-all duration-700`}
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front face */}
          <div 
            className="absolute inset-0 backface-hidden"
            style={{ 
              backfaceVisibility: 'hidden',
              opacity: isFlipped ? 0 : 1,
              pointerEvents: isFlipped ? 'none' : 'auto',
              zIndex: isFlipped ? 0 : 2,
              transition: 'opacity 300ms ease'
            }}
          >
            {children}
          </div>
          
          {/* Back face */}
          <div 
            className="absolute inset-0 backface-hidden"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              opacity: isFlipped ? 1 : 0,
              pointerEvents: isFlipped ? 'auto' : 'none',
              zIndex: isFlipped ? 2 : 0,
              transition: 'opacity 300ms ease'
            }}
          >
            {renderBackContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlippableGridCell; 