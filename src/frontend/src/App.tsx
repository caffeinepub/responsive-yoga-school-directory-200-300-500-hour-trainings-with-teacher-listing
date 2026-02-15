import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DirectoryPage from '@/pages/DirectoryPage';
import SchoolDetailPage from '@/pages/SchoolDetailPage';
import TrainingCurriculumPage from '@/pages/TrainingCurriculumPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import SubmitClaimSchoolPage from '@/pages/SubmitClaimSchoolPage';
import AdminPage from '@/pages/AdminPage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
import LocationListingPage from '@/pages/LocationListingPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 bg-background">{children}</main>
      <Footer />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => <Layout><RouterProvider router={router} /></Layout>,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DirectoryPage,
});

const schoolRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/school/$schoolId',
  component: SchoolDetailPage,
});

const trainingRoute = createRoute({
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

const locationCountryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/location/$country',
  component: LocationListingPage,
});

const locationStateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/location/$country/$state',
  component: LocationListingPage,
});

const locationCityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/location/$country/$state/$city',
  component: LocationListingPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  schoolRoute,
  trainingRoute,
  aboutRoute,
  contactRoute,
  submitClaimRoute,
  adminRoute,
  blogRoute,
  blogPostRoute,
  locationCountryRoute,
  locationStateRoute,
  locationCityRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <StrictMode>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>
  );
}
