# Content Management System Architecture

## Overview

The content management system (CMS) provides a structured approach to managing content across the application. It separates content from presentation, making it easier to maintain, update, and reuse content throughout the application.

## Architecture

The CMS is built with a modular architecture that consists of the following components:

### 1. Type System

The type system defines the structure of content items and collections. It includes:

- **BaseContent**: The base interface for all content types
- **ContentMetadata**: Metadata for content items
- **Content Types**: Specific content type interfaces (TextContent, ImageContent, VideoContent, SlideContent, TermContent)
- **ContentCollection**: Collection of content items
- **ContentQueryOptions**: Options for querying content

### 2. Content Provider

The ContentProvider is a React context provider that manages content state and provides access to content collections and individual content items. It includes:

- **ContentContext**: React context for content
- **ContentProvider**: Provider component that loads and manages content
- **useContent**: Hook for accessing content

### 3. Data Layer

The data layer stores content in structured collections. It includes:

- **slides.ts**: Slide content for sliders
- **terms.ts**: Industry terminology
- **videos.ts**: Video content

### 4. Utility Functions

Utility functions for working with content:

- **Type Guards**: Functions to check content types
- **Conversion Functions**: Convert content to component props
- **Helper Functions**: Format, filter, and transform content

### 5. Legacy Importers

Importers for backward compatibility:

- **useLegacySlides**: Hook for retrieving slides
- **useLegacyRandomTerm**: Hook for retrieving a random term
- **useLegacyPortfolioVideos**: Hook for retrieving portfolio videos
- **useLegacyBackgroundVideos**: Hook for retrieving background videos
- **migrateLegacyData**: Function for migrating legacy data

## Data Flow

1. Content is defined in the data layer
2. ContentProvider loads content on initialization
3. Components use the useContent hook to access content
4. Content is retrieved, filtered, and transformed as needed
5. Components render content using the appropriate format

## Benefits

### 1. Structured Content

All content follows a consistent format with proper typing, making it easier to understand and maintain.

### 2. Separation of Concerns

Content is separated from presentation logic, allowing for independent updates and maintenance.

### 3. Type Safety

Full TypeScript support for content types ensures that content follows the expected structure.

### 4. Maintainability

Content can be updated without changing component code, reducing the risk of introducing bugs.

### 5. Reusability

Content can be reused across different components and pages, reducing duplication.

### 6. Extensibility

New content types and collections can be added easily, allowing the system to grow with the application.

### 7. Future-Proof

The structure is compatible with external CMS integration, making it easier to migrate to a headless CMS in the future.

## Implementation Examples

### Basic Usage

```tsx
import { useContent } from '../content';

function MyComponent() {
  const { getCollection } = useContent();
  const slidesCollection = getCollection('homepageSlides');
  
  return (
    <div>
      <h1>{slidesCollection?.name}</h1>
      <p>{slidesCollection?.description}</p>
      {/* Render content */}
    </div>
  );
}
```

### Advanced Usage

```tsx
import { useContent, slidesToProps } from '../content';

function MyComponent() {
  const { queryContent } = useContent();
  
  // Get published slides sorted by order
  const slides = queryContent('homepageSlides', {
    filter: (content) => content.metadata.published === true,
    sortBy: 'metadata.order',
    sortDirection: 'asc'
  });
  
  return (
    <div>
      {/* Render slides */}
    </div>
  );
}
```

## Future Enhancements

1. **External CMS Integration**: Connect to a headless CMS like Contentful, Sanity, or Strapi
2. **Content Versioning**: Track changes to content over time
3. **Content Localization**: Support for multiple languages
4. **Content Scheduling**: Publish and unpublish content based on date/time
5. **Content Relationships**: Define relationships between content items
6. **Content Analytics**: Track content performance
7. **Content Workflows**: Define approval workflows for content updates