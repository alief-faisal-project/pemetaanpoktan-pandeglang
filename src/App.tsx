import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DistrictPage from "./pages/DistrictPage";
import GroupDetailPage from "./pages/GroupDetailPage";
import MapPage from "./pages/MapPage";
import AllGroupsPage from "./pages/AllGroupsPage";
import AllDistrictsPage from "./pages/AllDistrictsPage";
import AllMembersPage from "./pages/AllMembersPage";
import NotFound from "./pages/NotFound";
import { CacheRestoreDialog } from "./components/CacheRestoreDialog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CacheRestoreDialog />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/district/:slug" element={<DistrictPage />} />
          <Route path="/group/:id" element={<GroupDetailPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/all-groups" element={<AllGroupsPage />} />
          <Route path="/all-districts" element={<AllDistrictsPage />} />
          <Route path="/all-members" element={<AllMembersPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
