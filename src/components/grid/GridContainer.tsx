import React from 'react';

interface GridContainerProps {
  className?: string;
  children: React.ReactNode;
}

/**
 * GridContainer component - Creates the main 3x3 grid layout
 * This container doesn't change the visual appearance but provides structure
 */
const GridContainer: React.FC<GridContainerProps> = ({ className = '', children }) => {
  return (
    <div 
      className={`flex flex-col ${className}`}
      data-grid-container="true"
    >
      {children}
    </div>
  );
};

export default GridContainer; 