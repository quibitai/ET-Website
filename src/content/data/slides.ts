import { ContentCollection, SlideContent } from '../types';

/**
 * Homepage slides collection
 */
export const homepageSlides: ContentCollection<SlideContent> = {
  id: 'homepageSlides',
  name: 'Homepage Slides',
  description: 'Slides for the homepage slider',
  items: [
    {
      id: 'slide-1',
      type: 'slide',
      createdAt: '2023-06-15T12:00:00Z',
      updatedAt: '2023-06-15T12:00:00Z',
      title: 'Crafting Visual Stories',
      content: 'We transform ideas into compelling visual narratives that resonate with your audience.',
      ctaText: 'View Our Work',
      ctaLink: '/portfolio',
      metadata: {
        order: 1,
        published: true,
        backgroundColor: '#000000',
        textColor: '#ffffff'
      }
    },
    {
      id: 'slide-2',
      type: 'slide',
      createdAt: '2023-06-15T12:00:00Z',
      updatedAt: '2023-06-15T12:00:00Z',
      title: 'Brand Development',
      content: 'Strategic brand development that captures your essence and connects with your target audience.',
      ctaText: 'Learn More',
      ctaLink: '/services',
      metadata: {
        order: 2,
        published: true,
        backgroundColor: '#f8f8f8',
        textColor: '#000000'
      }
    },
    {
      id: 'slide-3',
      type: 'slide',
      createdAt: '2023-06-15T12:00:00Z',
      updatedAt: '2023-06-15T12:00:00Z',
      title: 'Video Production',
      content: 'Full-service video production from concept to final delivery, tailored to your specific needs.',
      image: '/images/video-production.jpg',
      ctaText: 'Contact Us',
      ctaLink: '/contact',
      metadata: {
        order: 3,
        published: true,
        backgroundColor: '#2a2a2a',
        textColor: '#ffffff'
      }
    }
  ]
};

/**
 * Services slider collection
 */
export const servicesSlides: ContentCollection<SlideContent> = {
  id: 'servicesSlides',
  name: 'Services Slides',
  description: 'Slides for the services section',
  items: [
    {
      id: 'service-1',
      type: 'slide',
      createdAt: '2023-06-15T12:00:00Z',
      updatedAt: '2023-06-15T12:00:00Z',
      title: 'Video Production',
      content: 'From concept to final delivery, we handle every aspect of video production with precision and creativity.',
      image: '/images/services/video-production.jpg',
      ctaText: 'Learn More',
      ctaLink: '/services/video-production',
      metadata: {
        order: 1,
        published: true,
        backgroundColor: '#f5f5f5',
        textColor: '#333333'
      }
    },
    {
      id: 'service-2',
      type: 'slide',
      createdAt: '2023-06-15T12:00:00Z',
      updatedAt: '2023-06-15T12:00:00Z',
      title: 'Brand Development',
      content: 'We create comprehensive brand identities that communicate your values and connect with your audience.',
      image: '/images/services/brand-development.jpg',
      ctaText: 'Learn More',
      ctaLink: '/services/brand-development',
      metadata: {
        order: 2,
        published: true,
        backgroundColor: '#e8e8e8',
        textColor: '#333333'
      }
    },
    {
      id: 'service-3',
      type: 'slide',
      createdAt: '2023-06-15T12:00:00Z',
      updatedAt: '2023-06-15T12:00:00Z',
      title: 'Content Strategy',
      content: 'Strategic content planning that aligns with your business goals and resonates with your target audience.',
      image: '/images/services/content-strategy.jpg',
      ctaText: 'Learn More',
      ctaLink: '/services/content-strategy',
      metadata: {
        order: 3,
        published: true,
        backgroundColor: '#f0f0f0',
        textColor: '#333333'
      }
    },
    {
      id: 'service-4',
      type: 'slide',
      createdAt: '2023-06-15T12:00:00Z',
      updatedAt: '2023-06-15T12:00:00Z',
      title: 'Post-Production',
      content: 'Expert editing, color grading, and visual effects to elevate your video content to the highest quality.',
      image: '/images/services/post-production.jpg',
      ctaText: 'Learn More',
      ctaLink: '/services/post-production',
      metadata: {
        order: 4,
        published: true,
        backgroundColor: '#e0e0e0',
        textColor: '#333333'
      }
    }
  ]
}; 