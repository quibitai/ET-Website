import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VideoDemo from "./pages/VideoDemo";
import { RetroProvider } from "./contexts/RetroContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RetroProvider>
        <BrowserRouter>
          <div className="min-h-screen relative">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/video-demo" element={<VideoDemo />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </RetroProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
