import React from "react";

const Testimonial: React.FC = () => {
  return (
    <div className="bg-[#F0EBE6] dark:bg-[#2A2D36] p-8 h-full">
      <blockquote className="text-[#FF3B31] dark:text-[#FF7A6E] font-serif text-2xl sm:text-3xl leading-tight mb-6">
        "They somehow made us look way cooler than we actually are. 10/10, would let them reinvent us again."
      </blockquote>
      <footer className="text-[#FF3B31] dark:text-[#FF7A6E]">
        <p className="font-medium">— GARY <span className="font-normal">Satisfied (and Real) Client</span></p>
      </footer>
    </div>
  );
};

export default Testimonial;
