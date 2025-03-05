/**
 * Core content types for the CMS architecture
 */

// Base content interface that all content types extend
export interface BaseContent {
  id: string;        // Unique identifier
  type: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  metadata: ContentMetadata;
}

// Metadata for SEO and content organization
export interface ContentMetadata {
  order?: number;
  published: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  [key: string]: any; // Allow for additional metadata properties
}

// Text content with formatting options
export interface TextContent extends BaseContent {
  type: 'text';
  text: string;
  formatting?: 'plain' | 'markdown' | 'html';
}

// Image content with alt text and dimensions
export interface ImageContent extends BaseContent {
  type: 'image';
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

// Video content with sources and player options
export interface VideoContent extends BaseContent {
  type: 'video';
  src: string;
  poster?: string;
  duration: number;
  controls: boolean;
  metadata: ContentMetadata & {
    title?: string;
    description?: string;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
  };
}

// Slide for the slider component
export interface SlideContent extends BaseContent {
  type: 'slide';
  title: string;
  content: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
  metadata: ContentMetadata & {
    backgroundColor?: string;
    textColor?: string;
  };
}

// Industry term with category and definition
export interface TermContent extends BaseContent {
  type: 'term';
  term: string;
  definition: string;
  category: string;
}

// Union type of all content types
export type Content = 
  | TextContent
  | ImageContent
  | VideoContent
  | SlideContent
  | TermContent;

// Content collection with metadata
export interface ContentCollection<T extends BaseContent = Content> {
  id: string;
  name: string;
  description: string;
  items: T[];
}

// Content query options
export interface ContentQueryOptions {
  type?: string;
  limit?: number;
  offset?: number;
  sortBy?: keyof BaseContent | string;
  sortDirection?: 'asc' | 'desc';
  filter?: (content: Content) => boolean;
} 