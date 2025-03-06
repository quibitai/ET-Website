import React, { useState, useCallback, memo, useEffect } from "react";

type SlideContent = {
  title: string;
  titleBold: string;
  description: string;
  titleBoldColor?: string; // Optional color for the bold title
};

interface SliderProps {
  slides: SlideContent[];
  hideControls?: boolean;
  initialSlide?: number;
}

const Slider: React.FC<SliderProps> = ({ slides, hideControls = false, initialSlide = 0 }) => {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);
  
  useEffect(() => {
    setCurrentSlide(initialSlide);
  }, [initialSlide]);
  
  const handlePrevSlide = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSlideDirection("left");
    
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 300);
  }, [isAnimating, slides.length]);

  const handleNextSlide = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSlideDirection("right");
    
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 300);
  }, [isAnimating, slides.length]);

  // Renders the title with optional color for the bold part
  const renderTitle = () => {
    const slide = slides[currentSlide];
    const titleBoldColor = slide.titleBoldColor || undefined;
    
    return (
      <>
        {slide.title} <span 
          className="font-bold bg-brand dark:bg-brand-light text-white px-2 py-1 inline-block"
          style={titleBoldColor ? { color: titleBoldColor } : {}}
        >
          {slide.titleBold}
        </span>
      </>
    );
  };

  // Get transition classes for slide effect
  const getDescriptionTransitionClasses = () => {
    const baseClasses = "transition-all duration-300 absolute w-full";
    
    if (!isAnimating) {
      return `${baseClasses} transform translate-x-0`;
    }
    
    if (slideDirection === "right") {
      return `${baseClasses} transform -translate-x-full`;
    } else {
      return `${baseClasses} transform translate-x-full`;
    }
  };

  return (
    <div className="bg-[#F0EBE6] dark:bg-[#16192E] p-6 md:p-8 h-full w-full">
      <div className="w-full mx-auto h-full flex flex-col relative">
        {/* Title with bold part */}
        <h2 className="text-brand dark:text-brand-light font-serif text-[28px] xs:text-[32px] sm:text-[38px] md:text-[42px] mb-4 leading-tight text-left">
          {renderTitle()}
        </h2>
        
        {/* Dynamic description with sliding effect */}
        <div className="flex-grow relative overflow-hidden">
          <div className="absolute inset-0">
            <div className={getDescriptionTransitionClasses()}>
              <p className="text-brand dark:text-brand-light font-mono text-sm xs:text-base md:text-[16px] leading-relaxed mb-4 text-left max-w-[90%]">
                {slides[currentSlide].description}
              </p>
            </div>
          </div>
        </div>
        
        {/* Navigation buttons - conditionally rendered */}
        {!hideControls && (
          <div className="flex justify-center gap-4 py-4">
            <button 
              onClick={handlePrevSlide}
              className="text-brand dark:text-brand-light hover:opacity-70 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-brand dark:focus:ring-brand-light rounded-md p-2"
              disabled={isAnimating}
              aria-label="Previous slide"
              type="button"
            >
              <svg width="48" height="48" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform transition-transform duration-300 hover:scale-110">
                <path d="M17 7L10 14L17 21" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              onClick={handleNextSlide}
              className="text-brand dark:text-brand-light hover:opacity-70 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-brand dark:focus:ring-brand-light rounded-md p-2"
              disabled={isAnimating}
              aria-label="Next slide"
              type="button"
            >
              <svg width="48" height="48" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform transition-transform duration-300 hover:scale-110">
                <path d="M11 7L18 14L11 21" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Slider);
