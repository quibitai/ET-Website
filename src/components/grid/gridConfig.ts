import { GridPosition } from './GridItem';

/**
 * Grid configuration for the 3x3 layout
 * Maps grid positions to component configurations
 */

// Define valid component types that can be placed in grid positions
export type GridComponentType = 
  | 'slider'
  | 'video'
  | 'industryTerm'
  | 'contactForm'
  | 'work'
  | 'testimonial';

// Configuration for a component in the grid
export interface GridComponentConfig {
  type: GridComponentType;
  position: GridPosition | GridPosition[];
  props?: Record<string, any>; // Optional props for the component
  borders?: {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
  };
}

// Default grid layout configuration
export const defaultGridLayout: GridComponentConfig[] = [
  {
    type: 'slider',
    position: [1, 2, 4, 5],
    borders: {
      right: true,
      bottom: true
    }
  },
  {
    type: 'video',
    position: 3,
    borders: {
      bottom: true
    }
  },
  {
    type: 'industryTerm',
    position: 6,
    borders: {
      right: true,
      bottom: true
    }
  },
  {
    type: 'contactForm',
    position: 7,
    borders: {
      right: true,
      bottom: true
    }
  },
  {
    type: 'work',
    position: 8,
    borders: {
      right: true,
      bottom: true
    }
  },
  {
    type: 'testimonial',
    position: 9,
    borders: {
      right: true,
      bottom: true
    }
  }
];

// Helper to determine width based on position
export const getWidthForPosition = (position: GridPosition | GridPosition[]): 'full' | '1/3' | '2/3' => {
  if (Array.isArray(position)) {
    // Check if it spans 2/3 of a row (like positions 1,2)
    const isRowSpan2 = 
      (position.includes(1) && position.includes(2)) || 
      (position.includes(4) && position.includes(5)) || 
      (position.includes(7) && position.includes(8));
      
    if (isRowSpan2) return '2/3';
    
    // Calculate total width
    const uniqueColumns = new Set();
    position.forEach(p => {
      const col = ((p - 1) % 3) + 1;
      uniqueColumns.add(col);
    });
    
    return uniqueColumns.size >= 2 ? '2/3' : '1/3';
  }
  
  // Single position is 1/3 width by default
  return '1/3';
}; 