import { useState } from 'react';
import { useSchools } from '@/hooks/useSchools';
import SchoolCard from '@/components/directory/SchoolCard';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Filter, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function DirectoryPage() {
  const [selectedHours, setSelectedHours] = useState<number[]>([]);
  const { data: schools, isLoading, error, refetch, isRefetching } = useSchools(selectedHours);

  const toggleHourFilter = (hours: number) => {
    setSelectedHours((prev) =>
      prev.includes(hours) ? prev.filter((h) => h !== hours) : [...prev, hours]
    );
  };

  const handleRetry = () => {
    refetch();
  };

  return (
    <div className="bg-white dark:bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Yoga Alliance Teacher Training Directory
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            Discover certified yoga schools offering 200, 300, and 500-hour teacher training programs
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-8 rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Filter by Training Hours</h2>
          </div>
          <div className="flex flex-wrap gap-6">
            {[200, 300, 500].map((hours) => (
              <div key={hours} className="flex items-center space-x-2">
                <Checkbox
                  id={`hours-${hours}`}
                  checked={selectedHours.includes(hours)}
                  onCheckedChange={() => toggleHourFilter(hours)}
                />
                <Label
                  htmlFor={`hours-${hours}`}
                  className="cursor-pointer text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {hours} Hours
                </Label>
              </div>
            ))}
          </div>
          {selectedHours.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedHours.map((hours) => (
                <Badge key={hours} variant="secondary" className="gap-1">
                  {hours} Hours
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Error State - only show when not loading and there's an error */}
        {!isLoading && error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between gap-4">
              <span>Failed to load schools. Please try again later.</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetry}
                disabled={isRefetching}
                className="shrink-0"
              >
                {isRefetching ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Retrying...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retry
                  </>
                )}
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4 rounded-lg border border-border bg-card p-6">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Schools Grid */}
        {!isLoading && !error && schools && schools.length > 0 && (
          <>
            <div className="mb-6 text-sm text-muted-foreground">
              Showing {schools.length} {schools.length === 1 ? 'school' : 'schools'}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {schools.map((school) => (
                <SchoolCard key={school.id} school={school} />
              ))}
            </div>
          </>
        )}

        {/* Empty State - only show when not loading, no error, and empty results */}
        {!isLoading && !error && schools && schools.length === 0 && (
          <div className="rounded-lg border border-dashed border-border bg-muted/20 p-12 text-center">
            <p className="text-lg text-muted-foreground">
              No schools found matching your criteria.
            </p>
            {selectedHours.length > 0 && (
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your filters to see more results.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
