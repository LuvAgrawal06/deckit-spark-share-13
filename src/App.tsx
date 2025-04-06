
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import HomePage from "./components/HomePage";
import Browse from "./pages/Browse";
import ProjectDetail from "./pages/ProjectDetail";
import Upload from "./pages/Upload";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-theme-cream text-theme-dark">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user/:username" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
