# Grid Architecture

This directory contains the new grid architecture for the ET-Website. The architecture is designed to maintain the exact same visual appearance as the current implementation while providing a more structured and maintainable foundation for future development.

## Components

### GridContainer

A simple container component that wraps grid items and provides consistent styling.

### GridItem

Represents a cell or span of cells in the 3x3 grid. It includes position metadata and handles styling for borders and content.

### GridLayout

The main component that renders the grid based on a configuration. It maps component types to their respective components and handles the layout.

## Configuration

The grid layout is defined in `gridConfig.ts`. This file contains:

- Type definitions for grid components
- Configuration interface for grid items
- Default grid layout configuration
- Helper functions for determining width based on position

## Usage

To use the grid architecture, import the `GridLayout` component and provide a configuration:

```tsx
import GridLayout from "../components/grid/GridLayout";
import { defaultGridLayout } from "../components/grid/gridConfig";

// Use the default layout
<GridLayout />

// Or customize the layout
const customLayout = [...defaultGridLayout];
// Modify the layout as needed
<GridLayout layout={customLayout} />
```

## Benefits

1. **Separation of Concerns**: The grid layout is now separate from the content, making it easier to modify either independently.
2. **Configurability**: The grid layout can be easily configured without changing the component code.
3. **Maintainability**: The grid architecture provides a clear structure for adding, removing, or modifying components.
4. **Reusability**: The grid components can be reused across different pages with different configurations.
5. **Testability**: The grid components can be tested independently of the content.

## Migration

The new grid architecture is available at the `/grid` route. It maintains the exact same visual appearance as the current implementation, ensuring a seamless transition for users.

## Future Enhancements

- Add support for responsive layouts
- Implement grid area templates for more complex layouts
- Add animation support for grid items
- Create a visual editor for configuring the grid layout 