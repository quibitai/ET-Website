# ET-Website

## Project Overview

This is the official website for Echo Tango Creative, a digital media production company. Version 1.1 features an updated dark mode color scheme with softer colors and improved visual consistency.

## Features

- Responsive design for all device sizes
- Dark/Light mode toggle
- Animated image sequence
- Video reel showcase
- Contact form
- Industry terminology showcase
- Social media links

## Technology Stack

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Development

To run this project locally:

```sh
# Clone the repository
git clone https://github.com/quibitai/snapshot-studio-site.git

# Navigate to the project directory
cd snapshot-studio-site

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Contributing

There are several ways to contribute to this project:

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes.

## Version History

### v3.1.0
- Refined intro animation with smooth zoom and fade effect
- Eliminated animation jumpiness for a more professional experience
- Improved animation timing and synchronization
- Enhanced overall loading experience with seamless transitions
- Updated animation easing functions for natural motion

### v3.0.0
- Complete slider component rebuild with improved functionality
- Fixed theme handling across all color modes (light, dark, grayscale, retro)
- Added visual indicators for toggle buttons in grayscale mode
- Improved vertical centering and layout in content display
- Enhanced visibility of UI controls in dark grayscale mode
- Fixed z-index and visibility management with FlipContext
- Simplified DOM structure for better performance
- Added error boundaries for improved stability

### v2.2.0
- Updated slider layout with unified design
- Improved flip transitions
- Fixed EmptyBox flickering in dark mode
- Enhanced grid alignment

### v1.1.0
- Updated dark mode color scheme
- Added softer colors for improved readability
- Consistent styling across components
- Added right border to video section
- Removed gradients for cleaner UI
- Updated yellow accent colors

### v1.0.0
- Initial release

## Deployment

The site is deployed at [https://echotango.co](https://echotango.co)

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
