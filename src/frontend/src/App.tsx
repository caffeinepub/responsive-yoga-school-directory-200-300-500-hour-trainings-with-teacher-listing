import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import DirectoryPage from './pages/DirectoryPage';
import SchoolDetailPage from './pages/SchoolDetailPage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

// Layout component with Header and Footer
function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
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

const routeTree = rootRoute.addChildren([indexRoute, schoolDetailRoute]);

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
