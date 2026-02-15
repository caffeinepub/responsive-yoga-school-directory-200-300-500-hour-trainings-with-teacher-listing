import { useState, useRef } from 'react';
import { useSchools } from '@/hooks/useSchools';
import SchoolCard from '@/components/directory/SchoolCard';
import DirectoryInfoSections from '@/components/directory/DirectoryInfoSections';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Filter, RefreshCw, ArrowDown, Sliders } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function DirectoryPage() {
  const [selectedHours, setSelectedHours] = useState<number[]>([]);
  const { data: schools, isLoading, error, refetch, isRefetching } = useSchools(selectedHours);
  
  const filtersRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const toggleHourFilter = (hours: number) => {
    setSelectedHours((prev) =>
      prev.includes(hours) ? prev.filter((h) => h !== hours) : [...prev, hours]
    );
  };

  const handleRetry = () => {
    refetch();
  };

  const scrollToResults = () => {
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToFilters = () => {
    filtersRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Focus the first checkbox after scrolling
    setTimeout(() => {
      const firstCheckbox = filtersRef.current?.querySelector('button[role="checkbox"]') as HTMLElement;
      firstCheckbox?.focus();
    }, 500);
  };

  // Safely handle schools data - ensure it's always an array
  const schoolsList = schools ?? [];
  
  // Show error banner only when there's a genuine query failure (error is set)
  // Do NOT show error banner when query succeeds with empty array
  const showErrorBanner = !!error && !isLoading;

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 py-20 md:py-28 lg:py-36">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 px-4 py-1.5 text-sm font-medium" variant="secondary">
              Yoga Alliance Certified Programs
            </Badge>
            <h1 className="mb-6 font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl xl:text-7xl">
              Yoga Alliance Teacher Training Directory
            </h1>
            <p className="mb-10 text-lg text-muted-foreground md:text-xl lg:text-2xl">
              Discover certified yoga schools offering 100, 200, 300, and 500-hour teacher training programs
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="min-w-[200px] text-base font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                onClick={scrollToResults}
              >
                Browse Schools
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="min-w-[200px] border-2 text-base font-semibold transition-all hover:scale-105"
                onClick={scrollToFilters}
              >
                <Sliders className="mr-2 h-5 w-5" />
                Filter Programs
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Informational Sections */}
      <div className="container mx-auto px-4 py-16 md:py-20">
        <DirectoryInfoSections />
      </div>

      {/* Filter and Results Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Filter Section */}
        <div ref={filtersRef} className="mb-12 scroll-mt-24 rounded-xl border-2 border-border bg-card p-6 shadow-soft md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Filter className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground md:text-2xl">Filter by Training Hours</h2>
          </div>
          <div className="flex flex-wrap gap-6">
            {[100, 200, 300, 500].map((hours) => (
              <div key={hours} className="flex items-center space-x-3">
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
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
              {selectedHours.map((hours) => (
                <Badge key={hours} variant="secondary" className="gap-1 px-3 py-1">
                  {hours} Hours
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Error State - only show for genuine backend failures */}
        {showErrorBanner && (
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
        {!isLoading && !showErrorBanner && schoolsList.length > 0 && (
          <div ref={resultsRef} className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-2">
              <h2 className="text-2xl font-bold text-foreground">Available Schools</h2>
              <Badge variant="outline" className="text-base">
                {schoolsList.length} {schoolsList.length === 1 ? 'school' : 'schools'}
              </Badge>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {schoolsList.map((school) => (
                <SchoolCard key={school.id} school={school} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State - show when query succeeds but returns no schools */}
        {!isLoading && !showErrorBanner && schoolsList.length === 0 && (
          <div className="rounded-xl border-2 border-dashed border-border bg-muted/20 p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Filter className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mb-2 text-lg font-semibold text-foreground">
              No schools found matching your criteria
            </p>
            {selectedHours.length > 0 ? (
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters to see more results
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                No schools are currently available in the directory
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
