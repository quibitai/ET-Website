import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
  onAnimationComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onAnimationComplete }) => {
  const [animationStage, setAnimationStage] = useState<"initial" | "animating" | "complete">("initial");
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
    
    // Start combined zoom and fade animation
    setAnimationStage("animating");
    
    // Signal completion partway through the animation
    // This allows the main content to start fading in while the intro is still animating out
    setTimeout(() => {
      onAnimationComplete();
    }, 1500);
    
    // Keep the animation component visible for the duration of the animation
    await new Promise(resolve => setTimeout(resolve, 3000));
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

  return (
    <AnimatePresence mode="wait">
      {animationStage !== "complete" && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center z-50 bg-[#F5F5F5] dark:bg-[#16192E]"
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: animationStage === "animating" ? 0 : 1 
          }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 3,
            ease: "easeInOut",
            opacity: {
              delay: 1.5,  // Start fading the background after the zoom has progressed
              duration: 1.5
            }
          }}
          aria-live="polite"
          aria-atomic="true"
          role="status"
        >
          <motion.div
            ref={containerRef}
            className="relative"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ 
              scale: animationStage === "animating" ? 3.2 : 1,
              opacity: animationStage === "animating" ? 0 : 1
            }}
            transition={{
              duration: 3,
              ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for a smooth, natural motion
              scale: {
                duration: 3
              },
              opacity: {
                delay: 1.5, // Start fading after the zoom has progressed
                duration: 1.5
              }
            }}
          >
            <motion.h1 
              className="text-[#FF3B31] dark:text-[#FF7A6E] font-bold tracking-tighter"
              initial={{ fontSize: "2rem", opacity: 0 }}
              animate={{ 
                fontSize: "6rem", 
                opacity: animationStage === "initial" ? 0 : 
                         animationStage === "animating" ? [0, 1, 0] : 0
              }}
              transition={{
                duration: 3,
                opacity: {
                  times: [0, 0.2, 1],
                  duration: 3
                },
                fontSize: {
                  duration: 1.5
                }
              }}
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