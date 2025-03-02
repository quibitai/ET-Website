import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
  onAnimationComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onAnimationComplete }) => {
  const [animationStage, setAnimationStage] = useState<"initial" | "zoom" | "explode" | "complete">("initial");
  const hasRunRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // For debugging
  useEffect(() => {
    console.log("IntroAnimation mounted");
    
    // Reset the animation stage when the component is mounted
    setAnimationStage("initial");
    
    // Clean up function
    return () => {
      console.log("IntroAnimation unmounting");
      // Reset the ref when component unmounts to allow animation to run again on next mount
      hasRunRef.current = false;
    };
  }, []);
  
  // For debugging animation stages
  useEffect(() => {
    console.log("Animation stage changed to:", animationStage);
  }, [animationStage]);
  
  useEffect(() => {
    // Prevent running the animation sequence more than once per component instance
    if (hasRunRef.current) {
      console.log("Animation sequence already ran for this instance, skipping");
      return;
    }
    
    // Start the animation sequence
    const sequence = async () => {
      console.log("Starting animation sequence");
      hasRunRef.current = true;
      
      // Wait for component to mount
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log("Setting zoom stage");
      
      // Start zoom animation
      setAnimationStage("zoom");
      
      // After zoom completes, start explosion animation
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Setting explode stage");
      setAnimationStage("explode");
      
      // After explosion starts, signal completion
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log("Calling onAnimationComplete");
      onAnimationComplete();
      
      // Keep the animation component visible until the main content is fully loaded
      await new Promise(resolve => setTimeout(resolve, 1800));
      console.log("Setting complete stage");
      setAnimationStage("complete");
    };
    
    sequence();
  }, [onAnimationComplete]);

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
        >
          {animationStage !== "explode" ? (
            <motion.div
              ref={containerRef}
              className="relative"
              initial={{ scale: 1 }}
              animate={{ 
                scale: animationStage === "zoom" ? [1, 1.5, 2.2, 2.5, 2.8] : 1,
              }}
              transition={{ 
                duration: 2.0,
                ease: [0.25, 0.1, 0.25, 1.0], // Improved easing for smoother zoom
                times: [0, 0.2, 0.5, 0.7, 1]
              }}
            >
              <motion.h1 
                className="text-[#FF3B31] dark:text-[#FF7A6E] font-bold tracking-tighter"
                initial={{ 
                  fontSize: "2rem",
                  opacity: animationStage === "initial" ? 0 : 1,
                }}
                animate={{ 
                  fontSize: animationStage === "zoom" ? "6rem" : "2rem",
                  opacity: 1,
                }}
                transition={{ 
                  duration: animationStage === "zoom" ? 2.0 : 1.5,
                  ease: [0.25, 0.1, 0.25, 1.0], // Improved easing for smoother zoom
                }}
              >
                echotango
              </motion.h1>
            </motion.div>
          ) : (
            <div className="relative">
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

export default IntroAnimation; 