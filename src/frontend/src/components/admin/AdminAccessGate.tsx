import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldCheck, LogIn, LogOut } from 'lucide-react';

interface AdminAccessGateProps {
  isAuthenticated: boolean;
  loginStatus: string;
  children: React.ReactNode;
}

export default function AdminAccessGate({ isAuthenticated, loginStatus, children }: AdminAccessGateProps) {
  const { login, clear } = useInternetIdentity();
  const queryClient = useQueryClient();

  const handleSignIn = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message === 'User is already authenticated') {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const handleSignOut = async () => {
    await clear();
    queryClient.clear();
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
            <CardDescription>
              Sign in with Internet Identity to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                You must be signed in to manage schools, teachers, trainings, and reviews.
              </AlertDescription>
            </Alert>
            <Button
              onClick={handleSignIn}
              disabled={loginStatus === 'logging-in'}
              className="w-full"
              size="lg"
            >
              <LogIn className="mr-2 h-5 w-5" />
              {loginStatus === 'logging-in' ? 'Signing in...' : 'Sign in with Internet Identity'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your yoga school directory</p>
        </div>
        <Button onClick={handleSignOut} variant="outline">
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </div>
      {children}
    </div>
  );
}
