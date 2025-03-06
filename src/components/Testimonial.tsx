import React from "react";

const Testimonial: React.FC = () => {
  return (
    <div className="bg-[#F5F5F5] dark:bg-[#16192E] p-3 sm:p-4 md:p-6 lg:p-8 h-full flex items-center">
      <div className="w-full">
        <blockquote className="text-[#FF3B31] dark:text-[#FF7A6E] font-serif text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl leading-tight mb-2 sm:mb-4 md:mb-6">
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif" dangerouslySetInnerHTML={{ __html: '&ldquo;' }}></span>
          <span className="block sm:inline">They somehow made us look way </span>
          <span className="bg-[#FF3B31] dark:bg-[#FF7A6E] text-[#F5F5F5] px-1 sm:px-2 inline-block my-1 sm:my-0">cooler than we actually are.</span>
          <span className="block sm:inline"> 10/10, would let them reinvent us again.</span>
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif" dangerouslySetInnerHTML={{ __html: '&rdquo;' }}></span>
        </blockquote>
        <footer className="text-[#FF3B31] dark:text-[#FF7A6E] text-xs sm:text-sm md:text-base">
          <p className="font-medium">— GARY <span className="font-normal">Satisfied (and Real) Client</span></p>
        </footer>
      </div>
    </div>
  );
};

export default Testimonial;
