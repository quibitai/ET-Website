import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { Clapperboard, X } from "lucide-react";
import { useIndustry } from "../contexts/IndustryContext";
import { useTheme } from "../theme";
import ReactDOM from "react-dom";

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

// Modal component that will be rendered outside the DOM hierarchy
const VideoModal = ({ onClose, videoUrl }: { onClose: () => void, videoUrl: string }) => {
  // Store the original grayscale state to restore it on close
  const [wasGrayscaleEnabled, setWasGrayscaleEnabled] = useState(false);
  const grayscaleRef = useRef(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // On mount, check if grayscale is active and disable it temporarily
  useEffect(() => {
    const htmlElement = document.documentElement;
    const hasGrayscale = htmlElement.classList.contains('grayscale-mode');
    
    // Store in state for re-renders
    setWasGrayscaleEnabled(hasGrayscale);
    
    // Also store in ref for cleanup function
    grayscaleRef.current = hasGrayscale;
    
    // If in grayscale mode, temporarily remove it
    if (hasGrayscale) {
      htmlElement.classList.remove('grayscale-mode');
    }
    
    // Restore grayscale mode when component unmounts
    return () => {
      if (grayscaleRef.current) {
        htmlElement.classList.add('grayscale-mode');
      }
    };
  }, []);
  
  // Handle closing with restoring grayscale if needed
  const handleClose = () => {
    // Restore grayscale immediately before closing the modal
    if (grayscaleRef.current) {
      document.documentElement.classList.add('grayscale-mode');
    }
    // Then close the modal
    onClose();
  };
  
  // Handle clicks on the backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking directly on the backdrop (not its children)
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };
  
  // Create a portal to render this outside the normal DOM flow
  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80" 
      style={{ backdropFilter: 'blur(5px)' }}
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl mx-auto px-4" ref={modalContentRef}>
        <button 
          onClick={handleClose}
          className="absolute -top-10 right-2 z-50 text-white p-2 hover:text-gray-300 transition-colors"
          aria-label="Close video"
        >
          <X size={24} />
        </button>
        
        <div style={{padding:'56.25% 0 0 0', position:'relative'}} className="relative">
          <iframe 
            src={videoUrl}
            style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
            allowFullScreen
            title="Echo Tango 2025 Reel"
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

const VideoSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { getRandomTerm } = useIndustry();
  const { visualMode } = useTheme();
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
    
    // Load Vimeo Player API script
    if (!document.querySelector('script[src="https://player.vimeo.com/api/player.js"]')) {
      const script = document.createElement('script');
      script.src = "https://player.vimeo.com/api/player.js";
      document.body.appendChild(script);
    }
  }, []);

  // Set up the image cycling interval
  useEffect(() => {
    if (isPlaying && !isModalOpen) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, isModalOpen]);

  // Toggle play/pause for the image slideshow
  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(prev => !prev);
  };

  // Open the video modal
  const openVideoModal = () => {
    setIsModalOpen(true);
    setIsPlaying(false); // Pause the animation
  };

  // Close the video modal
  const closeVideoModal = () => {
    setIsModalOpen(false);
    setIsPlaying(true); // Resume the animation
    getRandomTerm(); // Get a new term just for fun
  };

  // Get the Vimeo video URL with parameters
  const getVideoUrl = () => {
    return "https://player.vimeo.com/video/1058267807?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1";
  };

  return (
    <div className="w-full h-full bg-black overflow-hidden relative">
      {/* Image display with cycling effect */}
      <div 
        className="relative w-full h-full cursor-pointer group"
        onClick={openVideoModal}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Production process ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'color-always' : ''}`}
          />
        ))}
        
        {/* Play/pause button */}
        <button 
          onClick={togglePlayPause}
          className="absolute bottom-2 left-2 bg-black/70 hover:bg-black text-[#F5F5F5] p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
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
          <div className="flex flex-col items-center justify-center">
            <div className={`bg-[#F5F5F5] dark:bg-gray-900 rounded-full p-2 transform transition-transform group-hover:scale-110 ${isHovered ? 'color-always' : ''}`}>
              <Clapperboard size={24} className={visualMode === 'grayscale' && !isHovered
                ? "text-[#333333] dark:text-[#DDDDDD]"
                : "text-[#FF3B31] dark:text-[#FF7A6E]"
              } />
            </div>
            <p className="text-[#F5F5F5] mt-2 text-xs md:text-sm font-medium">play 2025 reel</p>
          </div>
        </div>
      </div>

      {/* Video Modal - Rendered with portal outside the DOM hierarchy */}
      {isModalOpen && <VideoModal onClose={closeVideoModal} videoUrl={getVideoUrl()} />}
    </div>
  );
};

export default memo(VideoSection);
