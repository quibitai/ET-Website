import React, { useState, useEffect } from "react";
import { TermDefinition, getRandomTerm } from "../data/industryTerms";
import { RefreshCw } from "lucide-react";

interface IndustryTermProps {
  term: TermDefinition;
}

const IndustryTerm: React.FC<IndustryTermProps> = ({ term: initialTerm }) => {
  const [term, setTerm] = useState(initialTerm);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayTerm, setDisplayTerm] = useState(initialTerm.term);
  const [displayDefinition, setDisplayDefinition] = useState(initialTerm.definition);
  
  // Characters to use for scrambling effect
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  
  // Function to scramble text with a more randomized reveal pattern
  const scrambleText = (text: string, progress: number): string => {
    // Create an array of indices in random order for revealing characters
    const indices = Array.from({ length: text.length }, (_, i) => i);
    // Fisher-Yates shuffle to randomize the order of character reveals
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    
    // Calculate how many characters to reveal based on progress
    const revealCount = Math.floor(text.length * progress);
    
    // Create a set of indices to reveal for quick lookups
    const revealIndices = new Set(indices.slice(0, revealCount));
    
    return text
      .split("")
      .map((char, index) => {
        // Always preserve spaces, punctuation, and line breaks
        if (char === " " || char === "." || char === "," || char === "!" || char === "?" || char === "-") 
          return char;
        
        // If we've reached the reveal threshold or this index should be revealed, show real char
        if (progress >= 1 || revealIndices.has(index)) {
          return char;
        } else {
          // Otherwise show a random character
          return chars.charAt(Math.floor(Math.random() * chars.length));
        }
      })
      .join("");
  };
  
  // Handle animation when term changes
  useEffect(() => {
    if (!isAnimating) return;
    
    let startTime: number;
    const duration = 1000; // 1 second animation
    let frame = 0;
    
    const animateText = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Only update the scrambled text every few frames for performance
      if (frame % 2 === 0 || progress >= 1) {
        // Update the scrambled text for both term and definition
        setDisplayTerm(scrambleText(term.term, progress));
        setDisplayDefinition(scrambleText(term.definition, progress));
      }
      
      frame++;
      
      // Continue animation until complete
      if (progress < 1) {
        requestAnimationFrame(animateText);
      } else {
        setIsAnimating(false);
        // Set final text without scrambling
        setDisplayTerm(term.term);
        setDisplayDefinition(term.definition);
      }
    };
    
    requestAnimationFrame(animateText);
  }, [term, isAnimating]);
  
  // Function to get a new random term
  const handleGetNewTerm = () => {
    setIsAnimating(true);
    const newTerm = getRandomTerm();
    
    // Start with fully scrambled text for a more dramatic effect
    setDisplayTerm(scrambleText(newTerm.term, 0));
    setDisplayDefinition(scrambleText(newTerm.definition, 0));
    
    setTerm(newTerm);
  };
  
  return (
    <div className="text-[#FF3B31] dark:text-[#FFEB94] text-left relative">
      <div className="flex justify-between items-start mb-2">
        <div className="font-bold text-lg">{displayTerm}</div>
        <button 
          onClick={handleGetNewTerm}
          className="p-2 text-[#FF3B31] dark:text-[#FFEB94] hover:text-black dark:hover:text-[#FF7A6E] transition-colors duration-300 focus:outline-none"
          aria-label="Get new random term"
          disabled={isAnimating}
        >
          <RefreshCw size={16} className={`${isAnimating ? 'animate-spin' : ''}`} />
        </button>
      </div>
      <div className="text-sm text-[#FF3B31]/80 dark:text-[#FFEB94]/80 whitespace-pre-line">{displayDefinition}</div>
    </div>
  );
};

export default IndustryTerm;
