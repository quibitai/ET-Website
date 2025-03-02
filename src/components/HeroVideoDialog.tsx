import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Clapperboard, X } from "lucide-react";

export interface HeroVideoDialogProps {
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
  className?: string;
  animationStyle?: "from-center" | "from-bottom" | "from-top" | "fade";
}

const animationVariants = {
  "from-center": {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },
  "from-bottom": {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 }
  },
  "from-top": {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  },
  "fade": {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  }
};

const HeroVideoDialog: React.FC<HeroVideoDialogProps> = ({
  videoSrc,
  thumbnailSrc,
  thumbnailAlt,
  className = "",
  animationStyle = "from-center"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle dialog state change
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    // Reset loaded state when dialog closes
    if (!open) {
      setIsLoaded(false);
    }
  };

  // Get animation variants based on style
  const variants = animationVariants[animationStyle];

  // Ensure the video URL has the right parameters for autoplay
  const getVideoUrl = () => {
    const url = videoSrc;
    const hasParams = url.includes('?');
    const autoplayParam = 'autoplay=1&loop=0&muted=0';
    return `${url}${hasParams ? '&' : '?'}${autoplayParam}`;
  };

  // Render a custom trigger when no thumbnail is provided
  const renderTrigger = () => {
    if (!thumbnailSrc) {
      return (
        <button 
          className={`absolute inset-0 flex flex-col items-center justify-center bg-black/30 z-10 w-full h-full cursor-pointer ${className}`}
          aria-label="Play 2025 demo reel"
        >
          <div className="flex flex-col items-center justify-center">
            <Clapperboard className="text-[#FFEB94] w-16 h-16" aria-hidden="true" />
            <p className="text-[#FFEB94] mt-2 text-xl font-medium">play 2025 reel</p>
          </div>
        </button>
      );
    }

    return (
      <div className={`relative group cursor-pointer overflow-hidden ${className}`}>
        <div className="relative aspect-video overflow-hidden border-3 border-[#FF3B31] dark:border-[#FF7A6E]">
          <img
            src={thumbnailSrc}
            alt={thumbnailAlt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 z-10 w-full h-full group-hover:bg-black/40 transition-colors duration-300">
            <div className="flex flex-col items-center justify-center">
              <Clapperboard className="text-[#FFEB94] w-16 h-16" aria-hidden="true" />
              <p className="text-[#FFEB94] mt-2 text-xl font-medium">play 2025 reel</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {renderTrigger()}
      </DialogTrigger>

      <DialogContent 
        className="sm:max-w-4xl p-0 bg-black border-none overflow-hidden"
        aria-labelledby="video-dialog-title"
      >
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-[#FF3B31] dark:focus:ring-[#FF7A6E]"
          aria-label="Close video"
        >
          <X className="h-5 w-5" />
        </button>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? "video" : "placeholder"}
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full"
            style={{ paddingTop: '56.25%' }} // 16:9 aspect ratio
          >
            {isOpen && (
              <iframe 
                src={getVideoUrl()}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                allowFullScreen
                title="Echo Tango 2025 Demo Reel"
                id="video-dialog-title"
                onLoad={() => setIsLoaded(true)}
                className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
            )}
            {isOpen && !isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="w-12 h-12 border-4 border-[#FF3B31] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default HeroVideoDialog; 