import React from 'react';
import { ContentProvider, ContentDemo } from '../content';
import Header from '../components/Header';
import { ContentSlider } from '../components/ContentSlider';

/**
 * Demo page for the content management system
 */
export default function ContentSystemDemo() {
  return (
    <ContentProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-white">
          <div className="container mx-auto py-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Content Management System</h1>
                <p className="text-lg text-gray-700">
                  This page demonstrates the content management system capabilities. 
                  The CMS provides a structured approach to managing content across the application.
                </p>
              </div>
              
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Content Slider Demo</h2>
                <p className="mb-4">This slider uses the content management system to retrieve and display slides:</p>
                <ContentSlider collectionId="homepageSlides" autoplay={true} interval={5000} />
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border mb-8">
                <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Structured content with TypeScript type safety</li>
                  <li>Content collections for organizing related items</li>
                  <li>Content querying with filtering and sorting</li>
                  <li>Metadata for SEO and content organization</li>
                  <li>Utility functions for working with content</li>
                  <li>Backward compatibility with existing components</li>
                </ul>
              </div>
              
              <ContentDemo />
            </div>
          </div>
        </main>
        
        <footer className="bg-black text-white py-8">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <p className="text-center">
                Content Management System Demo &copy; {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ContentProvider>
  );
} 