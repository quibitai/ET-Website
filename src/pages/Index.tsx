import { useState, useEffect } from "react";
import Header from "../components/Header";
import Slider from "../components/Slider";
import VideoSection from "../components/VideoSection";
import ContactForm from "../components/ContactForm";
import Testimonial from "../components/Testimonial";
import SocialLinks from "../components/SocialLinks";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 bg-[#F0EBE6] dark:bg-[#2A2D36] transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mx-auto p-4 md:p-6 max-w-screen-2xl">
        <Header />

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
  );
};

export default Index;
