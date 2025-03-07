import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import IndexGrid from "./pages/IndexGrid";
import IndexThemed from "./pages/IndexThemed";
import NotFound from "./pages/NotFound";
import VideoDemo from "./pages/VideoDemo";
import ContentSystemDemo from "./pages/ContentSystemDemo";
import ContentDisplayDemo from "./pages/ContentDisplayDemo";
import { ThemeProvider, BorderFix } from "./theme";
import { RetroProvider } from "./contexts/RetroContext";
import { IndustryProvider } from "./contexts/IndustryContext";
import { ContentProvider } from "./content";
import { FlipProvider } from "./contexts/FlipContext";

const queryClient = new QueryClient();

/**
 * Main App component
 * Uses the new unified theme system while maintaining backward compatibility 
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <RetroProvider>
        <IndustryProvider>
          <ContentProvider>
            <FlipProvider>
              <BorderFix />
              <BrowserRouter>
                <div className="min-h-screen relative">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    {/* Routes for new implementations */}
                    <Route path="/grid" element={<IndexGrid />} />
                    <Route path="/themed" element={<IndexThemed />} />
                    <Route path="/video-demo" element={<VideoDemo />} />
                    <Route path="/content-demo" element={<ContentSystemDemo />} />
                    <Route path="/content-display" element={<ContentDisplayDemo />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </BrowserRouter>
            </FlipProvider>
          </ContentProvider>
        </IndustryProvider>
      </RetroProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
