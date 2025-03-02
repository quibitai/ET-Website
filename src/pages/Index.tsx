import { useState, useEffect, lazy, Suspense } from "react";
import Header from "../components/Header";
import Slider from "../components/Slider";
import ContactForm from "../components/ContactForm";
import Testimonial from "../components/Testimonial";
import SocialLinks from "../components/SocialLinks";
import IntroAnimation from "../components/IntroAnimation";
import RetroPlayer from "../components/RetroPlayer";
import { useRetro } from '../contexts/RetroContext';

// Lazy load the VideoSection component as it's heavier with images
const VideoSection = lazy(() => import("../components/VideoSection"));

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showIntro, setShowIntro] = useState(true); // Always show intro on refresh
  const [showContent, setShowContent] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [animationRemoved, setAnimationRemoved] = useState(false);
  const { isRetro } = useRetro();

  const slides = [
    {
      title: "Every brand has a story worth telling,",
      titleBold: "and telling well.",
      description: "We bring together the brand designers and visual storytellers, the artists and the filmmakers, the illustrators, animators, writers, the editors...throw them into the creative sandbox, and make some magic happen."
    },
    {
      title: "Better yet, invite everyone ",
      titleBold: "behind the veil.",
      description: "Because creativity isn't just for the dreamers and left-handed eccentrics."
    },
    {
      title: "Whoa! You're still here?",
      titleBold: "Then you should know",
      description: "We think stories are also about making connections, not walling off the creative process and excluding the characters from the telling of their own story. We'd be honored to hear your story and help you to tell it to the world."
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

  return (
    <>
      {showIntro && !animationRemoved && (
        <IntroAnimation onAnimationComplete={handleAnimationComplete} />
      )}
      
      <div 
        className={`min-h-screen transition-colors duration-300 bg-[#F0EBE6] dark:bg-[#2A2D36] transition-opacity duration-1500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ display: showContent ? 'block' : 'none' }}
        role="main"
        aria-live="polite"
      >
        <div className="mx-auto p-4 md:p-6 max-w-screen-2xl">
          <Header initiallyHidden={!animationComplete} />
          {isRetro && <RetroPlayer />}

          <div className="flex flex-col md:flex-row border-l-3 border-t-3 border-[#FF3B31] dark:border-[#FF7A6E]">
            <div className="w-full md:w-2/3 border-r-3 border-b-3 border-[#FF3B31] dark:border-[#FF7A6E]">
              <Slider slides={slides} />
            </div>

            <Suspense fallback={
              <div className="w-full md:w-1/3 border-b-3 border-[#FF3B31] dark:border-[#FF7A6E] h-full flex items-center justify-center">
                <div className="animate-pulse bg-[#FF3B31]/20 dark:bg-[#FF7A6E]/20 h-full w-full"></div>
              </div>
            }>
              <VideoSection />
            </Suspense>
          </div>

          <div className="flex flex-col md:flex-row border-l-3 border-[#FF3B31] dark:border-[#FF7A6E] mt-0">
            <div className="w-full md:w-1/3 border-r-3 border-b-3 border-[#FF3B31] dark:border-[#FF7A6E] relative">
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
            </div>
            
            <div className="w-0 md:w-1/3 border-r-3 border-[#FF3B31] dark:border-[#FF7A6E]"></div>
            
            <div className="w-full md:w-1/3 border-r-3 border-b-3 border-[#FF3B31] dark:border-[#FF7A6E]">
              <Testimonial />
            </div>
          </div>
          
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
