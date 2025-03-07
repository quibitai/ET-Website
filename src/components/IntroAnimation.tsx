import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
  onAnimationComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onAnimationComplete }) => {
  const [animationStage, setAnimationStage] = useState<"initial" | "zoom" | "fadeOut" | "complete">("initial");
  const hasRunRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Reset the animation stage when the component is mounted
  useEffect(() => {
    setAnimationStage("initial");
    
    // Reset the ref when component unmounts to allow animation to run again on next mount
    return () => {
      hasRunRef.current = false;
    };
  }, []);
  
  // Animation sequence with useCallback to prevent unnecessary recreations
  const runAnimationSequence = useCallback(async () => {
    // Prevent running the animation sequence more than once per component instance
    if (hasRunRef.current) return;
    
    hasRunRef.current = true;
    
    // Wait for component to mount
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Start zoom animation
    setAnimationStage("zoom");
    
    // After zoom completes, start fade out animation
    await new Promise(resolve => setTimeout(resolve, 2200));
    setAnimationStage("fadeOut");
    
    // Signal completion as fade out starts
    onAnimationComplete();
    
    // Keep the animation component visible until the main content is fully loaded
    await new Promise(resolve => setTimeout(resolve, 1800));
    setAnimationStage("complete");
  }, [onAnimationComplete]);
  
  // Start animation sequence on mount
  useEffect(() => {
    runAnimationSequence();
    
    // Add support for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      // Skip directly to completion for users who prefer reduced motion
      setAnimationStage("complete");
      onAnimationComplete();
    }
  }, [runAnimationSequence, onAnimationComplete]);

  // Get container animation based on current stage
  const getContainerAnimation = () => {
    if (animationStage === "zoom") {
      return { 
        scale: 2.8 
      };
    } else if (animationStage === "fadeOut") {
      return {
        scale: 3.2,
        opacity: 0
      };
    }
    return { scale: 1 };
  };

  // Get transition for the container based on animation stage
  const getContainerTransition = () => {
    if (animationStage === "zoom") {
      return {
        duration: 2.2,
        ease: "easeOut"
      };
    } else if (animationStage === "fadeOut") {
      return {
        duration: 1.8,
        ease: "easeInOut"
      };
    }
    return { duration: 0.5 };
  };

  // Get text animation properties based on current stage
  const getTextAnimation = () => {
    // Always maintain the same font size after initial zoom
    if (animationStage === "initial") {
      return {
        fontSize: "2rem",
        opacity: 0
      };
    } else if (animationStage === "zoom") {
      return {
        fontSize: "6rem",
        opacity: 1
      };
    } else if (animationStage === "fadeOut") {
      return {
        fontSize: "6rem",
        opacity: 0
      };
    } else {
      return {
        fontSize: "6rem",
        opacity: 0
      };
    }
  };

  // Get text transition properties based on current stage
  const getTextTransition = () => {
    if (animationStage === "zoom") {
      return {
        duration: 2.2,
        ease: "easeOut"
      };
    } else if (animationStage === "fadeOut") {
      return {
        duration: 1.8,
        ease: "easeInOut"
      };
    }
    return {
      duration: 0.5,
      ease: "easeInOut"
    };
  };

  return (
    <AnimatePresence mode="wait">
      {animationStage !== "complete" && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center z-50 bg-[#F5F5F5] dark:bg-[#16192E]"
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: animationStage === "fadeOut" ? 0 : 1 
          }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: animationStage === "fadeOut" ? 1.8 : 0.5,
            ease: "easeInOut"
          }}
          aria-live="polite"
          aria-atomic="true"
          role="status"
        >
          <motion.div
            ref={containerRef}
            className="relative"
            initial={{ scale: 1, opacity: 1 }}
            animate={getContainerAnimation()}
            transition={getContainerTransition()}
          >
            <motion.h1 
              className="text-[#FF3B31] dark:text-[#FF7A6E] font-bold tracking-tighter"
              initial={{ fontSize: "2rem", opacity: 0 }}
              animate={getTextAnimation()}
              transition={getTextTransition()}
              aria-label="Echo Tango logo animation"
            >
              echotango
            </motion.h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(IntroAnimation); 