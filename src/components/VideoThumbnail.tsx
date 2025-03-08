import React, { useState } from 'react';
import { useTheme } from '../theme';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';

interface VideoThumbnailProps {
  index: number;
}

interface VideoModalProps {
  onClose: () => void;
  videoUrl: string;
}

// Define video data mapping based on index
const videoData = [
  {}, // Empty for index 0 (not used)
  { thumbnail: "/images/ET_web_thumbs__0001.png", videoId: "311497141" },
  { thumbnail: "/images/ET_web_thumbs__0002.png", videoId: "368835281" },
  { thumbnail: "/images/ET_web_thumbs__0003.png", videoId: "679296644" },
  { thumbnail: "/images/ET_web_thumbs__0004.png", videoId: "647831709" },
  { thumbnail: "/images/ET_web_thumbs__0005.png", videoId: "319084138" },
  { thumbnail: "/images/ET_web_thumbs__0008.png", videoId: "917247170" }, // Middle right cell (index 6) - swapped with index 9
  { thumbnail: "/images/ET_web_thumbs__0007.png", videoId: "395092441" },
  { thumbnail: "/images/ET_web_thumbs__0008.png", videoId: "518227468" },
  { thumbnail: "/images/ET_web_thumbs__0006.png", videoId: "1060928110" }, // Bottom right cell (index 9) - swapped with index 6
];

// Modal component for viewing videos
const VideoModal = ({ onClose, videoUrl }: VideoModalProps) => {
  // Store the original grayscale state to restore it on close
  const [wasGrayscaleEnabled, setWasGrayscaleEnabled] = useState(false);
  const grayscaleRef = React.useRef(false);

  // On mount, check if grayscale is active and disable it temporarily
  React.useEffect(() => {
    const htmlElement = document.documentElement;
    const hasGrayscale = htmlElement.classList.contains('grayscale-mode');
    
    setWasGrayscaleEnabled(hasGrayscale);
    grayscaleRef.current = hasGrayscale;
    
    if (hasGrayscale) {
      htmlElement.classList.remove('grayscale-mode');
    }
    
    return () => {
      if (grayscaleRef.current) {
        htmlElement.classList.add('grayscale-mode');
      }
    };
  }, []);
  
  // Handle closing
  const handleClose = () => {
    if (grayscaleRef.current) {
      document.documentElement.classList.add('grayscale-mode');
    }
    onClose();
  };
  
  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80" 
      style={{ backdropFilter: 'blur(5px)' }}
    >
      <div className="relative w-full max-w-4xl mx-auto px-4">
        <button 
          onClick={handleClose}
          className="absolute -top-10 right-2 z-50 bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition-colors"
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
            title="Echo Tango Video"
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ index }) => {
  const { isDark, visualMode } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Get video data for this index, defaulting to first video if index is out of range
  const video = videoData[index] || videoData[1];
  
  // Get the Vimeo URL with parameters
  const getVideoUrl = () => {
    // Use the exact specified link for index 2
    if (index === 2) {
      return "https://player.vimeo.com/video/368835281?h=93a404b9b9&autoplay=1";
    }
    // Use standard format for all other videos
    return `https://player.vimeo.com/video/${video.videoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1`;
  };

  // Open the video modal
  const openVideoModal = () => {
    setIsModalOpen(true);
  };

  // Close the video modal
  const closeVideoModal = () => {
    setIsModalOpen(false);
  };
  
  // Preload the video thumbnail
  React.useEffect(() => {
    const img = new Image();
    img.src = video.thumbnail;
  }, [video.thumbnail]);
  
  return (
    <div className="h-full w-full">
      <div 
        className="h-full w-full relative overflow-hidden cursor-pointer group"
        onClick={openVideoModal}
      >
        {/* Thumbnail image */}
        <img 
          src={video.thumbnail} 
          alt={`Video thumbnail ${index}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
          <div className="flex flex-col items-center justify-center">
            <div className={`bg-[#F5F5F5] dark:bg-gray-900 rounded-full p-3 transform transition-transform group-hover:scale-110`}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                className={`w-6 h-6 ${
                  visualMode === 'grayscale' 
                    ? "text-[#333333] dark:text-[#DDDDDD]" 
                    : "text-[#FF3B31] dark:text-[#FF7A6E]"
                }`}
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Video Modal */}
      {isModalOpen && <VideoModal onClose={closeVideoModal} videoUrl={getVideoUrl()} />}
    </div>
  );
};

export default VideoThumbnail; 