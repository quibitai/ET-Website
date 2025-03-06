import React, { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import SocialLinks from "../components/SocialLinks";
import IntroAnimation from "../components/IntroAnimation";
import GridLayout from "../components/grid/GridLayout";
import ThemeToggle from "../components/ThemeToggle";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { getRandomTerm } from "../data/industryTerms";
import { defaultGridLayout } from "../components/grid/gridConfig";

/**
 * IndexThemed Page
 * 
 * Showcases the new theme system while maintaining the same visual appearance
 * as the current implementation. Adds a theme toggle component for easy testing.
 */
const IndexThemed: React.FC = () => {
  const [skipIntro, setSkipIntro] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showThemeToggle, setShowThemeToggle] = useState(false);
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

  // Show theme toggle after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowThemeToggle(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F5F5F5] dark:bg-[#191919] text-black dark:text-white">
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
            
            {/* Theme Toggle for easy testing - only shown after delay */}
            {showThemeToggle && (
              <div 
                className="fixed bottom-4 right-4 bg-[#F5F5F5] dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                style={{ maxWidth: '300px' }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-bold">Theme Controls</h3>
                  <button 
                    onClick={() => setShowThemeToggle(false)}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    Hide
                  </button>
                </div>
                <ThemeToggle />
              </div>
            )}
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

export default IndexThemed; 