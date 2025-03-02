import { useState, useEffect } from "react";
import Header from "../components/Header";
import Slider from "../components/Slider";
import VideoSection from "../components/VideoSection";
import ContactForm from "../components/ContactForm";
import Testimonial from "../components/Testimonial";
import SocialLinks from "../components/SocialLinks";
import IntroAnimation from "../components/IntroAnimation";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showIntro, setShowIntro] = useState(true); // Always show intro on refresh
  const [showContent, setShowContent] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [animationRemoved, setAnimationRemoved] = useState(false);

  // For debugging
  useEffect(() => {
    console.log("Index mounted, showing animation on refresh");
  }, []);

  const slides = [
    {
      title: "Every brand has a story worth",
      titleBold: "telling, and telling well.",
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
    console.log("Animation complete callback triggered");
    // Mark animation as complete
    setAnimationComplete(true);
    
    // Show the content but keep the intro visible
    // The intro will fade itself out
    setShowContent(true);
    console.log("Setting showContent to true");
    
    // After a delay, remove the intro component
    setTimeout(() => {
      console.log("Setting showIntro to false");
      setShowIntro(false);
      setAnimationRemoved(true);
    }, 2800);
  };

  // Set loaded state after content appears
  useEffect(() => {
    if (showContent) {
      console.log("showContent is true, setting up timer for isLoaded");
      // Delay the opacity transition to ensure smooth handoff from animation
      const timer = setTimeout(() => {
        console.log("Setting isLoaded to true");
        setIsLoaded(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [showContent]);

  // For debugging
  useEffect(() => {
    console.log("State updated - showIntro:", showIntro, "showContent:", showContent, "isLoaded:", isLoaded, "animationComplete:", animationComplete);
  }, [showIntro, showContent, isLoaded, animationComplete]);

  return (
    <>
      {showIntro && !animationRemoved && (
        <IntroAnimation onAnimationComplete={handleAnimationComplete} />
      )}
      
      <div 
        className={`min-h-screen transition-colors duration-300 bg-[#F0EBE6] dark:bg-[#2A2D36] transition-opacity duration-1500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ display: showContent ? 'block' : 'none' }}
      >
        <div className="mx-auto p-4 md:p-6 max-w-screen-2xl">
          <Header initiallyHidden={!animationComplete} />

          <div className="flex flex-col md:flex-row border-l-3 border-t-3 border-[#FF3B31] dark:border-[#FF7A6E]">
            <div className="w-full md:w-2/3 border-r-3 border-b-3 border-[#FF3B31] dark:border-[#FF7A6E]">
              <Slider slides={slides} />
            </div>

            <VideoSection />
          </div>

          <div className="flex flex-col md:flex-row border-l-3 border-[#FF3B31] dark:border-[#FF7A6E] mt-0">
            <div className="w-full md:w-1/3 border-r-3 border-b-3 border-[#FF3B31] dark:border-[#FF7A6E]">
              <ContactForm />
            </div>
            
            <div className="w-0 md:w-1/3 border-r-3 border-[#FF3B31] dark:border-[#FF7A6E]"></div>
            
            <div className="w-full md:w-1/3 border-r-3 border-b-3 border-[#FF3B31] dark:border-[#FF7A6E]">
              <Testimonial />
            </div>
          </div>
          
          {/* Social Links section */}
          <div className="flex justify-end">
            <SocialLinks />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
