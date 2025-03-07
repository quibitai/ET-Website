import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'next-themes'
import App from './App.tsx'
import './index.css'
import { ErrorBoundary } from './components/ErrorBoundary'
import { setupGlobalErrorHandling } from './utils/errorHandler'

// Set up global error handling
setupGlobalErrorHandling({
  shouldLogToConsole: true,
  onError: (error, errorInfo) => {
    console.error('Captured error in global handler:', error);
    console.error('Error info:', errorInfo);
    // You could send to an error monitoring service here
  }
});

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary
    fallback={
      <div className="error-fallback">
        <h1>Something went wrong</h1>
        <p>The application encountered an error. Please refresh the page and try again.</p>
      </div>
    }
  >
    <ThemeProvider 
      attribute="class" 
      defaultTheme="light" 
      enableSystem 
      disableTransitionOnChange
      storageKey="echotango-theme"
    >
      <App />
    </ThemeProvider>
  </ErrorBoundary>
);
