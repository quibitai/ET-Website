import { useState, useEffect, lazy, Suspense } from "react";
import Header from "../components/Header";
import Slider from "../components/Slider";
import ContactForm from "../components/ContactForm";
import Testimonial from "../components/Testimonial";
import SocialLinks from "../components/SocialLinks";
import IntroAnimation from "../components/IntroAnimation";
import RetroPlayer from "../components/RetroPlayer";
import { useRetro } from '../contexts/RetroContext';
import EmptyBox from "../components/EmptyBox";
import IndustryTerm from "../components/IndustryTerm";
import { useIndustry } from "../contexts/IndustryContext";
import { FlipProvider, useFlip } from "../contexts/FlipContext";
import FlippableGridCell from "../components/FlippableGridCell";
import { TermDefinition } from "../data/industryTerms";

// Lazy load the VideoSection component as it's heavier with images
const VideoSection = lazy(() => import("../components/VideoSection"));

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showIntro, setShowIntro] = useState(true); // Always show intro on refresh
  const [showContent, setShowContent] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [animationRemoved, setAnimationRemoved] = useState(false);
  const { isRetro } = useRetro();
  const { currentTerm, getRandomTerm } = useIndustry();
  const [randomTerm, setRandomTerm] = useState(currentTerm);

  const slides = [
    {
      title: "Every brand has a story worth telling,",
      titleBold: "and telling well.",
      description: "We bring together the brand designers and visual storytellers, the artists and the filmmakers, the illustrators, animators, writers, the editors...throw them into the creative sandbox, and make some magic happen.",
      titleBoldColor: "#F5F5F5" // Match the background color for "and telling well."
    },
    {
      title: "Better yet, invite everyone ",
      titleBold: "behind the veil.",
      description: "Better yet, invite everyone behind the veil. Because creativity isn't just for the dreamers and left-handed eccentrics."
    },
    {
      title: "Whoa! You're still here?",
      titleBold: "Then you should know",
      description: "Whoa! You're still here? Then you should know, we think stories are also about making connections, not walling off the creative process and excluding the characters from the telling of their own story. We'd be honored to hear your story and help you to tell it to the world."
    }
  ];

  // Handle intro animation completion
  const handleAnimationComplete = () => {
    // Mark animation as complete
    setAnimationComplete(true);
    
    // Show the content but keep the intro visible
    // The intro will fade itself out
    setShowContent(true);
    
    // After a delay, remove the intro component
    setTimeout(() => {
      setShowIntro(false);
      setAnimationRemoved(true);
    }, 3600);
  };

  // Set loaded state after content appears
  useEffect(() => {
    if (showContent) {
      // Delay the opacity transition to ensure smooth handoff from animation
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [showContent]);

  // Check for reduced motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Skip animation for users who prefer reduced motion
      setShowIntro(false);
      setShowContent(true);
      setIsLoaded(true);
      setAnimationComplete(true);
      setAnimationRemoved(true);
    }
  }, []);

  // Get a new term when the component mounts
  useEffect(() => {
    setRandomTerm(getRandomTerm());
  }, []);

  // Get background color based on dark/light mode
  const bgColor = "bg-[#F5F5F5] dark:bg-[#16192E]";

  return (
    <>
      {showIntro && !animationRemoved && (
        <IntroAnimation onAnimationComplete={handleAnimationComplete} />
      )}
      
      <div 
        className={`min-h-screen transition-colors duration-300 ${bgColor} transition-opacity duration-1500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ display: showContent ? 'block' : 'none' }}
        role="main"
        aria-live="polite"
      >
        <div className="mx-auto p-4 md:p-6 max-w-screen-2xl">
          <Header initiallyHidden={!animationComplete} />
          {isRetro && <RetroPlayer />}

          <FlipProvider>
            <GridContent
              slides={slides}
              randomTerm={randomTerm}
              bgColor={bgColor}
              isRetro={isRetro}
            />
          </FlipProvider>
          
          {/* Social links */}
          <div className="flex justify-end mt-4">
            <div className="w-full md:w-1/3 flex justify-end">
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// GridContent component to handle the grid layout
const GridContent = ({ slides, randomTerm, bgColor, isRetro }) => {
  const { isFlipped, bordersVisible } = useFlip();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState("right");
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Handle slide navigation
  const goToNextSlide = () => {
    if (isAnimating) return;
    setSlideDirection("right");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsAnimating(false);
    }, 500);
  };
  
  const goToPrevSlide = () => {
    if (isAnimating) return;
    setSlideDirection("left");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsAnimating(false);
    }, 500);
  };
  
  // Get transition classes for the description
  const getDescriptionTransitionClasses = () => {
    const baseClasses = "transition-transform duration-500 ease-in-out";
    
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
    /* 3x3 Grid with consistent border treatment */
    <div className={`relative border-3 border-solid border-[#FF3B31] dark:border-[#FF7A6E] grid-border-animation`} data-borders-visible={bordersVisible}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 perspective-1000">
        <div className="slider-flip-container col-span-1 sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" data-flipped={isFlipped}>
          {/* Top-left 2x2 area for slider */}
          <div className="col-span-1 sm:col-span-2 row-span-2 border-r-0 sm:border-r-3 border-b-3 border-solid border-[#FF3B31] dark:border-[#FF7A6E] h-[300px] sm:h-[450px] lg:h-[600px] relative">
            {/* Hidden flippable cells for the animation */}
            <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-2 grid-rows-2 hidden-flip-cells opacity-0 pointer-events-none transition-opacity duration-300 z-10">
              <FlippableGridCell index={1} className="border-r-0 sm:border-r-3 border-b-3 border-solid border-[#FF3B31] dark:border-[#FF7A6E] h-[150px] sm:h-[225px] lg:h-[300px]">
                <div></div>
              </FlippableGridCell>
              <FlippableGridCell index={2} className="border-b-3 border-solid border-[#FF3B31] dark:border-[#FF7A6E] h-[150px] sm:h-[225px] lg:h-[300px]">
                <div></div>
              </FlippableGridCell>
              <FlippableGridCell index={3} className="border-r-0 sm:border-r-3 border-solid border-[#FF3B31] dark:border-[#FF7A6E] h-[150px] sm:h-[225px] lg:h-[300px]">
                <div></div>
              </FlippableGridCell>
              <FlippableGridCell index={4} className="h-[150px] sm:h-[225px] lg:h-[300px]">
                <div></div>
              </FlippableGridCell>
            </div>
            
            {/* Visible unified slider */}
            <div className="unified-slider h-full w-full overflow-hidden transition-opacity duration-300 flex items-center justify-center">
              <div className="h-full w-full flex flex-col p-4 sm:p-8 md:p-12 lg:p-16 relative bg-[#F5F5F5] dark:bg-[#16192E]">
                <div className="flex flex-col justify-center h-full mx-auto max-w-[95%] sm:max-w-[90%] md:max-w-[80%] pt-4 sm:pt-8 md:pt-16">
                  {/* Fixed title that doesn't change - exact match with screenshot */}
                  <h2 className="text-[#FF3B31] dark:text-[#FF7A6E] font-serif text-[28px] xs:text-[32px] sm:text-[36px] md:text-[44px] lg:text-[48px] leading-tight font-normal">
                    <span className="inline sm:hidden">Every brand has a story worth telling,</span>
                    <span className="hidden sm:inline">Every brand has a story worth
                    <br />telling,</span> <span className="font-medium bg-[#FF3B31] dark:bg-[#FF7A6E] text-[#F5F5F5] px-2 sm:px-4 py-1 inline-block sm:inline my-1 sm:my-0">and telling well.</span>
                  </h2>
                  
                  {/* Custom slider for descriptions only with animation */}
                  <div className="relative w-full flex-grow overflow-hidden mt-4 sm:mt-6 md:mt-10">
                    <div className={getDescriptionTransitionClasses()}>
                      <p className="text-[#FF3B31] dark:text-[#FF7A6E] font-mono text-sm sm:text-base md:text-[18px] leading-relaxed">
                        {slides[currentSlide].description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation buttons - slightly smaller than before */}
                <div className="absolute bottom-2 sm:bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 sm:gap-8">
                  <button 
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center text-[#FF3B31] dark:text-[#FF7A6E] transition-colors" 
                    onClick={goToPrevSlide}
                    aria-label="Previous slide"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10">
                      <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button 
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center text-[#FF3B31] dark:text-[#FF7A6E] transition-colors" 
                    onClick={goToNextSlide}
                    aria-label="Next slide"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10">
                      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Top-right cell */}
          <FlippableGridCell index={5} className="col-span-1 border-b-3 border-solid border-[#FF3B31] dark:border-[#FF7A6E] h-[300px] sm:h-[450px] lg:h-[300px]">
            <Suspense fallback={
              <div className="h-full w-full flex items-center justify-center">
                <div className="animate-pulse bg-[#FF3B31]/20 dark:bg-[#FF7A6E]/20 h-full w-full"></div>
              </div>
            }>
              <div className="h-full w-full">
                <VideoSection />
              </div>
            </Suspense>
          </FlippableGridCell>
          
          {/* Third row cell (second column already covered by slider) */}
          <FlippableGridCell index={6} className="col-span-1 border-b-3 border-solid border-[#FF3B31] dark:border-[#FF7A6E] h-[300px]">
            <div className="h-full">
              <div className={`${bgColor} p-4 sm:p-6 md:p-8 h-full flex items-center`}>
                <IndustryTerm term={randomTerm} />
              </div>
            </div>
          </FlippableGridCell>
          
          {/* Bottom row */}
          <FlippableGridCell index={7} className="col-span-1 border-r-0 sm:border-r-3 border-solid border-[#FF3B31] dark:border-[#FF7A6E] h-[300px]">
            <ContactForm />
            {isRetro && (
              <div className="visitor-counter">
                <img 
                  src="data:image/gif;base64,R0lGODlhEAAQALMAAAAAAP///+7u7t3d3bu7u6qqqpmZmYiIiHd3d2ZmZlVVVURERDMzMyIiIhEREQAAACH+AS4ALAAAAAAQABAAAARFEMj3gL0P4pzUMIqrcB0XBuIYjgNWnIWVJMqVkgGYQEHQhLwwfBaYBYP5gUAQ1GWBXhZIyfgVQTEpKFSi2CwWg+VqtQgAOw==" 
                  alt="Under Construction"
                  className="construction"
                />
                <div>
                  Visitors: {localStorage.getItem('visitor-count')?.padStart(6, '0') || '000000'}
                </div>
              </div>
            )}
          </FlippableGridCell>
          
          <FlippableGridCell index={8} className="col-span-1 border-r-0 sm:border-r-3 border-solid border-[#FF3B31] dark:border-[#FF7A6E] h-[300px]">
            <EmptyBox />
          </FlippableGridCell>
          
          <FlippableGridCell index={9} className="col-span-1 h-[300px]">
            <div className="h-full">
              <Testimonial />
            </div>
          </FlippableGridCell>
        </div>
      </div>
    </div>
  );
};

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
  </svg>
);

export default Index;
