import React from 'react';

// Grid position 1-9, representing positions in a 3x3 grid
export type GridPosition = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface GridItemProps {
  position: GridPosition | GridPosition[]; // Single position or array of positions for spanning
  width?: 'full' | '1/3' | '2/3'; // Fractions of total width
  height?: string; // CSS height value
  className?: string;
  contentClassName?: string; // Class for the inner content div
  borderColor?: string; // Optional override for border color
  children: React.ReactNode;
}

/**
 * GridItem component - Represents a cell or span of cells in the 3x3 grid
 * Maintains exact visual appearance while adding position metadata
 */
const GridItem: React.FC<GridItemProps> = ({
  position,
  width = 'full',
  height = 'auto',
  className = '',
  contentClassName = '',
  borderColor = 'border-[#FF3B31] dark:border-[#FF7A6E]',
  children
}) => {
  // Convert position to string for data attribute
  const positionStr = Array.isArray(position) 
    ? position.join(',') 
    : position.toString();

  // Determine width CSS class based on prop
  const widthClass = {
    'full': 'w-full',
    '1/3': 'w-full md:w-1/3',
    '2/3': 'w-full md:w-2/3'
  }[width];

  return (
    <div 
      className={`${widthClass} ${className}`}
      style={{ height }}
      data-grid-position={positionStr}
    >
      <div className={`h-full ${borderColor} ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default GridItem; 