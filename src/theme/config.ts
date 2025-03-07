/**
 * Theme Configuration
 */

// Base colors with standard, grayscale and retro variants
export const COLORS = {
  // Primary brand color
  primary: {
    standard: {
      light: '#FF3B31',
      dark: '#FF7A6E',
    },
    grayscale: {
      light: '#333333',  // Dark gray in light mode
      dark: '#DDDDDD',   // Light gray in dark mode
    },
    retro: {
      light: '#7FFF00',
      dark: '#00FF7F',
    }
  },
  
  // Background colors
  background: {
    standard: {
      light: '#F5F5F5',
      dark: '#16192E',
    },
    grayscale: {
      light: '#F0F0F0',  // Very light gray
      dark: '#222222',   // Very dark gray
    },
    retro: {
      light: '#0000AA',
      dark: '#000077',
    }
  },
  
  // Text colors
  text: {
    standard: {
      light: '#000000',
      dark: '#FFFFFF',
    },
    grayscale: {
      light: '#333333',  // Dark gray
      dark: '#DDDDDD',   // Light gray
    },
    retro: {
      light: '#00FF00',
      dark: '#00FF00',
    }
  },
  
  // Border colors
  border: {
    standard: {
      light: '#FF3B31',
      dark: '#FF7A6E',
    },
    grayscale: {
      light: '#333333',  // Dark gray
      dark: '#DDDDDD',   // Light gray
    },
    retro: {
      light: '#7FFF00',
      dark: '#00FF7F',
    }
  },
  
  // Grid colors
  grid: {
    standard: {
      light: '#FF3B31',
      dark: '#FFFFFF',
    },
    grayscale: {
      light: '#333333',  // Dark gray
      dark: '#DDDDDD',   // Light gray
    },
    retro: {
      light: '#7FFF00',
      dark: '#00FF7F',
    }
  },
  
  // Highlight colors (for special elements)
  highlight: {
    standard: {
      light: '#FF3B31',
      dark: '#FF7A6E',
    },
    grayscale: {
      light: '#333333',  // Dark gray
      dark: '#DDDDDD',   // Light gray
    },
    retro: {
      light: '#FFFF00',
      dark: '#FFFF00',
    }
  },
  
  // Accent colors (for buttons, links, etc)
  accent: {
    standard: {
      light: '#FF3B31',
      dark: '#FF7A6E',
    },
    grayscale: {
      light: '#333333',  // Dark gray
      dark: '#DDDDDD',   // Light gray
    },
    retro: {
      light: '#00FFFF',
      dark: '#00FFFF',
    }
  }
};

// Grid element opacity
export const GRID_OPACITY = {
  standard: {
    light: 0.5,
    dark: 0.3,
  },
  grayscale: {
    light: 0.7,
    dark: 0.4,
  },
  retro: 1.0,
};

// These classes are essential for each visual mode
export const MODE_CLASSES = {
  standard: [],
  grayscale: ['grayscale-mode-new'], // Update to new class name to avoid conflicts
  retro: ['retro-mode'],
};

// CSS variable mapping for theme tokens
export const CSS_VARS = {
  // Primary color tokens
  '--color-primary': 'var(--color-primary)',
  '--color-primary-light': 'var(--color-primary-light)',
  '--color-primary-dark': 'var(--color-primary-dark)',
  
  // Background tokens
  '--color-bg': 'var(--color-bg)',
  '--color-bg-offset': 'var(--color-bg-offset)',
  
  // Text tokens
  '--color-text': 'var(--color-text)',
  '--color-text-offset': 'var(--color-text-offset)',
  
  // Border tokens
  '--color-border': 'var(--color-border)',
}; 