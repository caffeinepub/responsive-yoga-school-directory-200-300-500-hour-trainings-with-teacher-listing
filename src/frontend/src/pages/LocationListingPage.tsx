import { useParams } from '@tanstack/react-router';
import { useSchoolsByLocation } from '@/hooks/useSchoolsByLocation';
import { decodeLocationSegment } from '@/lib/locationRoutes';
import SchoolCard from '@/components/directory/SchoolCard';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin } from 'lucide-react';
import CopyLinkButton from '@/components/common/CopyLinkButton';

export default function LocationListingPage() {
  const params = useParams({ from: '/location/$country' }) as {
    country?: string;
    state?: string;
    city?: string;
  };

  const country = params.country ? decodeLocationSegment(params.country) : undefined;
  const state = params.state ? decodeLocationSegment(params.state) : undefined;
  const city = params.city ? decodeLocationSegment(params.city) : undefined;

  const { data: schools, isLoading, error } = useSchoolsByLocation(country, state, city);

  const buildLocationTitle = () => {
    const parts: string[] = [];
    if (city) parts.push(city);
    if (state) parts.push(state);
    if (country) parts.push(country);
    return parts.join(', ');
  };

  const locationTitle = buildLocationTitle();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-primary/5 py-12">
          <div className="container mx-auto px-4">
            <Skeleton className="h-12 w-96" />
            <Skeleton className="mt-4 h-6 w-64" />
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-96" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert variant="destructive">
          <AlertDescription>
            {error.message || 'Failed to load schools. Please try again.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary/5 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="mb-2 flex items-center gap-3 text-4xl font-bold">
                <MapPin className="h-10 w-10 text-primary" />
                Yoga Schools in {locationTitle}
              </h1>
              <p className="text-lg text-muted-foreground">
                {schools && schools.length > 0
                  ? `Discover ${schools.length} yoga teacher training ${schools.length === 1 ? 'school' : 'schools'} in ${locationTitle}`
                  : `Explore yoga teacher training schools in ${locationTitle}`}
              </p>
            </div>
            <CopyLinkButton label="Share Location" variant="outline" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {schools && schools.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <MapPin className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-xl font-semibold">No Schools Found</h3>
              <p className="text-muted-foreground">
                We don't have any yoga schools listed in {locationTitle} yet. Check back soon or explore other locations.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {schools?.map((school) => (
              <SchoolCard key={school.id} school={school} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
