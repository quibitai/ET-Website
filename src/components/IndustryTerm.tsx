import React from "react";
import { TermDefinition } from "../data/industryTerms";

interface IndustryTermProps {
  term: TermDefinition;
}

const IndustryTerm: React.FC<IndustryTermProps> = ({ term }) => {
  return (
    <div className="text-[#FF3B31] dark:text-[#FFEB94] text-center">
      <div className="font-bold text-lg mb-2">{term.term}</div>
      <div className="text-sm dark:text-[#FFEB94]/80">{term.definition}</div>
    </div>
  );
};

export default IndustryTerm;
