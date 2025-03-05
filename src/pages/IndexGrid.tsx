import React, { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import SocialLinks from "../components/SocialLinks";
import IntroAnimation from "../components/IntroAnimation";
import GridLayout from "../components/grid/GridLayout";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { getRandomTerm } from "../data/industryTerms";
import { defaultGridLayout } from "../components/grid/gridConfig";

const IndexGrid: React.FC = () => {
  const [skipIntro, setSkipIntro] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Generate slides for the slider
  const slides = [
    {
      title: "WE DON'T JUST ",
      titleBold: "CREATE CONTENT,",
      description: "WE TURN MOMENTS INTO LASTING IMPRESSIONS."
    },
    {
      title: "WE CRAFT ",
      titleBold: "POWERFUL STORIES",
      description: "THAT FORGE GENUINE CONNECTIONS."
    },
    {
      title: "EVERY PROJECT IS A ",
      titleBold: "STRATEGIC CANVAS",
      description: "WHERE CREATIVE VISION MEETS YOUR GOALS."
    }
  ];

  // Initialize the grid configuration with our content
  const gridConfig = [...defaultGridLayout];
  
  // Update the slider config with our slides
  const sliderConfig = gridConfig.find(item => item.type === 'slider');
  if (sliderConfig) {
    sliderConfig.props = { slides };
  }
  
  // Update the industryTerm config with a random term
  const termConfig = gridConfig.find(item => item.type === 'industryTerm');
  if (termConfig) {
    termConfig.props = { term: getRandomTerm() };
  }

  const handleIntroComplete = useCallback(() => {
    setShowContent(true);
  }, []);

  // Skip intro if reduced motion is preferred
  useEffect(() => {
    if (prefersReducedMotion) {
      setSkipIntro(true);
      setShowContent(true);
    }
  }, [prefersReducedMotion]);

  return (
    <div className="w-full min-h-screen bg-[#F0EBE6] dark:bg-[#191919] text-black dark:text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <Header />

        {/* Main Content - Only show after intro animation or if skipped */}
        {(showContent || skipIntro) && (
          <div className="mt-12">
            {/* Use our new GridLayout component with the configured grid */}
            <GridLayout layout={gridConfig} className="mb-12" />
            
            {/* Social Links - These remain outside the grid, maintaining current layout */}
            <SocialLinks />
          </div>
        )}

        {/* Intro Animation - Only show if not skipped */}
        {!skipIntro && (
          <IntroAnimation onAnimationComplete={handleIntroComplete} />
        )}
      </div>
    </div>
  );
};

// Social icons remain the same as in the original Index component
export const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export default IndexGrid; 