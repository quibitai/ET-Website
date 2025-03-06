import React, { useState, useEffect } from 'react';
import { useContent, slidesToProps, SlideContent } from '../content';

interface ContentSliderProps {
  collectionId: string;
  autoplay?: boolean;
  interval?: number;
}

/**
 * A slider component that uses the content management system
 */
export const ContentSlider: React.FC<ContentSliderProps> = ({
  collectionId,
  autoplay = false,
  interval = 5000
}) => {
  const { getCollection, isLoading, error } = useContent();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  
  // Get slides from content system
  const slidesCollection = getCollection<SlideContent>(collectionId);
  const slides = slidesCollection ? slidesToProps(slidesCollection) : [];
  
  // Handle autoplay
  useEffect(() => {
    if (!autoplay || slides.length <= 1 || isAnimating) return;
    
    const timer = setTimeout(() => {
      handleNextSlide();
    }, interval);
    
    return () => clearTimeout(timer);
  }, [autoplay, currentSlide, interval, slides.length, isAnimating]);
  
  // Handle slide navigation
  const handlePrevSlide = () => {
    if (isAnimating || slides.length <= 1) return;
    
    setDirection('prev');
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setIsAnimating(false);
    }, 500);
  };
  
  const handleNextSlide = () => {
    if (isAnimating || slides.length <= 1) return;
    
    setDirection('next');
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setIsAnimating(false);
    }, 500);
  };
  
  if (isLoading) {
    return <div className="p-8 text-center">Loading slides...</div>;
  }
  
  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error.message}</div>;
  }
  
  if (slides.length === 0) {
    return <div className="p-8 text-center">No slides found in collection: {collectionId}</div>;
  }
  
  return (
    <div className="relative overflow-hidden">
      {/* Slides */}
      <div className="relative h-[500px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id || index}
            className={`absolute inset-0 flex flex-col items-center justify-center p-8 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ backgroundColor: slide.backgroundColor || '#f8f8f8' }}
          >
            <h2 className="text-4xl font-bold mb-4 text-center" style={{ color: slide.textColor || '#000' }}>
              {slide.title}
            </h2>
            <p className="text-xl max-w-2xl text-center mb-6" style={{ color: slide.textColor || '#000' }}>
              {slide.content}
            </p>
            {slide.ctaText && (
              <a
                href={slide.ctaLink || '#'}
                className="px-6 py-3 bg-black text-[#F5F5F5] rounded-md hover:bg-gray-800 transition-colors"
              >
                {slide.ctaText}
              </a>
            )}
          </div>
        ))}
      </div>
      
      {/* Navigation */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-black' : 'bg-gray-300'
              }`}
              onClick={() => {
                setDirection(index > currentSlide ? 'next' : 'prev');
                setCurrentSlide(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
      
      {/* Arrow Navigation */}
      {slides.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#F5F5F5]/80 flex items-center justify-center z-20 hover:bg-[#F5F5F5] transition-colors"
            onClick={handlePrevSlide}
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#F5F5F5]/80 flex items-center justify-center z-20 hover:bg-[#F5F5F5] transition-colors"
            onClick={handleNextSlide}
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}; 