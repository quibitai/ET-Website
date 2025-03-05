import { 
  Content, 
  TextContent, 
  ImageContent, 
  VideoContent, 
  SlideContent, 
  TermContent,
  ContentCollection
} from './types';

/**
 * Type guard functions to check content types
 */
export function isTextContent(content: Content): content is TextContent {
  return content.type === 'text';
}

export function isImageContent(content: Content): content is ImageContent {
  return content.type === 'image';
}

export function isVideoContent(content: Content): content is VideoContent {
  return content.type === 'video';
}

export function isSlideContent(content: Content): content is SlideContent {
  return content.type === 'slide';
}

export function isTermContent(content: Content): content is TermContent {
  return content.type === 'term';
}

/**
 * Convert ContentCollection to array format required by components
 */
export function slidesToProps(collection: ContentCollection<SlideContent>) {
  // Sort by order if available
  const sortedSlides = [...collection.items].sort((a, b) => {
    const orderA = a.metadata?.order || 0;
    const orderB = b.metadata?.order || 0;
    return orderA - orderB;
  });

  // Convert to the format expected by the Slider component
  return sortedSlides.map(slide => ({
    id: slide.id,
    title: slide.title,
    content: slide.content,
    image: slide.image,
    ctaText: slide.ctaText,
    ctaLink: slide.ctaLink,
    backgroundColor: slide.metadata?.backgroundColor || '#f8f8f8',
    textColor: slide.metadata?.textColor || '#000000'
  }));
}

/**
 * Convert a term content item to the format expected by the IndustryTerm component
 */
export function termToProps(term: TermContent) {
  return {
    term: term.term,
    definition: term.definition,
    category: term.category
  };
}

/**
 * Format a video duration (in seconds) to MM:SS format
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Filter published content only
 */
export function filterPublished<T extends Content>(items: T[]): T[] {
  return items.filter(item => item.metadata?.published !== false);
}

/**
 * Get distinct categories from a collection of terms
 */
export function getDistinctCategories(collection: ContentCollection<TermContent>): string[] {
  const categories = collection.items.map(item => item.category);
  return [...new Set(categories)].sort();
}

/**
 * Generate a placeholder URL for images
 */
export function getPlaceholderImage(width: number, height: number, text: string = 'Placeholder'): string {
  return `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(text)}`;
} 