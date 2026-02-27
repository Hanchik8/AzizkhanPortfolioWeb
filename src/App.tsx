import { lazy, Suspense } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollManager from "@/components/ScrollManager";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailsPage = lazy(() => import("./pages/ProjectDetailsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const NotesPage = lazy(() => import("./pages/NotesPage"));
const NoteDetailsPage = lazy(() => import("./pages/NoteDetailsPage"));
const NowPage = lazy(() => import("./pages/NowPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="flex items-center gap-3 font-mono text-sm text-muted-foreground">
      <span className="cursor-blink h-4 w-2 bg-primary" />
      <span>Loading...</span>
    </div>
  </div>
);

const App = () => (
  <ThemeProvider>
    <TooltipProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollManager />
        <Sonner />
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
