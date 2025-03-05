import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { Clapperboard, X } from "lucide-react";
import IndustryTerm from "./IndustryTerm";
import { getRandomTerm } from "../data/industryTerms";
import HeroVideoDialog from "./HeroVideoDialog";
import { Dialog, DialogContent } from "./ui/dialog";

// Array of image paths
const images = [
  "/lovable-uploads/8c7833fa-6d9f-4d07-85ac-0fff2c65900b.png",
  "/lovable-uploads/39feef62-f838-4c97-9991-605409788ff7.png",
  "/lovable-uploads/03187131-8470-4175-8aa2-3be694f2b092.png",
  "/lovable-uploads/90c240f2-f13b-40fe-87ff-963a98742433.png",
  "/lovable-uploads/9070139e-777d-45b2-8ef9-d7d54c761565.png",
  "/lovable-uploads/fe1ac9ce-dd84-4333-83c8-54e4b8e4ac6b.png"
];

// Preload images for smoother animation
const preloadImages = () => {
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

const VideoSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [randomTerm, setRandomTerm] = useState(getRandomTerm());
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Function to advance to the next image
  const advanceImage = useCallback(() => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
  }, []);
  
  // Preload images on mount
  useEffect(() => {
    const loadImages = async () => {
      await Promise.all(images.map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = src;
        });
      }));
      setImagesLoaded(true);
    };
    
    loadImages();
  }, []);
  
  // Set up and tear down the animation interval
  useEffect(() => {
    // Only start animation when images are loaded
    if (!imagesLoaded) return;
    
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Set up a new interval if animation should be playing
    if (isPlaying) {
      // Slowed down significantly for a more deliberate animation
      intervalRef.current = setInterval(advanceImage, 1500);
    }

    // Clean up on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, imagesLoaded, advanceImage]);

  // Get a random term on component mount
  useEffect(() => {
    setRandomTerm(getRandomTerm());
  }, []);

  // Handle dialog state change
  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    setIsPlaying(!open); // Pause animation when dialog is open
  };

  // Vimeo video URL
  const vimeoSrc = "https://player.vimeo.com/video/1058267807";

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
                loading="eager" // Ensure first image loads immediately
                decoding="async" // Allow browser to optimize decoding
              />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 z-10 w-full h-full cursor-pointer">
                <div className="flex flex-col items-center justify-center">
                  <Clapperboard 
                    className="text-[#FFEB94] w-16 h-16" 
                    aria-hidden="true" 
                    onClick={() => handleDialogOpenChange(true)}
                  />
                  <p 
                    className="text-[#FFEB94] mt-2 text-xl font-medium"
                    onClick={() => handleDialogOpenChange(true)}
                  >
                    play 2025 reel
                  </p>
                </div>
              </div>
              
              {/* Video Dialog */}
              <Dialog 
                open={isDialogOpen} 
                onOpenChange={handleDialogOpenChange}
              >
                <DialogContent 
                  className="sm:max-w-4xl p-0 bg-black border-none overflow-hidden"
                  aria-labelledby="video-dialog-title"
                >
                  <button 
                    onClick={() => handleDialogOpenChange(false)}
                    className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-[#FF3B31] dark:focus:ring-[#FF7A6E]"
                    aria-label="Close video"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  
                  <div className="relative w-full" style={{ padding: '56.25% 0 0 0' }}>
                    {isDialogOpen && (
                      <iframe 
                        src={`${vimeoSrc}?autoplay=1&loop=0&muted=0`}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
                        frameBorder="0" 
                        allow="autoplay; fullscreen; picture-in-picture" 
                        allowFullScreen
                        title="2025 Demo Reel"
                        id="video-dialog-title"
                      ></iframe>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="bg-[#FFEB94]/70 dark:bg-[#3A3D45] flex items-center justify-center p-4 border-r-3 border-[#FF3B31] dark:border-[#FF7A6E]">
            <div className="w-full max-w-xs">
              <IndustryTerm term={randomTerm} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(VideoSection);
