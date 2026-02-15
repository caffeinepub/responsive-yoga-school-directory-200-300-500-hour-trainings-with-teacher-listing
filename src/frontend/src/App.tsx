import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import DirectoryPage from './pages/DirectoryPage';
import SchoolDetailPage from './pages/SchoolDetailPage';
import TrainingCurriculumPage from './pages/TrainingCurriculumPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SubmitClaimSchoolPage from './pages/SubmitClaimSchoolPage';
import AdminPage from './pages/AdminPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

// Layout component with Header and Footer
function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 bg-background">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Define routes
const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DirectoryPage,
});

const schoolDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/school/$schoolId',
  component: SchoolDetailPage,
});

const trainingCurriculumRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/school/$schoolId/training/$trainingId',
  component: TrainingCurriculumPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const submitClaimRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/submit-claim',
  component: SubmitClaimSchoolPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: BlogPage,
});

const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog/$postId',
  component: BlogPostPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  schoolDetailRoute,
  trainingCurriculumRoute,
  aboutRoute,
  contactRoute,
  submitClaimRoute,
  adminRoute,
  blogRoute,
  blogPostRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
