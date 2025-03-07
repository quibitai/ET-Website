import React, { lazy, Suspense } from 'react';
import GridItem from './GridItem';
import { defaultGridLayout, GridComponentConfig, getWidthForPosition } from './gridConfig';

// Import components that will be placed in the grid
import IndustryTerm from '../IndustryTerm';
import ContactForm from '../ContactForm';
import EmptyBox from '../EmptyBox';
import Testimonial from '../Testimonial';
import { TermDefinition, getRandomTerm } from '../../data/industryTerms';

// Define types based on the component props
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
    
    // Render the appropriate component based on type
    switch (type) {
      case 'industry-term': {
        const termProps = props as IndustryTermProps;
        return <IndustryTerm term={termProps.term || getRandomTerm()} />;
      }
      case 'contact-form':
        return <ContactForm />;
      case 'video-section':
        return (
          <Suspense fallback={<div className="w-full h-full bg-gray-100 animate-pulse"></div>}>
            <VideoSection />
          </Suspense>
        );
      case 'testimonial':
        return <Testimonial {...props} />;
      case 'empty':
      default:
        return <EmptyBox />;
    }
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`} data-testid="grid-layout">
      {layout.map((config, index) => (
        <GridItem
          key={`grid-item-${index}`}
          position={config.position}
          className={config.className}
          style={config.style}
        >
          {renderComponent(config)}
        </GridItem>
      ))}
    </div>
  );
};

export default GridLayout; 