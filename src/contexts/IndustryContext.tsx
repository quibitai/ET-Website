import React, { createContext, useContext, useState } from 'react';
import { TermDefinition, getRandomTerm as getRandomTermUtil } from '../data/industryTerms';

type IndustryContextType = {
  currentTerm: TermDefinition;
  getRandomTerm: () => TermDefinition;
};

const IndustryContext = createContext<IndustryContextType | undefined>(undefined);

export function IndustryProvider({ children }: { children: React.ReactNode }) {
  const [currentTerm, setCurrentTerm] = useState<TermDefinition>(getRandomTermUtil());

  const getRandomTerm = () => {
    const newTerm = getRandomTermUtil();
    setCurrentTerm(newTerm);
    return newTerm;
  };

  return (
    <IndustryContext.Provider value={{ currentTerm, getRandomTerm }}>
      {children}
    </IndustryContext.Provider>
  );
}

export function useIndustry() {
  const context = useContext(IndustryContext);
  if (context === undefined) {
    throw new Error('industry must be used within a React Context.Provider');
  }
  return context;
} 