import React from "react";
import { useTheme, getBackgroundColor, getPrimaryColor, getTextColor } from "../theme";

const Testimonial: React.FC = () => {
  const { isDark, visualMode } = useTheme();
  
  // Get colors from the theme system
  const backgroundColor = getBackgroundColor(isDark, visualMode);
  const primaryColor = getPrimaryColor(isDark, visualMode);
  const textColor = getTextColor(isDark, visualMode);
  
  return (
    <div 
      className="p-3 lg:p-8 h-full flex items-center"
      style={{ backgroundColor }}
    >
      <div className="w-full mx-auto max-w-[95%] sm:max-w-[90%]">
        <blockquote 
          className="font-serif text-[0.8rem] xs:text-sm sm:text-base md:text-lg lg:text-[1.32rem] leading-tight xs:leading-tight sm:leading-snug lg:leading-snug mb-2 sm:mb-3 lg:mb-4"
          style={{ color: primaryColor }}
        >
          <span className="inline-block sm:inline">
            <span className="text-base xs:text-lg sm:text-xl lg:text-[1.625rem] font-serif" dangerouslySetInnerHTML={{ __html: '&ldquo;' }}></span>
            They somehow made us look way 
          </span>
          <span 
            className="px-1 sm:px-1 md:px-2 inline-block my-1 sm:my-0"
            style={{ 
              backgroundColor: primaryColor,
              color: backgroundColor 
            }}
          >
            cooler than we actually are.
          </span>
          <span className="inline-block sm:inline"> 10/10, would let them reinvent us again.</span>
          <span className="text-base xs:text-lg sm:text-xl lg:text-[1.625rem] font-serif" dangerouslySetInnerHTML={{ __html: '&rdquo;' }}></span>
        </blockquote>
        <footer
          className="text-[0.7rem] xs:text-xs sm:text-sm md:text-base lg:text-[1.07rem] mt-2"
          style={{ color: primaryColor }}
        >
          <p className="font-medium">— GARY <span className="font-normal">Satisfied (and Real) Client</span></p>
        </footer>
      </div>
    </div>
  );
};

export default Testimonial;
