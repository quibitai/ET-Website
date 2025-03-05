import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Content,
  ContentCollection,
  BaseContent,
  ContentQueryOptions
} from './types';
import * as contentData from './data';

// Define the context interface
interface ContentContextType {
  // Collections and items retrieval
  getCollection: <T extends BaseContent>(id: string) => ContentCollection<T> | null;
  getContent: <T extends BaseContent>(collectionId: string, contentId: string) => T | null;
  getRandomContent: <T extends BaseContent>(collectionId: string) => T | null;
  
  // Content queries
  queryContent: <T extends BaseContent>(
    collectionId: string,
    options?: ContentQueryOptions
  ) => T[];
  
  // State information
  isLoading: boolean;
  error: Error | null;
}

// Create the context with a default value
const ContentContext = createContext<ContentContextType>({
  getCollection: () => null,
  getContent: () => null,
  getRandomContent: () => null,
  queryContent: () => [],
  isLoading: false,
  error: null
});

// Provider props interface
interface ContentProviderProps {
  children: ReactNode;
}

// Provider component
export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [collections, setCollections] = useState<Record<string, ContentCollection<any>>>({});

  useEffect(() => {
    // Initial load of content data
    const loadContent = async () => {
      try {
        setIsLoading(true);
        // Get all exported collections from the data directory
        const allCollections: Record<string, ContentCollection<any>> = {};
        
        // Loop through all exported collections
        Object.entries(contentData).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            // If it's an array, convert to collection format
            value.forEach((collection: ContentCollection<any>) => {
              allCollections[collection.id] = collection;
            });
          } else if (typeof value === 'object' && value !== null && 'id' in value) {
            // If it's a single collection object
            const collection = value as ContentCollection<any>;
            allCollections[collection.id] = collection;
          }
        });
        
        setCollections(allCollections);
        setError(null);
      } catch (err) {
        console.error('Error loading content:', err);
        setError(err instanceof Error ? err : new Error('Unknown error loading content'));
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  /**
   * Get a content collection by ID
   */
  const getCollection = <T extends BaseContent>(id: string): ContentCollection<T> | null => {
    const collection = collections[id] as ContentCollection<T> | undefined;
    return collection || null;
  };

  /**
   * Get a specific content item by collection ID and content ID
   */
  const getContent = <T extends BaseContent>(
    collectionId: string,
    contentId: string
  ): T | null => {
    const collection = getCollection<T>(collectionId);
    if (!collection) return null;

    const content = collection.items.find(item => item.id === contentId) as T | undefined;
    return content || null;
  };

  /**
   * Get a random content item from a collection
   */
  const getRandomContent = <T extends BaseContent>(collectionId: string): T | null => {
    const collection = getCollection<T>(collectionId);
    if (!collection || collection.items.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * collection.items.length);
    return collection.items[randomIndex] as T;
  };

  /**
   * Query content items from a collection with filtering and sorting options
   */
  const queryContent = <T extends BaseContent>(
    collectionId: string,
    options: ContentQueryOptions = {}
  ): T[] => {
    const collection = getCollection<T>(collectionId);
    if (!collection) return [];

    let results = [...collection.items] as T[];

    // Apply type filter if specified
    if (options.type) {
      results = results.filter(item => item.type === options.type) as T[];
    }

    // Apply custom filter if provided
    if (options.filter) {
      results = results.filter(item => options.filter!(item as unknown as Content)) as T[];
    }

    // Apply sorting
    if (options.sortBy) {
      results.sort((a, b) => {
        // Safely access nested properties
        const getSortValue = (obj: any, path: string) => {
          const parts = path.split('.');
          let value = obj;
          for (const part of parts) {
            if (value === null || value === undefined) return null;
            value = value[part];
          }
          return value;
        };

        const aValue = getSortValue(a, options.sortBy as string);
        const bValue = getSortValue(b, options.sortBy as string);

        if (aValue === bValue) return 0;
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        // Sort based on direction
        const direction = options.sortDirection === 'desc' ? -1 : 1;
        return aValue < bValue ? -1 * direction : 1 * direction;
      });
    }

    // Apply pagination
    if (options.offset !== undefined || options.limit !== undefined) {
      const offset = options.offset || 0;
      const limit = options.limit === undefined ? results.length : options.limit;
      results = results.slice(offset, offset + limit);
    }

    return results;
  };

  const value = {
    getCollection,
    getContent,
    getRandomContent,
    queryContent,
    isLoading,
    error
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};

// Custom hook for using the content context
export const useContent = () => useContext(ContentContext); 