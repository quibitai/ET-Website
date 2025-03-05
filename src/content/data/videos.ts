import { ContentCollection, VideoContent } from '../types';

/**
 * Portfolio videos collection
 */
export const portfolioVideos: ContentCollection<VideoContent> = {
  id: 'portfolioVideos',
  name: 'Portfolio Videos',
  description: 'Showcase of our best video work',
  items: [
    {
      id: 'video1',
      type: 'video',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      src: '/videos/brand-story.mp4',
      poster: '/images/posters/brand-story.jpg',
      duration: 124, // seconds
      controls: true,
      metadata: {
        title: 'Brand Story',
        description: 'A compelling visual narrative showcasing the journey of a startup',
        keywords: ['brand', 'storytelling', 'startup'],
        featured: true,
        order: 1
      }
    },
    {
      id: 'video2',
      type: 'video',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      src: '/videos/product-launch.mp4',
      poster: '/images/posters/product-launch.jpg',
      duration: 87, // seconds
      controls: true,
      metadata: {
        title: 'Product Launch',
        description: 'Dynamic product reveal for a tech company',
        keywords: ['product', 'launch', 'tech'],
        featured: true,
        order: 2
      }
    },
    {
      id: 'video3',
      type: 'video',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      src: '/videos/behind-scenes.mp4',
      poster: '/images/posters/behind-scenes.jpg',
      duration: 156, // seconds
      controls: true,
      metadata: {
        title: 'Behind the Scenes',
        description: 'A look into our creative process and production workflow',
        keywords: ['behind the scenes', 'production', 'creative process'],
        featured: false,
        order: 3
      }
    }
  ]
};

/**
 * Ambient background videos
 */
export const backgroundVideos: ContentCollection<VideoContent> = {
  id: 'backgroundVideos',
  name: 'Background Videos',
  description: 'Ambient videos for website backgrounds',
  items: [
    {
      id: 'bg1',
      type: 'video',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      src: '/videos/ambient/creative-process.mp4',
      autoplay: true,
      loop: true,
      muted: true,
      controls: false,
      metadata: {
        title: 'Creative Process',
        description: 'Ambient footage of creative work in progress',
        order: 1
      }
    },
    {
      id: 'bg2',
      type: 'video',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      src: '/videos/ambient/studio.mp4',
      autoplay: true,
      loop: true,
      muted: true,
      controls: false,
      metadata: {
        title: 'Studio Environment',
        description: 'Footage of our studio space',
        order: 2
      }
    }
  ]
}; 