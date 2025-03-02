import React from "react";
import HeroVideoDialog from "./HeroVideoDialog";

export function HeroVideoDialogDemo() {
  // Array of image paths from VideoSection for thumbnails
  const images = [
    "/lovable-uploads/8c7833fa-6d9f-4d07-85ac-0fff2c65900b.png",
    "/lovable-uploads/39feef62-f838-4c97-9991-605409788ff7.png",
    "/lovable-uploads/03187131-8470-4175-8aa2-3be694f2b092.png",
    "/lovable-uploads/90c240f2-f13b-40fe-87ff-963a98742433.png",
    "/lovable-uploads/9070139e-777d-45b2-8ef9-d7d54c761565.png",
    "/lovable-uploads/fe1ac9ce-dd84-4333-83c8-54e4b8e4ac6b.png"
  ];

  // Use the first image as the thumbnail
  const thumbnailSrc = images[0];
  
  // Vimeo video URL from the existing VideoSection component
  const vimeoSrc = "https://player.vimeo.com/video/1058267807";

  return (
    <div className="relative max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4 text-[#FF3B31] dark:text-[#FF7A6E]">
        Echo Tango 2025 Demo Reel
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Light mode version */}
        <div className="border-3 border-[#FF3B31] dark:border-[#FF7A6E] p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Standard Animation</h3>
          <HeroVideoDialog
            className="block"
            animationStyle="from-center"
            videoSrc={vimeoSrc}
            thumbnailSrc={thumbnailSrc}
            thumbnailAlt="Echo Tango 2025 Demo Reel"
          />
        </div>
        
        {/* Dark mode version with different animation */}
        <div className="border-3 border-[#FF3B31] dark:border-[#FF7A6E] p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Bottom-Up Animation</h3>
          <HeroVideoDialog
            className="block"
            animationStyle="from-bottom"
            videoSrc={vimeoSrc}
            thumbnailSrc={images[1]}
            thumbnailAlt="Echo Tango 2025 Demo Reel - Alternative View"
          />
        </div>
      </div>
      
      {/* Full-width version with fade animation */}
      <div className="mt-6 border-3 border-[#FF3B31] dark:border-[#FF7A6E] p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-3">Cinematic View</h3>
        <HeroVideoDialog
          className="block"
          animationStyle="fade"
          videoSrc={vimeoSrc}
          thumbnailSrc={images[2]}
          thumbnailAlt="Echo Tango 2025 Demo Reel - Cinematic View"
        />
      </div>
    </div>
  );
}

export default HeroVideoDialogDemo; 