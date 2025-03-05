import React, { useState } from 'react';
import { useContent } from '../content/ContentContext';
import { slidesToProps, termToProps, getDistinctCategories } from '../content/utils';
import { SlideContent, TermContent, VideoContent } from '../content/types';

/**
 * Demo component showcasing the content management system
 */
export const ContentDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'slides' | 'terms' | 'videos'>('slides');
  const { 
    getCollection, 
    getContent, 
    getRandomContent,
    queryContent,
    isLoading, 
    error 
  } = useContent();

  const slidesCollection = getCollection<SlideContent>('homepageSlides');
  const termsCollection = getCollection<TermContent>('industryTerms');
  const videosCollection = getCollection<VideoContent>('portfolioVideos');
  
  // Get all categories from terms
  const categories = termsCollection 
    ? getDistinctCategories(termsCollection)
    : [];
    
  // State for category filter
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories.length > 0 ? categories[0] : ''
  );
  
  // Filter terms by category
  const filteredTerms = termsCollection?.items.filter(
    term => term.category === selectedCategory
  ) || [];
  
  if (isLoading) {
    return <div className="p-8 text-center">Loading content...</div>;
  }
  
  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error.message}</div>;
  }
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Content Management System Demo</h1>
      
      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button 
          className={`px-4 py-2 ${activeTab === 'slides' ? 'border-b-2 border-black font-bold' : 'text-gray-500'}`}
          onClick={() => setActiveTab('slides')}
        >
          Slides
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'terms' ? 'border-b-2 border-black font-bold' : 'text-gray-500'}`}
          onClick={() => setActiveTab('terms')}
        >
          Industry Terms
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'videos' ? 'border-b-2 border-black font-bold' : 'text-gray-500'}`}
          onClick={() => setActiveTab('videos')}
        >
          Videos
        </button>
      </div>
      
      {/* Slides Content */}
      {activeTab === 'slides' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Slides Collection</h2>
          
          {slidesCollection ? (
            <div className="space-y-6">
              <div className="bg-gray-100 p-4 rounded">
                <h3 className="font-medium mb-2">Collection Metadata</h3>
                <p><strong>ID:</strong> {slidesCollection.id}</p>
                <p><strong>Name:</strong> {slidesCollection.name}</p>
                <p><strong>Description:</strong> {slidesCollection.description}</p>
                <p><strong>Item Count:</strong> {slidesCollection.items.length}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Slides Items</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {slidesCollection.items.map(slide => (
                    <div key={slide.id} className="border p-4 rounded">
                      <h4 className="font-bold">{slide.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">ID: {slide.id}</p>
                      <p>{slide.content}</p>
                      {slide.image && (
                        <div className="mt-2 bg-gray-200 h-32 flex items-center justify-center">
                          <p className="text-sm text-gray-600">Image: {slide.image}</p>
                        </div>
                      )}
                      {slide.ctaText && (
                        <div className="mt-2">
                          <button className="px-4 py-1 bg-black text-white text-sm rounded">
                            {slide.ctaText}
                          </button>
                          <p className="text-xs text-gray-500 mt-1">Links to: {slide.ctaLink}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p>No slides collection found.</p>
          )}
        </div>
      )}
      
      {/* Terms Content */}
      {activeTab === 'terms' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Industry Terms Collection</h2>
          
          {termsCollection ? (
            <div className="space-y-6">
              <div className="bg-gray-100 p-4 rounded">
                <h3 className="font-medium mb-2">Collection Metadata</h3>
                <p><strong>ID:</strong> {termsCollection.id}</p>
                <p><strong>Name:</strong> {termsCollection.name}</p>
                <p><strong>Description:</strong> {termsCollection.description}</p>
                <p><strong>Categories:</strong> {categories.join(', ')}</p>
                <p><strong>Item Count:</strong> {termsCollection.items.length}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Filter by Category</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`px-3 py-1 rounded text-sm ${
                        selectedCategory === category
                          ? 'bg-black text-white'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                <h3 className="font-medium mb-2">Terms in "{selectedCategory}"</h3>
                <div className="space-y-4">
                  {filteredTerms.map(term => (
                    <div key={term.id} className="border p-4 rounded">
                      <h4 className="font-bold">{term.term}</h4>
                      <p className="text-sm text-gray-600 mb-2">Category: {term.category}</p>
                      <p>{term.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p>No terms collection found.</p>
          )}
        </div>
      )}
      
      {/* Videos Content */}
      {activeTab === 'videos' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Videos Collection</h2>
          
          {videosCollection ? (
            <div className="space-y-6">
              <div className="bg-gray-100 p-4 rounded">
                <h3 className="font-medium mb-2">Collection Metadata</h3>
                <p><strong>ID:</strong> {videosCollection.id}</p>
                <p><strong>Name:</strong> {videosCollection.name}</p>
                <p><strong>Description:</strong> {videosCollection.description}</p>
                <p><strong>Item Count:</strong> {videosCollection.items.length}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Video Items</h3>
                <div className="space-y-4">
                  {videosCollection.items.map(video => (
                    <div key={video.id} className="border p-4 rounded">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="bg-gray-200 w-full md:w-64 h-40 flex items-center justify-center">
                          <p className="text-sm text-gray-600">
                            {video.poster ? 'Poster Image' : 'Video Preview'}
                          </p>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold">{video.metadata?.title || video.id}</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Duration: {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                          </p>
                          <p>{video.metadata?.description || 'No description available'}</p>
                          <div className="mt-4 flex gap-2">
                            <div className={`px-2 py-1 text-xs rounded ${video.metadata?.autoplay ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                              {video.metadata?.autoplay ? 'Autoplay' : 'No Autoplay'}
                            </div>
                            <div className={`px-2 py-1 text-xs rounded ${video.metadata?.loop ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                              {video.metadata?.loop ? 'Loop' : 'No Loop'}
                            </div>
                            <div className={`px-2 py-1 text-xs rounded ${video.metadata?.muted ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                              {video.metadata?.muted ? 'Muted' : 'With Sound'}
                            </div>
                            <div className={`px-2 py-1 text-xs rounded ${video.controls ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                              {video.controls ? 'With Controls' : 'No Controls'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p>No videos collection found.</p>
          )}
        </div>
      )}
    </div>
  );
}; 