import React, { useState, useEffect, useCallback, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlippableGrid from "../components/FlippableGrid/FlippableGrid";
import Header from "../components/Header";
import ContactForm from "../components/ContactForm";
import Testimonial from "../components/Testimonial";
import SocialLinks from "../components/SocialLinks";
import HeroVideoDialog from "../components/HeroVideoDialog";
import IntroAnimation from "../components/IntroAnimation";
import { useRetro } from '../contexts/RetroContext';
import EmptyBox from "../components/EmptyBox";
import IndustryTerm from "../components/IndustryTerm";
import { useIndustry } from "../contexts/IndustryContext";
import { FlipProvider, useFlip } from "../contexts/FlipContext";
import FlippableGridCell from "../components/FlippableGridCell";
import { TermDefinition } from "../data/industryTerms";
import { useTheme, getBackgroundColor } from "../theme";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ContentDisplay from "../components/ContentDisplay";

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

  const contentItems = [
    {
      title: "Every brand has a story worth telling, and telling well.",
      content: "We bring together the brand designers and visual storytellers, the artists and the filmmakers, the illustrators, animators, writers, the editors...throw them into the creative sandbox, and make some magic happen.",
      highlightedText: "and telling well."
    },
    {
      title: "Better yet, invite everyone behind the veil.",
      content: "Better yet, invite everyone behind the veil. Because creativity isn't just for the dreamers and left-handed eccentrics.",
      highlightedText: "behind the veil."
    },
    {
      title: "Whoa! You're still here? Then you should know",
      content: "Whoa! You're still here? Then you should know, we think stories are also about making connections, not walling off the creative process and excluding the characters from the telling of their own story. We'd be honored to hear your story and help you to tell it to the world.",
      highlightedText: "Then you should know"
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
    }, 2800); // Adjusted to match our new smoother animation duration
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

  // Get theme colors
  const { isDark, visualMode } = useTheme();
  const backgroundColor = getBackgroundColor(isDark, visualMode);

  return (
    <>
      {showIntro && !animationRemoved && (
        <IntroAnimation onAnimationComplete={handleAnimationComplete} />
      )}
      
      <div 
        className="min-h-screen transition-colors duration-300 transition-opacity duration-1500"
        style={{ 
          display: showContent ? 'block' : 'none',
          backgroundColor: backgroundColor,
          opacity: isLoaded ? 1 : 0 
        }}
        role="main"
        aria-live="polite"
      >
        <div className="mx-auto p-4 md:p-6 max-w-screen-2xl">
          <Header initiallyHidden={!animationComplete} />

          <FlipProvider>
            <GridContent
              contentItems={contentItems}
              randomTerm={randomTerm}
              bgColor={backgroundColor}
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
const GridContent = ({ contentItems, randomTerm, bgColor, isRetro }) => {
  const { isFlipped, bordersVisible } = useFlip();
  const { visualMode, isDark } = useTheme();
  
  return (
    /* 3x3 Grid with consistent border treatment */
    <div className={`relative border-3 border-solid border-[#FF3B31] dark:border-[#FF7A6E] grid-border-animation`} data-borders-visible={bordersVisible}>
      {/* Change the grid breakpoints to use mobile layout until lg (1024px) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 perspective-1000">
        <div className="slider-flip-container col-span-1 lg:col-span-3 grid grid-cols-1 lg:grid-cols-3" data-flipped={isFlipped}>
          {/* Top-left 2x2 area for slider - Increased height for mobile view */}
          <div className="col-span-1 lg:col-span-2 row-span-2 border-r-0 lg:border-r-3 border-b-3 border-solid border-[#FF3B31] dark:border-[#FF7A6E] h-[400px] lg:h-[600px] relative">
            {/* Hidden flippable cells for the animation - Update heights to match */}
            <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 grid-rows-2 hidden-flip-cells opacity-0 pointer-events-none transition-opacity duration-300 z-10">
              <FlippableGridCell index={1} className="border-r-0 lg:border-r-3 border-b-3 border-solid border-[#FF3B31] dark:border-[#FF7A6E] h-[200px] lg:h-[300px]">
                <div></div>
              </FlippableGridCell>
              <FlippableGridCell index={2} className="border-b-3 border-solid border-[#FF3B31] dark:border-[#FF7A6E] h-[200px] lg:h-[300px]">
                <div></div>
              </FlippableGridCell>
              <FlippableGridCell index={3} className="border-r-0 lg:border-r-3 border-solid border-[#FF3B31] dark:border-[#FF7A6E] h-[200px] lg:h-[300px]">
                <div></div>
              </FlippableGridCell>
              <FlippableGridCell index={4} className="h-[200px] lg:h-[300px]">
                <div></div>
              </FlippableGridCell>
            </div>
            
            {/* Replace the custom slider with ContentDisplay component */}
            <div 
              className="w-full h-full flex items-center justify-center"
              style={{ 
                backgroundColor: visualMode === 'grayscale' 
                  ? (isDark ? '#222222' : '#F0F0F0') 
                  : (isDark ? '#16192E' : '#F5F5F5'),
                visibility: isFlipped ? 'hidden' : 'visible',
                position: 'relative',
                zIndex: isFlipped ? 0 : 10
              }}
            >
              <ContentDisplay
                items={contentItems}
                className="w-full h-full"
              />
            </div>
          </div>
          
          {/* Top-right cell */}
          <FlippableGridCell index={5} className="col-span-1 border-b-3 border-solid border-[#FF3B31] dark:border-[#FF7A6E] h-[300px] lg:h-[300px]">
            <Suspense fallback={
              <div className={visualMode === 'grayscale' ? 'animate-pulse bg-[#333333]/20 dark:bg-[#DDDDDD]/20 h-full w-full' : 'animate-pulse bg-[#FF3B31]/20 dark:bg-[#FF7A6E]/20 h-full w-full'}>
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
              <div className={`${bgColor} p-4 lg:p-8 h-full flex items-center`}>
                <IndustryTerm term={randomTerm} />
              </div>
            </div>
          </FlippableGridCell>
          
          {/* Bottom row */}
          <FlippableGridCell index={7} className="col-span-1 border-r-0 lg:border-r-3 border-solid border-[#FF3B31] dark:border-[#FF7A6E] h-[300px]">
            <ContactForm />
          </FlippableGridCell>
          
          {/* Update EmptyBox cell with responsive borders - only on mobile */}
          <FlippableGridCell index={8} className="col-span-1 border-r-0 lg:border-r-3 border-t-3 lg:border-t-0 border-b-3 lg:border-b-0 border-solid border-[#FF3B31] dark:border-[#FF7A6E] h-[300px]">
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
