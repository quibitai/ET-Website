import React from 'react';
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
  const { isFlipped } = useFlip();
  
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
          w-full h-full transition-all duration-700 
          ${isFlipped ? 'rotate-y-180 opacity-0 pointer-events-none' : 'rotate-y-0 opacity-100'}
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
          absolute inset-0 w-full h-full transition-all duration-700 
          ${isFlipped ? 'rotate-y-0 opacity-100' : 'rotate-y-180 opacity-0 pointer-events-none'}
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