import React from "react";
import { Instagram, Facebook, Youtube } from "lucide-react";

const SocialLinks: React.FC = () => {
  return (
    <div className="flex items-center justify-end gap-4 p-4">
      <a 
        href="https://www.instagram.com/echotangocreative" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[#FF3B31] dark:text-[#FF7A6E] hover:opacity-80 transition-opacity"
        aria-label="Instagram"
      >
        <Instagram strokeWidth={1.5} size={28} />
      </a>
      <a 
        href="https://www.facebook.com/echotangocreative" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[#FF3B31] dark:text-[#FF7A6E] hover:opacity-80 transition-opacity"
        aria-label="Facebook"
      >
        <Facebook strokeWidth={1.5} size={28} />
      </a>
      <a 
        href="https://vimeo.com/echotango" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[#FF3B31] dark:text-[#FF7A6E] hover:opacity-80 transition-opacity"
        aria-label="Vimeo"
      >
        <Youtube strokeWidth={1.5} size={28} />
      </a>
    </div>
  );
};

export default SocialLinks;
