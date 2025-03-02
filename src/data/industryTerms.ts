
// Industry terms data organized by category
export interface TermDefinition {
  category: string;
  term: string;
  definition: string;
}

export const industryTerms: TermDefinition[] = [
  // Video Production
  {
    category: "Video Production",
    term: "Editing",
    definition: "Sculpting raw footage into a seamless story—snipping, shaping, and polishing every frame to create a narrative that captivates and connects."
  },
  {
    category: "Video Production",
    term: "Color Grading",
    definition: "More than just hues and saturation—this is storytelling through color, where every shade sets the mood and every highlight whispers a deeper emotion."
  },
  {
    category: "Video Production",
    term: "Cinematography",
    definition: "The art of capturing light, motion, and meaning—framing the world with intention to turn the ordinary into the unforgettable."
  },
  {
    category: "Video Production",
    term: "Sound Design",
    definition: "Weaving an auditory experience that makes your visuals sing—where every beat, breath, and echo amplifies the story's impact."
  },
  
  // Visual Design
  {
    category: "Visual Design",
    term: "Typography",
    definition: "Letters with attitude. It's more than just font choice—it's how words move, breathe, and carry a brand's voice in every curve and line."
  },
  {
    category: "Visual Design",
    term: "Layout",
    definition: "The invisible conductor of the visual orchestra, guiding the viewer's eye with rhythm and harmony to create balance, clarity, and impact."
  },
  {
    category: "Visual Design",
    term: "Brand Identity",
    definition: "A brand's fingerprint—unique, unmistakable, and instantly recognizable, it's the visual shorthand that tells the world who you are."
  },
  {
    category: "Visual Design",
    term: "User Interface (UI) Design",
    definition: "The art of designing intuitive, beautiful digital spaces—where aesthetics meet functionality, and every click feels effortless."
  },
  
  // Animation
  {
    category: "Animation",
    term: "Keyframe Animation",
    definition: "The blueprint of movement—plotting out the peaks and pauses to give motion its magic and meaning."
  },
  {
    category: "Animation",
    term: "Motion Graphics",
    definition: "The fusion of design and movement—dynamic visuals that inform, entertain, and captivate with every animated frame."
  },
  {
    category: "Animation",
    term: "Rigging",
    definition: "The digital skeleton that brings characters to life—turning static designs into fluid, expressive performers ready for action."
  },
  {
    category: "Animation",
    term: "Frame-by-Frame Animation",
    definition: "The meticulous craft of hand-drawn movement, where every frame is a brushstroke in the dance of visual storytelling."
  },
  
  // Brand Development
  {
    category: "Brand Development",
    term: "Logo Design",
    definition: "The heart of a brand in a single mark—bold, simple, and unforgettable, like a firm handshake that leaves a lasting impression."
  },
  {
    category: "Brand Development",
    term: "Visual Branding",
    definition: "More than colors and logos—it's the entire look and feel that makes a brand instantly familiar, unmistakably you."
  },
  {
    category: "Brand Development",
    term: "Storytelling",
    definition: "The soul of a brand. Every campaign, every tagline, every image builds a narrative that resonates and forms lasting connections."
  },
  {
    category: "Brand Development",
    term: "Brand Strategy",
    definition: "A creative roadmap for carving out a unique space in the market—combining insight, vision, and storytelling to build something iconic."
  }
];

// Helper function to get a random term
export const getRandomTerm = (): TermDefinition => {
  const randomIndex = Math.floor(Math.random() * industryTerms.length);
  return industryTerms[randomIndex];
};
