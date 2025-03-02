import React from "react";
import Header from "../components/Header";
import HeroVideoDialogDemo from "../components/HeroVideoDialogDemo";
import SocialLinks from "../components/SocialLinks";

const VideoDemo = () => {
  return (
    <div className="min-h-screen bg-[#F0EBE6] dark:bg-[#2A2D36]">
      <div className="mx-auto p-4 md:p-6 max-w-screen-2xl">
        <Header />
        
        <div className="border-l-3 border-t-3 border-r-3 border-b-3 border-[#FF3B31] dark:border-[#FF7A6E] p-6">
          <h1 className="text-3xl font-bold mb-6 text-[#FF3B31] dark:text-[#FF7A6E]">
            Video Dialog Component Demo
          </h1>
          
          <p className="mb-8 text-lg">
            This page demonstrates the new HeroVideoDialog component that can be used throughout the Echo Tango website.
            Click on any of the thumbnails below to open the 2025 demo reel in a modal dialog.
          </p>
          
          <HeroVideoDialogDemo />
        </div>
        
        {/* Social Links section */}
        <div className="flex justify-end mt-6">
          <SocialLinks />
        </div>
      </div>
    </div>
  );
};

export default VideoDemo; 