import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import SchoolCard from '@/components/directory/SchoolCard';
import { useSimilarSchools } from '@/hooks/useSimilarSchools';
import { School as SchoolIcon } from 'lucide-react';

interface SimilarSchoolsSectionProps {
  currentSchoolId: string;
}

export default function SimilarSchoolsSection({ currentSchoolId }: SimilarSchoolsSectionProps) {
  const { data: similarSchools, isLoading } = useSimilarSchools(currentSchoolId);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SchoolIcon className="h-5 w-5" />
            Similar Schools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!similarSchools || similarSchools.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SchoolIcon className="h-5 w-5" />
            Similar Schools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No similar schools found.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SchoolIcon className="h-5 w-5" />
          Similar Schools
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {similarSchools.map((school) => (
            <SchoolCard key={school.id} school={school} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
