import React, { useState, useEffect, useRef } from "react";
import { Coffee, Clapperboard } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import IndustryTerm from "./IndustryTerm";
import { getRandomTerm } from "../data/industryTerms";

// Array of image paths
const images = [
  "/lovable-uploads/8c7833fa-6d9f-4d07-85ac-0fff2c65900b.png",
  "/lovable-uploads/39feef62-f838-4c97-9991-605409788ff7.png",
  "/lovable-uploads/03187131-8470-4175-8aa2-3be694f2b092.png",
  "/lovable-uploads/90c240f2-f13b-40fe-87ff-963a98742433.png",
  "/lovable-uploads/9070139e-777d-45b2-8ef9-d7d54c761565.png",
  "/lovable-uploads/fe1ac9ce-dd84-4333-83c8-54e4b8e4ac6b.png"
];

const VideoSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [randomTerm, setRandomTerm] = useState(getRandomTerm());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Function to advance to the next image
  const advanceImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
  };
  
  // Set up and tear down the animation interval
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Set up a new interval if animation should be playing
    if (isPlaying) {
      // Slowed down to 800ms (was 400ms which was already slowed down from 250ms)
      intervalRef.current = setInterval(() => {
        advanceImage();
      }, 800);
      
      console.log("Animation started, cycling through", images.length, "images");
    }

    // Clean up on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        console.log("Animation interval cleared");
      }
    };
  }, [isPlaying]);

  // Get a random term on component mount
  useEffect(() => {
    setRandomTerm(getRandomTerm());
  }, []);

  return (
    <div className="relative w-full md:w-1/3 border-b-3 border-[#FF3B31] dark:border-[#FF7A6E]">
      <div className="h-full">
        <div className="grid grid-rows-2 h-full">
          <div className="relative border-b-3 border-r-3 border-[#FF3B31] dark:border-[#FF7A6E] h-full overflow-hidden">
            <div className="w-full h-full">
              <img 
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={`Animated sequence frame ${currentImageIndex + 1} of ${images.length}`}
                className="w-full h-full object-cover transition-opacity duration-100 ease-in-out"
              />
              
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  {/* Improved Clapperboard icon overlay with fixed dimensions */}
                  <button className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 z-10 w-full h-full cursor-pointer">
                    <div className="flex flex-col items-center justify-center">
                      <Clapperboard className="text-[#FFEB94] w-16 h-16" />
                      <p className="text-[#FFEB94] mt-2 text-xl font-medium">play 2025 reel</p>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-4xl p-0 bg-black border-none overflow-hidden">
                  <div className="relative w-full" style={{ padding: '56.25% 0 0 0' }}>
                    <iframe 
                      src="https://player.vimeo.com/video/1058267807?autoplay=1&loop=0&muted=0" 
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
                      frameBorder="0" 
                      allow="autoplay; fullscreen; picture-in-picture" 
                      allowFullScreen
                      title="2025 Demo Reel"
                    ></iframe>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="bg-[#FFEB94] dark:bg-[#3A3D45] flex items-center justify-center p-4">
            <div className="w-full max-w-xs">
              <IndustryTerm term={randomTerm} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
