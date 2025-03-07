import React from 'react';
import ContentDisplay from '../components/ContentDisplay';
import Header from '../components/Header';

// Demo content items
const demoItems = [
  {
    title: "Every brand has a story worth telling",
    content: "We bring together the brand designers and visual storytellers, the artists and the filmmakers, the illustrators, animators, writers, the editors...throw them into the creative sandbox, and make some magic happen.",
    highlightedText: "telling well"
  },
  {
    title: "Visual Storytelling",
    subtitle: "Making Your Brand Memorable",
    content: "Our creative team specializes in crafting visual narratives that resonate with your audience and leave a lasting impression. We believe in the power of telling your story in a way that's authentic, engaging, and visually stunning."
  },
  {
    title: "Brand Strategy & Design",
    content: "From concept development to final execution, we create comprehensive brand identities that tell your unique story. Our approach focuses on strategic thinking and creative excellence to build memorable brands.",
    highlightedText: "comprehensive"
  },
  {
    title: "Content that Converts",
    subtitle: "Beyond Just Looking Good",
    content: "We create content that not only captures attention but drives action. By understanding your audience and objectives, we craft messages that connect emotionally and rationally with your customers."
  }
];

/**
 * Demo page for the ContentDisplay component
 */
export default function ContentDisplayDemo() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-[#F5F5F5] py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">Content Display Demo</h1>
            <p className="text-lg text-center mb-12">
              A simple, elegant content display component with centered navigation arrows
            </p>
            
            <ContentDisplay items={demoItems} className="mb-16" />
            
            <div className="mt-12 bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">About This Component</h2>
              <p className="mb-4">
                The ContentDisplay component is designed to showcase content with easy navigation. 
                Key features include:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>Centered navigation arrows for intuitive browsing</li>
                <li>Support for titles, subtitles, and content with highlighted text</li>
                <li>Responsive design that works on all screen sizes</li>
                <li>Keyboard navigation with left/right arrow keys</li>
                <li>Theme compatibility (light, dark, and retro modes)</li>
              </ul>
              
              <p>
                This component is ideal for showcasing testimonials, features, services, or any 
                content that benefits from sequential navigation.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 