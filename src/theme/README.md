# Theme System

This directory contains the new unified theme system for the ET-Website. The theme system provides a consistent way to manage themes across the application, combining color modes (light/dark) and visual modes (standard/grayscale/retro).

## Components

### ThemeProvider

The main provider component that manages theme state and provides context to child components. It combines functionality that was previously spread across multiple providers:

- Light/dark theme management (previously in `next-themes` ThemeProvider)
- Grayscale mode (previously in `GrayscaleProvider`)
- Retro mode (previously in `RetroProvider`)

### BorderFix

A non-visual component that ensures border colors are consistent across different themes and modes. This replaces the previous `DarkModeBorderFix` component with a more robust solution that handles all theme combinations.

## Hooks

### useTheme

The main hook for accessing theme state and methods. Provides:

- `colorMode` - Current color mode ('light', 'dark', 'system')
- `resolvedColorMode` - Actual mode after system preference is applied
- `visualMode` - Current visual mode ('standard', 'grayscale', 'retro')
- `setColorMode` - Method to set color mode
- `toggleColorMode` - Method to toggle between light and dark
- `setVisualMode` - Method to set visual mode
- `toggleGrayscale` - Method to toggle grayscale mode
- `toggleRetro` - Method to toggle retro mode
- Convenience getters: `isGrayscale`, `isRetro`, `isDark`

### useGrayscale and useRetro

Legacy hooks for backward compatibility.

## Configuration

### Types

- `ColorMode` - 'light' | 'dark' | 'system'
- `VisualMode` - 'standard' | 'grayscale' | 'retro'
- `ThemeState` - Combined theme state
- `ThemeContextType` - Theme context type with state and methods

### Configuration Objects

- `COLORS` - Color values for different themes
- `GRID_OPACITY` - Opacity values for grid elements
- `MODE_CLASSES` - CSS classes for different visual modes
- `CSS_VARS` - CSS variable mapping for theme tokens

## Utilities

Various utility functions for working with themes:

- `getBorderColor` - Get border color based on theme state
- `getGridColor` - Get grid color for components like EmptyBox
- `getGridOpacity` - Get grid opacity for components
- `getBackgroundColor` - Get background color for components
- `themedClasses` - Generate Tailwind classes for themed elements

## Migration

The new theme system is available on the `/themed` route. It maintains the exact same visual appearance as the current implementation but with a more robust and unified approach to theme management.

## Usage

```tsx
import { useTheme, getBorderColor } from '../theme';

const MyComponent = () => {
  const { isDark, visualMode, toggleColorMode } = useTheme();
  
  // Get appropriate colors based on theme
  const borderColor = getBorderColor(isDark, visualMode);
  
  return (
    <div className={borderColor}>
      <button onClick={toggleColorMode}>
        Toggle theme
      </button>
    </div>
  );
};
```

## Benefits

1. **Unified API**: All theme-related functionality is accessed through a single context
2. **Type Safety**: Full TypeScript support for theme values and methods
3. **Consistency**: Ensures consistent appearance across different components
4. **Extensibility**: Easily add new visual modes or theme features
5. **Backward Compatibility**: Legacy hooks ensure smooth transition