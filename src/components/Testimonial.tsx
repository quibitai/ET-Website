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
      className="p-3 sm:p-4 md:p-6 lg:p-8 h-full flex items-center"
      style={{ backgroundColor }}
    >
      <div className="w-full">
        <blockquote 
          className="font-serif text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl leading-tight mb-2 sm:mb-4 md:mb-6"
          style={{ color: primaryColor }}
        >
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif" dangerouslySetInnerHTML={{ __html: '&ldquo;' }}></span>
          <span className="block sm:inline">They somehow made us look way </span>
          <span 
            className="px-1 sm:px-2 inline-block my-1 sm:my-0"
            style={{ 
              backgroundColor: primaryColor,
              color: backgroundColor 
            }}
          >
            cooler than we actually are.
          </span>
          <span className="block sm:inline"> 10/10, would let them reinvent us again.</span>
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif" dangerouslySetInnerHTML={{ __html: '&rdquo;' }}></span>
        </blockquote>
        <footer
          className="text-xs sm:text-sm md:text-base"
          style={{ color: primaryColor }}
        >
          <p className="font-medium">— GARY <span className="font-normal">Satisfied (and Real) Client</span></p>
        </footer>
      </div>
    </div>
  );
};

export default Testimonial;
