import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, ArrowRight } from 'lucide-react';
import type { School } from '@/backend';
import { useSchoolCardData } from '@/hooks/useSchoolCardData';

interface SchoolCardProps {
  school: School;
}

export default function SchoolCard({ school }: SchoolCardProps) {
  const navigate = useNavigate();
  const { trainings, teachers, isLoading } = useSchoolCardData(school.id);

  const handleViewDetails = () => {
    navigate({ to: '/school/$schoolId', params: { schoolId: school.id } });
  };

  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle className="line-clamp-2 text-xl">{school.name}</CardTitle>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1">{school.location}</span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {/* Training Programs */}
        <div>
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">Training Programs</h3>
          {isLoading ? (
            <div className="flex gap-2">
              <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
              <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
            </div>
          ) : trainings && trainings.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {trainings.map((training) => (
                <Badge key={training.id} variant="secondary">
                  {Number(training.hours)}h
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No programs listed</p>
          )}
        </div>

        {/* Teachers Preview */}
        <div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>
              {isLoading
                ? 'Loading...'
                : teachers
                  ? `${teachers.length} ${teachers.length === 1 ? 'teacher' : 'teachers'}`
                  : 'No teachers listed'}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button onClick={handleViewDetails} className="w-full" variant="default">
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
