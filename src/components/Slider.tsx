import React, { useState, useEffect } from "react";

type SlideContent = {
  title: string;
  titleBold: string;
  description: string;
};

interface SliderProps {
  slides: SlideContent[];
}

// Define transition types
type TransitionType = 
  | "slide" 
  | "fade" 
  | "zoom" 
  | "flip" 
  | "rotate" 
  | "split" 
  | "blur" 
  | "bounce" 
  | "cube";

const Slider: React.FC<SliderProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);
  const [transitionType, setTransitionType] = useState<TransitionType>("slide");
  
  // Auto-rotate transitions every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const transitions: TransitionType[] = [
        "slide", "fade", "zoom", "flip", "rotate", 
        "split", "blur", "bounce", "cube"
      ];
      const currentIndex = transitions.indexOf(transitionType);
      const nextIndex = (currentIndex + 1) % transitions.length;
      setTransitionType(transitions[nextIndex]);
    }, 20000);
    
    return () => clearInterval(interval);
  }, [transitionType]);

  const handlePrevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSlideDirection("left");
    
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 300);
  };

  const handleNextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSlideDirection("right");
    
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 300);
  };

  // Helper function to render slide title with correct line breaks
  const renderSlideTitle = (title: string, titleBold: string) => {
    if (currentSlide === 0) {
      return (
        <>
          {title}<br />
          <span className="font-bold">{titleBold}</span>
        </>
      );
    } else if (currentSlide === 1) {
      return (
        <>
          {title}<span className="font-bold">{titleBold}</span>
        </>
      );
    } else {
      return (
        <>
          {title}<br />
          <span className="font-bold">{titleBold}</span>
        </>
      );
    }
  };

  // Get transition classes based on the current transition type
  const getTransitionClasses = () => {
    const baseClasses = "transition-all duration-300 absolute w-full";
    
    if (!isAnimating) {
      return `${baseClasses} translate-x-0 opacity-100 scale-100 rotate-0 blur-0 translate-y-0`;
    }
    
    switch (transitionType) {
      case "fade":
        return `${baseClasses} translate-x-0 ${isAnimating ? 'opacity-0' : 'opacity-100'} scale-100 rotate-0`;
      
      case "zoom":
        return `${baseClasses} translate-x-0 opacity-${isAnimating ? '0' : '100'} ${isAnimating ? 'scale-75' : 'scale-100'} rotate-0`;
      
      case "flip":
        return `${baseClasses} translate-x-0 opacity-${isAnimating ? '0' : '100'} scale-${isAnimating ? '90' : '100'} ${isAnimating ? 'perspective-[1000px] rotateY-90' : 'rotateY-0'} transform-style-3d`;
      
      case "rotate":
        return `${baseClasses} translate-x-0 opacity-${isAnimating ? '0' : '100'} scale-${isAnimating ? '90' : '100'} ${isAnimating ? 'rotate-12' : 'rotate-0'}`;
      
      case "split":
        return `${baseClasses} ${isAnimating ? (slideDirection === 'left' ? 'translate-x-1/2' : '-translate-x-1/2') : 'translate-x-0'} opacity-${isAnimating ? '0' : '100'} scale-100`;
      
      case "blur":
        return `${baseClasses} translate-x-0 opacity-${isAnimating ? '50' : '100'} scale-100 ${isAnimating ? 'blur-md' : 'blur-0'}`;
      
      case "bounce":
        return `${baseClasses} translate-x-0 ${isAnimating ? 'translate-y-6' : 'translate-y-0'} opacity-${isAnimating ? '0' : '100'} scale-${isAnimating ? '95' : '100'}`;
      
      case "cube":
        return `${baseClasses} origin-${slideDirection === 'left' ? 'right' : 'left'} translate-x-0 opacity-${isAnimating ? '90' : '100'} ${isAnimating ? `perspective-[1000px] rotate${slideDirection === 'left' ? 'Y' : 'Y'}-${slideDirection === 'left' ? '-' : ''}90` : 'rotateY-0'} transform-style-3d`;
      
      case "slide":
      default:
        return `${baseClasses} ${isAnimating ? (slideDirection === 'left' ? 'translate-x-10 opacity-0' : '-translate-x-10 opacity-0') : 'translate-x-0 opacity-100'} scale-100 rotate-0`;
    }
  };

  // Function to change transition type
  const changeTransition = (type: TransitionType) => {
    setTransitionType(type);
  };

  return (
    <div className="bg-[#F0EBE6] dark:bg-[#2A2D36] p-6 md:p-8 flex flex-col justify-between h-full">
      <div className="max-w-3xl w-full mx-auto flex flex-col justify-between h-full pt-20 md:pt-32 pb-8">
        {/* Fixed height container with absolute dimensions to maintain consistency */}
        <div className="flex-grow relative">
          <div className="h-[250px] md:h-[300px] perspective-[1000px]"> {/* Fixed height container with perspective for 3D effects */}
            <div className={getTransitionClasses()}>
              <h2 className="text-[#FF3B31] dark:text-[#FF7A6E] font-serif text-[36px] sm:text-[45px] md:text-[54px] mb-6 leading-tight text-left">
                {renderSlideTitle(slides[currentSlide].title, slides[currentSlide].titleBold)}
              </h2>
              <p className="text-[#FF3B31] dark:text-[#FF7A6E] font-mono text-base md:text-[20px] leading-relaxed mb-8 text-left">
                {slides[currentSlide].description}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-4 mt-auto">
          <div className="flex justify-center gap-4">
            <button 
              onClick={handlePrevSlide}
              className="text-[#FF3B31] dark:text-[#FF7A6E] hover:opacity-70 transition-opacity duration-300 focus:outline-none"
              disabled={isAnimating}
            >
              <svg width="56" height="56" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 7L10 14L17 21" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              onClick={handleNextSlide}
              className="text-[#FF3B31] dark:text-[#FF7A6E] hover:opacity-70 transition-opacity duration-300 focus:outline-none"
              disabled={isAnimating}
            >
              <svg width="56" height="56" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 7L18 14L11 21" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mt-2 max-w-md">
            <button 
              onClick={() => changeTransition("slide")}
              className={`px-2 py-1 text-xs rounded ${transitionType === 'slide' ? 'bg-[#FF3B31] dark:bg-[#FF7A6E] text-white' : 'text-[#FF3B31] dark:text-[#FF7A6E] border border-[#FF3B31] dark:border-[#FF7A6E]'}`}
            >
              Slide
            </button>
            <button 
              onClick={() => changeTransition("fade")}
              className={`px-2 py-1 text-xs rounded ${transitionType === 'fade' ? 'bg-[#FF3B31] dark:bg-[#FF7A6E] text-white' : 'text-[#FF3B31] dark:text-[#FF7A6E] border border-[#FF3B31] dark:border-[#FF7A6E]'}`}
            >
              Fade
            </button>
            <button 
              onClick={() => changeTransition("zoom")}
              className={`px-2 py-1 text-xs rounded ${transitionType === 'zoom' ? 'bg-[#FF3B31] dark:bg-[#FF7A6E] text-white' : 'text-[#FF3B31] dark:text-[#FF7A6E] border border-[#FF3B31] dark:border-[#FF7A6E]'}`}
            >
              Zoom
            </button>
            <button 
              onClick={() => changeTransition("flip")}
              className={`px-2 py-1 text-xs rounded ${transitionType === 'flip' ? 'bg-[#FF3B31] dark:bg-[#FF7A6E] text-white' : 'text-[#FF3B31] dark:text-[#FF7A6E] border border-[#FF3B31] dark:border-[#FF7A6E]'}`}
            >
              Flip
            </button>
            <button 
              onClick={() => changeTransition("rotate")}
              className={`px-2 py-1 text-xs rounded ${transitionType === 'rotate' ? 'bg-[#FF3B31] dark:bg-[#FF7A6E] text-white' : 'text-[#FF3B31] dark:text-[#FF7A6E] border border-[#FF3B31] dark:border-[#FF7A6E]'}`}
            >
              Rotate
            </button>
            <button 
              onClick={() => changeTransition("split")}
              className={`px-2 py-1 text-xs rounded ${transitionType === 'split' ? 'bg-[#FF3B31] dark:bg-[#FF7A6E] text-white' : 'text-[#FF3B31] dark:text-[#FF7A6E] border border-[#FF3B31] dark:border-[#FF7A6E]'}`}
            >
              Split
            </button>
            <button 
              onClick={() => changeTransition("blur")}
              className={`px-2 py-1 text-xs rounded ${transitionType === 'blur' ? 'bg-[#FF3B31] dark:bg-[#FF7A6E] text-white' : 'text-[#FF3B31] dark:text-[#FF7A6E] border border-[#FF3B31] dark:border-[#FF7A6E]'}`}
            >
              Blur
            </button>
            <button 
              onClick={() => changeTransition("bounce")}
              className={`px-2 py-1 text-xs rounded ${transitionType === 'bounce' ? 'bg-[#FF3B31] dark:bg-[#FF7A6E] text-white' : 'text-[#FF3B31] dark:text-[#FF7A6E] border border-[#FF3B31] dark:border-[#FF7A6E]'}`}
            >
              Bounce
            </button>
            <button 
              onClick={() => changeTransition("cube")}
              className={`px-2 py-1 text-xs rounded ${transitionType === 'cube' ? 'bg-[#FF3B31] dark:bg-[#FF7A6E] text-white' : 'text-[#FF3B31] dark:text-[#FF7A6E] border border-[#FF3B31] dark:border-[#FF7A6E]'}`}
            >
              Cube
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
