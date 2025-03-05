import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VideoDemo from "./pages/VideoDemo";
import { RetroProvider } from "./contexts/RetroContext";
import { GrayscaleProvider } from "./contexts/GrayscaleContext";
import DarkModeBorderFix from "./components/DarkModeBorderFix";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RetroProvider>
        <GrayscaleProvider>
          <DarkModeBorderFix />
          <BrowserRouter>
            <div className="min-h-screen relative">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/video-demo" element={<VideoDemo />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </GrayscaleProvider>
      </RetroProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
