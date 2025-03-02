import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import { vi } from 'vitest';

// Import components to test
import Header from '../components/Header';
import Slider from '../components/Slider';
import IntroAnimation from '../components/IntroAnimation';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => {
  const actual = vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
      h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
      span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

// Wrapper for theme provider
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
    {children}
  </ThemeProvider>
);

describe('Header Component', () => {
  test('renders the logo', () => {
    render(<Header />, { wrapper: ThemeWrapper });
    expect(screen.getByText('echotango')).toBeInTheDocument();
  });

  test('toggle button has correct aria-label', () => {
    render(<Header />, { wrapper: ThemeWrapper });
    const toggleButton = screen.getByRole('button', { name: /toggle .* mode/i });
    expect(toggleButton).toBeInTheDocument();
  });
});

describe('Slider Component', () => {
  const mockSlides = [
    {
      title: 'Test Title 1',
      titleBold: 'Bold Part 1',
      description: 'Description 1'
    },
    {
      title: 'Test Title 2',
      titleBold: 'Bold Part 2',
      description: 'Description 2'
    }
  ];

  test('renders the first slide by default', () => {
    render(<Slider slides={mockSlides} />);
    expect(screen.getByText('Test Title 1')).toBeInTheDocument();
    expect(screen.getByText('Bold Part 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
  });

  test('navigation buttons have correct aria-labels', () => {
    render(<Slider slides={mockSlides} />);
    expect(screen.getByRole('button', { name: /previous slide/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next slide/i })).toBeInTheDocument();
  });

  test('clicking next button changes to the next slide', async () => {
    render(<Slider slides={mockSlides} />);
    const nextButton = screen.getByRole('button', { name: /next slide/i });
    
    fireEvent.click(nextButton);
    
    // Wait for the slide transition to complete
    await waitFor(() => {
      expect(screen.getByText('Test Title 2')).toBeInTheDocument();
      expect(screen.getByText('Bold Part 2')).toBeInTheDocument();
      expect(screen.getByText('Description 2')).toBeInTheDocument();
    }, { timeout: 500 });
  });
});

describe('IntroAnimation Component', () => {
  test('calls onAnimationComplete callback', async () => {
    const mockOnAnimationComplete = vi.fn();
    
    render(<IntroAnimation onAnimationComplete={mockOnAnimationComplete} />);
    
    // Wait for the animation to complete and callback to be called
    await waitFor(() => {
      expect(mockOnAnimationComplete).toHaveBeenCalled();
    }, { timeout: 4000 });
  });

  test('renders the logo text', () => {
    render(<IntroAnimation onAnimationComplete={() => {}} />);
    expect(screen.getByText('echotango')).toBeInTheDocument();
  });
}); 