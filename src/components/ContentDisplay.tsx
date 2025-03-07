import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useTheme } from '../theme';
import '../styles/content-display.css';

interface ContentItem {
  content: string;
}

interface ContentDisplayProps {
  items: ContentItem[];
  initialIndex?: number;
  className?: string;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({
  items,
  initialIndex = 0,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const { isDark, visualMode } = useTheme();
  
  // Check for mobile view on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const goToNext = useCallback(() => {
    if (isAnimating) return;
    
    setSlideDirection('next');
    setAnimationClass('slide-next');
    setIsAnimating(true);
    
    // Apply animation classes and update state after animation
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      setAnimationClass('slide-in-right');
      
      // Reset animation state after the slide-in completes
      setTimeout(() => {
        setAnimationClass('');
        setIsAnimating(false);
      }, 500);
    }, 500);
  }, [items.length, isAnimating]);
  
  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    
    setSlideDirection('prev');
    setAnimationClass('slide-prev');
    setIsAnimating(true);
    
    // Apply animation classes and update state after animation
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
      setAnimationClass('slide-in-left');
      
      // Reset animation state after the slide-in completes
      setTimeout(() => {
        setAnimationClass('');
        setIsAnimating(false);
      }, 500);
    }, 500);
  }, [items.length, isAnimating]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);
  
  if (!items || items.length === 0) {
    return null;
  }
  
  const currentItem = items[currentIndex];
  
  // Static title, independent of content slides
  const renderStaticTitle = () => {
    return (
      <h2 className="content-display-title">
        <span>Every brand has a story worth telling,</span>{" "}
        <span className="content-display-highlight">and telling well.</span>
      </h2>
    );
  };
  
  return (
    <div className={`content-display ${className}`}>
      <div className="content-display-inner">
        {/* Static title in a container with fixed height */}
        <div className="content-display-title-container">
          {renderStaticTitle()}
        </div>
        
        {/* Content wrapper with sliding animation */}
        <div 
          ref={contentWrapperRef}
          className={`content-display-content-wrapper ${animationClass}`}
        >
          <p className="content-display-content">{currentItem.content}</p>
        </div>
      </div>
      
      {/* Bottom navigation arrows container */}
      <div className="content-display-nav">
        {/* Previous button */}
        <button
          className="content-display-arrow"
          onClick={goToPrev}
          aria-label="Previous content"
          disabled={isAnimating}
          type="button"
        >
          ‹
        </button>
        
        {/* Next button */}
        <button
          className="content-display-arrow"
          onClick={goToNext}
          aria-label="Next content"
          disabled={isAnimating}
          type="button"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default ContentDisplay; 