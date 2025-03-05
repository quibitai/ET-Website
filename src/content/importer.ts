import { useEffect } from 'react';
import { useContent } from './ContentContext';
import { 
  ContentCollection, 
  SlideContent, 
  TermContent, 
  VideoContent 
} from './types';
import { slidesToProps } from './utils';

/**
 * Legacy importer hook for helping components transition to the content system
 * This provides backward compatibility for components that haven't been updated yet
 */
export const useLegacySlides = (collectionId: string) => {
  const { getCollection, isLoading, error } = useContent();
  const collection = getCollection<SlideContent>(collectionId);
  const slides = collection ? slidesToProps(collection) : [];

  return { 
    slides, 
    isLoading, 
    error 
  };
};

/**
 * Legacy importer hook for retrieving a random term
 */
export const useLegacyRandomTerm = () => {
  const { getRandomContent, isLoading, error } = useContent();
  const randomTerm = getRandomContent<TermContent>('industryTerms');

  return {
    term: randomTerm?.term || '',
    definition: randomTerm?.definition || '',
    category: randomTerm?.category || '',
    isLoading,
    error
  };
};

/**
 * Legacy importer hook for retrieving portfolio videos
 */
export const useLegacyPortfolioVideos = () => {
  const { getCollection, isLoading, error } = useContent();
  const collection = getCollection<VideoContent>('portfolioVideos');
  const videos = collection?.items || [];

  return {
    videos,
    isLoading,
    error
  };
};

/**
 * Legacy importer hook for retrieving background videos
 */
export const useLegacyBackgroundVideos = () => {
  const { getCollection, isLoading, error } = useContent();
  const collection = getCollection<VideoContent>('backgroundVideos');
  const videos = collection?.items || [];

  return {
    videos,
    isLoading,
    error
  };
};

/**
 * Helper function to migrate from legacy data structures
 * This can be used for one-time migrations when integrating with the CMS
 */
export const migrateLegacyData = (
  data: any, 
  type: 'slide' | 'term' | 'video'
): ContentCollection<any> => {
  switch (type) {
    case 'slide':
      return {
        id: 'migratedSlides',
        name: 'Migrated Slides',
        description: 'Automatically migrated from legacy data',
        items: data.map((item: any, index: number) => ({
          id: `slide-${index}`,
          type: 'slide',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          title: item.title || '',
          content: item.content || '',
          image: item.image || null,
          ctaText: item.ctaText || '',
          ctaLink: item.ctaLink || '',
          metadata: {
            order: index,
            published: true
          }
        }))
      };
    case 'term':
      return {
        id: 'migratedTerms',
        name: 'Migrated Terms',
        description: 'Automatically migrated from legacy data',
        items: data.map((item: any, index: number) => ({
          id: `term-${index}`,
          type: 'term',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          term: item.term || '',
          definition: item.definition || '',
          category: item.category || 'General',
          metadata: {
            order: index,
            published: true
          }
        }))
      };
    case 'video':
      return {
        id: 'migratedVideos',
        name: 'Migrated Videos',
        description: 'Automatically migrated from legacy data',
        items: data.map((item: any, index: number) => ({
          id: `video-${index}`,
          type: 'video',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          src: item.src || '',
          poster: item.poster || '',
          duration: item.duration || 0,
          controls: item.controls !== undefined ? item.controls : true,
          metadata: {
            order: index,
            published: true,
            autoplay: item.autoplay || false,
            loop: item.loop || false,
            muted: item.muted || false,
            title: item.title || '',
            description: item.description || ''
          }
        }))
      };
    default:
      throw new Error(`Unknown type: ${type}`);
  }
}; 