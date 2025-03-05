# Content Management System Migration Guide

This guide provides instructions for migrating existing components to use the new content management system.

## Why Migrate?

The content management system provides several benefits:

1. **Structured Content**: All content follows a consistent format with proper typing
2. **Separation of Concerns**: Content is separated from presentation logic
3. **Maintainability**: Content can be updated without changing component code
4. **Type Safety**: Full TypeScript support for content types
5. **Future-Proof**: Structure is compatible with external CMS integration

## Migration Steps

### Step 1: Wrap your application with ContentProvider

In your main application file (e.g., `_app.tsx` or `App.tsx`), wrap your application with the `ContentProvider`:

```tsx
import { ContentProvider } from '../content';

function MyApp({ Component, pageProps }) {
  return (
    <ContentProvider>
      <Component {...pageProps} />
    </ContentProvider>
  );
}

export default MyApp;
```

### Step 2: Use the Legacy Importers for Backward Compatibility

For a smooth transition, you can use the legacy importers to maintain backward compatibility:

```tsx
// Before
import { slides } from '../data/slides';

function MyComponent() {
  return <Slider slides={slides} />;
}

// After
import { useLegacySlides } from '../content/importer';

function MyComponent() {
  const { slides, isLoading, error } = useLegacySlides('homepageSlides');
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <Slider slides={slides} />;
}
```

### Step 3: Migrate Content to the CMS

Move your content from component files to the appropriate content data files:

1. For slides, move to `src/content/data/slides.ts`
2. For industry terms, move to `src/content/data/terms.ts`
3. For videos, move to `src/content/data/videos.ts`

Use the content type interfaces to ensure your content follows the correct structure.

### Step 4: Update Components to Use the Content API

Once your content is migrated, update your components to use the Content API directly:

```tsx
// Before (using legacy importer)
import { useLegacySlides } from '../content/importer';

function MyComponent() {
  const { slides } = useLegacySlides('homepageSlides');
  return <Slider slides={slides} />;
}

// After (using Content API)
import { useContent, slidesToProps } from '../content';

function MyComponent() {
  const { getCollection, isLoading, error } = useContent();
  const slidesCollection = getCollection('homepageSlides');
  const slides = slidesCollection ? slidesToProps(slidesCollection) : [];
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <Slider slides={slides} />;
}
```

### Step 5: Enhance Components with Content Features

Take advantage of the content system's features to enhance your components:

```tsx
import { useContent, getDistinctCategories } from '../content';

function TermsComponent() {
  const { getCollection, queryContent } = useContent();
  const termsCollection = getCollection('industryTerms');
  
  // Get all categories
  const categories = termsCollection 
    ? getDistinctCategories(termsCollection)
    : [];
  
  // Filter terms by category
  const videoProductionTerms = queryContent('industryTerms', {
    filter: (term) => term.category === 'Video Production'
  });
  
  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category}>{category}</li>
        ))}
      </ul>
      
      <h2>Video Production Terms</h2>
      <ul>
        {videoProductionTerms.map(term => (
          <li key={term.id}>
            <strong>{term.term}</strong>: {term.definition}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Migration Helpers

### One-Time Data Migration

If you need to migrate existing data structures, you can use the `migrateLegacyData` helper:

```tsx
import { migrateLegacyData } from '../content/importer';
import { legacySlides } from '../data/legacy';

// Convert legacy data to the new format
const migratedCollection = migrateLegacyData(legacySlides, 'slide');

// Now you can use this collection in your application
console.log(migratedCollection);
```

## Testing Your Migration

1. Create a test page that uses both the old and new approaches side by side
2. Verify that the content displays correctly in both cases
3. Check that all functionality works as expected
4. Gradually migrate components one by one, testing each step

## Need Help?

If you encounter any issues during migration, refer to:

1. The Content System README (`src/content/README.md`)
2. The demo page (`src/pages/ContentSystemDemo.tsx`)
3. The ContentDemo component (`src/components/ContentDemo.tsx`) 