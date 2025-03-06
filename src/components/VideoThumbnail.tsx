import React from 'react';
import { useTheme } from '../theme';

interface VideoThumbnailProps {
  index: number;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ index }) => {
  const { isDark } = useTheme();
  
  // Border color consistent with the main grid
  const borderColor = isDark ? '#FF7A6E' : '#FF3B31';
  
  return (
    <div className="h-full w-full p-4 flex items-center justify-center">
      <div 
        className="h-full w-full border-2 rounded-md flex flex-col items-center justify-center transition-transform duration-300 hover:scale-95"
        style={{ borderColor }}
      >
        <div className="text-xl font-bold mb-2" style={{ color: borderColor }}>
          Video {index}
        </div>
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: borderColor }}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="#F5F5F5" 
            className="w-6 h-6"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default VideoThumbnail; 