import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
  onAnimationComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onAnimationComplete }) => {
  const [animationStage, setAnimationStage] = useState<"initial" | "zoom" | "shake" | "explode" | "complete">("initial");
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
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Start zoom animation
    setAnimationStage("zoom");
    
    // After zoom completes, start shake animation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAnimationStage("shake");
    
    // After shake animation, start explosion
    await new Promise(resolve => setTimeout(resolve, 800));
    setAnimationStage("explode");
    
    // After explosion starts, signal completion
    await new Promise(resolve => setTimeout(resolve, 500));
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

  // Define the letters of "echotango"
  const letters = "echotango".split("");
  
  // Generate random directions for each letter with more extreme values
  // Using a ref to ensure consistent values between renders
  const letterDirectionsRef = useRef(letters.map(() => ({
    x: Math.random() * 3000 - 1500,
    y: Math.random() * 3000 - 1500,
    rotate: Math.random() * 1080 - 540,
    scale: Math.random() * 1.5 + 0.5
  })));

  // Get container animation based on current stage
  const getContainerAnimation = () => {
    if (animationStage === "zoom") {
      return { 
        scale: [1, 1.5, 2.2, 2.5, 2.8] 
      };
    } else if (animationStage === "shake") {
      return {
        scale: 2.8,
        x: [0, -10, 12, -15, 15, -12, 10, -8, 8, -5, 5, 0],
        y: [0, 5, -6, 8, -8, 6, -4, 4, -2, 2, 0],
        rotate: [0, -2, 3, -3, 3, -2, 2, -1, 1, 0]
      };
    }
    return { scale: 2.8 };
  };

  // Get transition for the container based on animation stage
  const getContainerTransition = () => {
    if (animationStage === "zoom") {
      return {
        duration: 2.0,
        ease: [0.25, 0.1, 0.25, 1.0],
        times: [0, 0.2, 0.5, 0.7, 1]
      };
    } else if (animationStage === "shake") {
      return {
        duration: 0.8,
        ease: "easeInOut",
        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
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
    } else {
      return {
        fontSize: "6rem", // Keep font size consistent after zoom
        opacity: 1
      };
    }
  };

  // Get text transition properties based on current stage
  const getTextTransition = () => {
    if (animationStage === "zoom") {
      return {
        duration: 2.0,
        ease: [0.25, 0.1, 0.25, 1.0]
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
          className="fixed inset-0 flex items-center justify-center z-50 bg-[#F0EBE6] dark:bg-[#2A2D36]"
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: animationStage === "explode" ? 0 : 1 
          }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: animationStage === "explode" ? 2.0 : 0.5,
            ease: "easeInOut",
            opacity: { delay: 1.2 }
          }}
          aria-live="polite"
          aria-atomic="true"
          role="status"
        >
          {animationStage !== "explode" ? (
            <motion.div
              ref={containerRef}
              className="relative"
              initial={{ scale: 1 }}
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
          ) : (
            <div className="relative" aria-label="Echo Tango logo exploding animation">
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  className="absolute text-[#FF3B31] dark:text-[#FF7A6E] font-bold text-6xl tracking-tighter"
                  style={{ 
                    originX: 0.5,
                    originY: 0.5,
                    display: 'inline-block',
                    left: `${index * 40}px`,
                    top: 0
                  }}
                  initial={{ 
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: 2.8
                  }}
                  animate={{ 
                    opacity: 0,
                    x: letterDirectionsRef.current[index].x,
                    y: letterDirectionsRef.current[index].y,
                    rotate: letterDirectionsRef.current[index].rotate,
                    scale: letterDirectionsRef.current[index].scale
                  }}
                  transition={{ 
                    duration: 2.5, // Increased for smoother animation
                    ease: [0.16, 1, 0.3, 1], // Improved easing for smoother explosion
                    delay: index * 0.02 // Slightly reduced for more simultaneous explosion
                  }}
                  aria-hidden="true" // Hide from screen readers as it's decorative
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(IntroAnimation); 