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
  
  // Determine transition duration based on index with more variety
  const transitionDuration = useMemo(() => {
    const durations = ['duration-500', 'duration-550', 'duration-600', 'duration-650', 'duration-700', 'duration-750', 'duration-800', 'duration-850', 'duration-900'];
    return durations[Math.floor(Math.random() * durations.length)];
  }, []);
  
  // Generate a random rotation direction for more dynamic flipping
  const rotationDirection = useMemo(() => {
    // 50% chance to flip on Y axis, 25% on X axis, 25% on both X and Y
    const random = Math.random();
    if (random < 0.5) return 'rotateY';
    if (random < 0.75) return 'rotateX';
    return 'rotate3d';
  }, []);
  
  // Generate random rotation values for 3D effect
  const rotationValues = useMemo(() => {
    if (rotationDirection === 'rotateY') {
      return {
        front: 'rotateY(0deg)',
        back: 'rotateY(180deg)'
      };
    } else if (rotationDirection === 'rotateX') {
      return {
        front: 'rotateX(0deg)',
        back: 'rotateX(180deg)'
      };
    } else {
      // Random 3D rotation
      const x = Math.random() * 0.5 + 0.5; // 0.5-1.0
      const y = Math.random() * 0.5 + 0.5; // 0.5-1.0
      const z = Math.random() * 0.2; // 0-0.2
      return {
        front: 'rotate3d(0, 0, 0, 0deg)',
        back: `rotate3d(${x}, ${y}, ${z}, 180deg)`
      };
    }
  }, [rotationDirection]);

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
          className={`relative w-full h-full transition-all ${transitionDuration} ease-in-out`}
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isFlipped ? rotationValues.back : rotationValues.front
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
              transform: rotationDirection === 'rotateY' ? 'rotateY(180deg)' : 
                       rotationDirection === 'rotateX' ? 'rotateX(180deg)' : 
                       `rotate3d(${Math.random()}, ${Math.random()}, ${Math.random() * 0.1}, 180deg)`,
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