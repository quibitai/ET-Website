import React from "react";

const Testimonial: React.FC = () => {
  return (
    <div className="bg-[#F0EBE6] dark:bg-[#16192E] p-8 h-full flex items-center">
      <div>
        <blockquote className="text-black dark:text-[#FF7A6E] font-serif text-2xl sm:text-3xl leading-tight mb-6">
          <span className="text-3xl sm:text-4xl font-serif" dangerouslySetInnerHTML={{ __html: '&ldquo;' }}></span>
          They somehow made us look way cooler than we actually are. 10/10, would let them reinvent us again.
          <span className="text-3xl sm:text-4xl font-serif" dangerouslySetInnerHTML={{ __html: '&rdquo;' }}></span>
        </blockquote>
        <footer className="text-black dark:text-[#FF7A6E]">
          <p className="font-medium">— GARY <span className="font-normal">Satisfied (and Real) Client</span></p>
        </footer>
      </div>
    </div>
  );
};

export default Testimonial;
