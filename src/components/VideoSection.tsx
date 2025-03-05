import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { Clapperboard, X } from "lucide-react";
import { useIndustry } from "../contexts/IndustryContext";
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
  const { getRandomTerm } = useIndustry();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload images on mount
  useEffect(() => {
    preloadImages();
  }, []);

  // Set up the image cycling interval
  useEffect(() => {
    if (isPlaying && !isDialogOpen) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 500); // Change image every 500ms
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, isDialogOpen]);

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  // Open the dialog
  const openDialog = () => {
    setIsDialogOpen(true);
    setIsPlaying(false); // Pause the animation when dialog opens
  };

  // Close the dialog
  const closeDialog = () => {
    setIsDialogOpen(false);
    setIsPlaying(true); // Resume the animation when dialog closes
    getRandomTerm(); // Just get a new term but don't need to store it
  };

  // Memoize the VideoSection component
  return (
    <div className="w-full h-full bg-black overflow-hidden">
      {/* Image display with cycling effect */}
      <div 
        className="relative w-full h-full cursor-pointer group"
        onClick={openDialog}
      >
        {images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Production process ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        
        {/* Play/pause button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            togglePlayPause();
          }}
          className="absolute bottom-2 left-2 bg-black/70 hover:bg-black text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={isPlaying ? "Pause animation" : "Play animation"}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </button>
        
        {/* Play video overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
          <div className="bg-white dark:bg-gray-900 rounded-full p-2 transform transition-transform group-hover:scale-110">
            <Clapperboard size={24} className="text-[#FF3B31] dark:text-[#FFEB94]" />
          </div>
          <span className="absolute bottom-2 right-2 text-white text-xs font-medium bg-black/70 px-2 py-1 rounded">
            Watch Demo
          </span>
        </div>
      </div>
      
      {/* Video Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl p-0 border-0 overflow-hidden bg-transparent" onInteractOutside={closeDialog}>
          <button 
            onClick={closeDialog}
            className="absolute right-2 top-2 z-50 bg-black/70 text-white p-1 rounded-full hover:bg-black/90 transition-colors"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
          <HeroVideoDialog 
            videoSrc="https://player.vimeo.com/video/715386363"
            thumbnailSrc={images[0]}
            thumbnailAlt="Echo Tango Demo Reel" 
            animationStyle="from-center"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default memo(VideoSection);
