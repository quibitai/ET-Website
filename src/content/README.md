# Content Management System

This directory contains the content management system (CMS) for the ET-Website. The CMS provides a structured approach to managing content across the application, making it easier to update and maintain.

## Components

### ContentProvider

The main provider component that manages content state and provides access to content collections and individual content items.

## Hooks

### useContent

The main hook for accessing content. Provides methods for retrieving content collections, individual content items, and querying content.

## Types

The CMS includes a type system for content:

- `BaseContent` - Base interface for all content types
- `ContentMetadata` - Metadata for SEO and content organization
- `TextContent` - Text content with formatting options
- `ImageContent` - Image content with alt text and dimensions
- `VideoContent` - Video content with sources and player options
- `SlideContent` - Slide content for slider components
- `TermContent` - Industry term with category and definition
- `Content` - Union type of all content types
- `ContentCollection` - Collection of content items with metadata
- `ContentQueryOptions` - Options for querying content

## Data

Content is organized into collections in the `data` directory:

- `slides.ts` - Slider content for different sections
- `terms.ts` - Industry terminology
- `videos.ts` - Video content for the portfolio and backgrounds

## Utilities

Various utility functions for working with content:

- Type guards for checking content types
- Conversion functions for component props
- Formatting helpers
- Filter functions
- Category extraction
- Placeholder generation

## Usage

```tsx
import { useContent, slidesToProps } from '../content';

const MyComponent = () => {
  const { getCollection, getRandomContent } = useContent();
  
  // Get a collection
  const slidesCollection = getCollection('homepageSlides');
  
  // Convert to props for Slider component
  const slides = slidesCollection ? slidesToProps(slidesCollection) : [];
  
  // Get a random term
  const randomTerm = getRandomContent('industryTerms');
  
  return (
    <div>
      <Slider slides={slides} />
      {randomTerm && <IndustryTerm term={randomTerm.term} definition={randomTerm.definition} />}
    </div>
  );
};
```

## Benefits

1. **Structured Content**: Consistent format for all content types
2. **Type Safety**: Full TypeScript support for content
3. **Separation of Concerns**: Content is separate from components
4. **Maintainability**: Easy to update content without changing components
5. **Extensibility**: Simple to add new content types or collections
6. **Reusability**: Content can be reused across different components and pages
7. **Future-Proof**: Structure is compatible with external CMS integration 