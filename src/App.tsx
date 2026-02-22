import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollManager from "@/components/ScrollManager";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import NoteDetailsPage from "./pages/NoteDetailsPage";
import NotesPage from "./pages/NotesPage";
import NotFound from "./pages/NotFound";
import NowPage from "./pages/NowPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import ProjectsPage from "./pages/ProjectsPage";

const App = () => (
  <ThemeProvider>
    <TooltipProvider>
      <BrowserRouter>
        <ScrollManager />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/notes/:slug" element={<NoteDetailsPage />} />
          <Route path="/now" element={<NowPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
