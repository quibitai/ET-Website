import React, { useState, useCallback, memo } from "react";

type SlideContent = {
  title: string;
  titleBold: string;
  description: string;
};

interface SliderProps {
  slides: SlideContent[];
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);
  
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

  // Helper function to render slide title with correct line breaks
  const renderSlideTitle = (title: string, titleBold: string) => {
    if (currentSlide === 0) {
      return (
        <>
          {title} <span className="font-bold bg-[#FF3B31] dark:bg-[#FF7A6E] text-white px-2 py-1 inline-block">{titleBold}</span>
        </>
      );
    } else if (currentSlide === 1) {
      return (
        <>
          {title}<span className="font-bold bg-[#FF3B31] dark:bg-[#FF7A6E] text-white px-2 py-1 inline-block">{titleBold}</span>
        </>
      );
    } else {
      return (
        <>
          {title}<br />
          <span className="font-bold bg-[#FF3B31] dark:bg-[#FF7A6E] text-white px-2 py-1 inline-block">{titleBold}</span>
        </>
      );
    }
  };

  // Get transition classes for blur effect
  const getTransitionClasses = () => {
    const baseClasses = "transition-all duration-300 absolute w-full";
    
    if (!isAnimating) {
      return `${baseClasses} translate-x-0 opacity-100 blur-0`;
    }
    
    return `${baseClasses} translate-x-0 opacity-${isAnimating ? '50' : '100'} ${isAnimating ? 'blur-md' : 'blur-0'}`;
  };

  return (
    <div className="bg-[#F0EBE6] dark:bg-[#2A2D36] p-6 md:p-8 flex flex-col justify-between h-full">
      <div className="max-w-3xl w-full mx-auto flex flex-col h-full pt-8 md:pt-20">
        {/* Content container */}
        <div className="flex-grow relative">
          <div className="min-h-[300px] md:h-[300px]">
            <div className={getTransitionClasses()}>
              <h2 className="text-[#FF3B31] dark:text-[#FF7A6E] font-serif text-[28px] xs:text-[32px] sm:text-[38px] md:text-[54px] mb-4 md:mb-6 leading-tight text-left">
                {renderSlideTitle(slides[currentSlide].title, slides[currentSlide].titleBold)}
              </h2>
              <p className="text-[#FF3B31] dark:text-[#FF7A6E] font-mono text-sm xs:text-base md:text-[20px] leading-relaxed mb-6 md:mb-8 text-left max-w-[90%]">
                {slides[currentSlide].description}
              </p>
            </div>
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-center gap-4 mt-4 md:mt-12">
          <button 
            onClick={handlePrevSlide}
            className="text-[#FF3B31] dark:text-[#FF7A6E] hover:opacity-70 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF3B31] dark:focus:ring-[#FF7A6E] rounded-md p-2"
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
            className="text-[#FF3B31] dark:text-[#FF7A6E] hover:opacity-70 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF3B31] dark:focus:ring-[#FF7A6E] rounded-md p-2"
            disabled={isAnimating}
            aria-label="Next slide"
            type="button"
          >
            <svg width="48" height="48" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform transition-transform duration-300 hover:scale-110">
              <path d="M11 7L18 14L11 21" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Slider);
