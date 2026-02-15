import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import AdminAccessGate from '@/components/admin/AdminAccessGate';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  const { identity, loginStatus } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminAccessGate isAuthenticated={isAuthenticated} loginStatus={loginStatus}>
        <AdminDashboard />
      </AdminAccessGate>
    </div>
  );
}
