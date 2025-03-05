import { ContentCollection, TermContent } from '../types';

/**
 * Industry terms collection
 * Contains terminology related to various aspects of media production and brand development
 */
export const industryTerms: ContentCollection<TermContent> = {
  id: 'industryTerms',
  name: 'Industry Terms',
  description: 'Common terminology used in media production and brand development',
  items: [
    // Video Production
    {
      id: 'term1',
      type: 'term',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      category: "Video Production",
      term: "Editing",
      definition: "Sculpting raw footage into a seamless story—snipping, shaping, and polishing every frame to create a narrative that captivates and connects."
    },
    {
      id: 'term2',
      type: 'term',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      category: "Video Production",
      term: "Color Grading",
      definition: "More than just hues and saturation—this is storytelling through color, where every shade sets the mood and every highlight whispers a deeper emotion."
    },
    {
      id: 'term3',
      type: 'term',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      category: "Video Production",
      term: "Cinematography",
      definition: "The art of capturing light, motion, and meaning—framing the world with intention to turn the ordinary into the unforgettable."
    },
    {
      id: 'term4',
      type: 'term',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      category: "Video Production",
      term: "Sound Design",
      definition: "Weaving an auditory experience that makes your visuals sing—where every beat, breath, and echo amplifies the story's impact."
    },
    
    // Digital Marketing
    {
      id: 'term5',
      type: 'term',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      category: "Digital Marketing",
      term: "SEO",
      definition: "The art of visibility—strategic techniques that elevate your content to be found exactly when your audience is searching."
    },
    {
      id: 'term6',
      type: 'term',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      category: "Digital Marketing",
      term: "Content Marketing",
      definition: "A relationship built on value—creating and distributing relevant content that attracts, engages, and builds lasting connections."
    },
    {
      id: 'term7',
      type: 'term',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      category: "Digital Marketing",
      term: "Social Media Strategy",
      definition: "The heartbeat of your online presence—a deliberate approach to platform selection, content creation, and community engagement."
    },
    
    // Brand Development
    {
      id: 'term8',
      type: 'term',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      category: "Brand Development",
      term: "Brand Identity",
      definition: "The soul of your business made tangible—visual and verbal elements woven together to create a distinct personality and lasting impression."
    },
    {
      id: 'term9',
      type: 'term',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      category: "Brand Development",
      term: "Logo Design",
      definition: "The heart of a brand in a single mark—bold, simple, and unforgettable, like a firm handshake that leaves a lasting impression."
    },
    {
      id: 'term10',
      type: 'term',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      category: "Brand Development",
      term: "Visual Branding",
      definition: "More than colors and logos—it's the entire look and feel that makes a brand instantly familiar, unmistakably you."
    },
    {
      id: 'term11',
      type: 'term',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      category: "Brand Development",
      term: "Storytelling",
      definition: "The soul of a brand. Every campaign, every tagline, every image builds a narrative that resonates and forms lasting connections."
    },
    {
      id: 'term12',
      type: 'term',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      category: "Brand Development",
      term: "Brand Strategy",
      definition: "A creative roadmap for carving out a unique space in the market—combining insight, vision, and storytelling to build something iconic."
    }
  ]
}; 