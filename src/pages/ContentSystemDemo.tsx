import React from 'react';
import { ContentProvider, ContentDemo } from '../content';
import Header from '../components/Header';

/**
 * Demo page for the content management system
 */
export default function ContentSystemDemo() {
  return (
    <ContentProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-[#F5F5F5]">
          <div className="container mx-auto py-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Content Management System</h1>
                <p className="text-lg text-gray-700">
                  This page demonstrates the content management system capabilities. 
                  The CMS provides a structured approach to managing content across the application.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border mb-8">
                <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Centralized content management</li>
                  <li>Type-safe content access</li>
                  <li>Support for multiple content types</li>
                  <li>Dynamic content loading</li>
                  <li>Content caching</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Content Demo</h2>
                <p className="mb-4">Below is a demonstration of content loaded from the CMS:</p>
                <ContentDemo />
              </div>
            </div>
          </div>
        </main>
      </div>
    </ContentProvider>
  );
} 