import React, { lazy, Suspense } from 'react';
import GridItem from './GridItem';
import { defaultGridLayout, GridComponentConfig, getWidthForPosition } from './gridConfig';

// Import components that will be placed in the grid
import Slider from '../Slider';
import IndustryTerm from '../IndustryTerm';
import ContactForm from '../ContactForm';
import EmptyBox from '../EmptyBox';
import Testimonial from '../Testimonial';
import { TermDefinition, getRandomTerm } from '../../data/industryTerms';

// Define types based on the component props
type SliderProps = { slides: { title: string; titleBold: string; description: string; }[] };
type IndustryTermProps = { term: TermDefinition };

// Lazy load the VideoSection to maintain existing behavior
const VideoSection = lazy(() => import('../VideoSection'));

interface GridLayoutProps {
  layout?: GridComponentConfig[];
  className?: string;
}

/**
 * GridLayout component - Manages the overall 3x3 grid layout structure
 * Uses the configuration defined in gridConfig.ts 
 * Maintains exact same visual appearance as the current implementation
 */
const GridLayout: React.FC<GridLayoutProps> = ({
  layout = defaultGridLayout,
  className = '',
}) => {
  // Helper function to render a component based on its type
  const renderComponent = (config: GridComponentConfig) => {
    const { type, props = {}, position } = config;
    
    // Calculate width based on position
    const width = getWidthForPosition(position);
    
    // Generate border classes based on border config
    const borderClasses = [];
    if (config.borders) {
      if (config.borders.top) borderClasses.push('border-t');
      if (config.borders.right) borderClasses.push('border-r');
      if (config.borders.bottom) borderClasses.push('border-b');
      if (config.borders.left) borderClasses.push('border-l');
    }
    
    const borderColor = 'border-[#FF3B31] dark:border-[#FF7A6E]';
    
    // Render component based on its type
    switch (type) {
      case 'slider':
        return (
          <GridItem 
            position={position} 
            width={width}
            contentClassName={`${borderClasses.join(' ')} ${borderColor}`}
          >
            <Slider slides={props.slides || []} />
          </GridItem>
        );
      case 'video':
        return (
          <GridItem 
            position={position}
            width={width}
            contentClassName={`${borderClasses.join(' ')} ${borderColor}`}
          >
            <Suspense fallback={<div className="h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">Loading...</div>}>
              <VideoSection {...props} />
            </Suspense>
          </GridItem>
        );
      case 'industryTerm':
        return (
          <GridItem 
            position={position}
            width={width}
            contentClassName={`${borderClasses.join(' ')} ${borderColor}`}
          >
            <IndustryTerm term={props.term || getRandomTerm()} />
          </GridItem>
        );
      case 'contactForm':
        return (
          <GridItem 
            position={position}
            width={width}
            contentClassName={`${borderClasses.join(' ')} ${borderColor}`}
          >
            <ContactForm {...props} />
          </GridItem>
        );
      case 'work':
        return (
          <GridItem 
            position={position}
            width={width}
            contentClassName={`${borderClasses.join(' ')} ${borderColor}`}
          >
            <EmptyBox {...props} />
          </GridItem>
        );
      case 'testimonial':
        return (
          <GridItem 
            position={position}
            width={width}
            contentClassName={`${borderClasses.join(' ')} ${borderColor}`}
          >
            <Testimonial {...props} />
          </GridItem>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`w-full flex flex-wrap ${className}`} data-testid="grid-layout">
      {layout.map((componentConfig, index) => (
        <React.Fragment key={`grid-item-${index}`}>
          {renderComponent(componentConfig)}
        </React.Fragment>
      ))}
    </div>
  );
};

export default GridLayout; 