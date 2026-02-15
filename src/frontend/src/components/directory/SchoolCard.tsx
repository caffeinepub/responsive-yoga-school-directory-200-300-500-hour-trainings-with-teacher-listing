import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, ArrowRight, ImageOff } from 'lucide-react';
import type { School } from '@/backend';
import { useSchoolCardData } from '@/hooks/useSchoolCardData';
import { getSchoolThumbnail } from '@/lib/schoolThumbnails';
import { formatStructuredLocation } from '@/lib/locationFormat';

interface SchoolCardProps {
  school: School;
}

export default function SchoolCard({ school }: SchoolCardProps) {
  const navigate = useNavigate();
  const { trainings, teachers, isLoading } = useSchoolCardData(school.id);
  const [imageError, setImageError] = useState(false);

  const handleViewDetails = () => {
    navigate({ to: '/school/$schoolId', params: { schoolId: school.id } });
  };

  const thumbnailSrc = getSchoolThumbnail(school.id);
  const displayLocation = formatStructuredLocation(school);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {!imageError ? (
          <img
            src={thumbnailSrc}
            alt={school.name}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <ImageOff className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className="line-clamp-2">{school.name}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="line-clamp-1">{displayLocation}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {!isLoading && trainings && trainings.length > 0 && (
          <div>
            <p className="mb-2 text-sm font-medium">Training Programs:</p>
            <div className="flex flex-wrap gap-2">
              {trainings.map((training) => (
                <Badge key={training.id} variant="secondary">
                  {training.hours} Hours
                </Badge>
              ))}
            </div>
          </div>
        )}

        {!isLoading && teachers && teachers.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{teachers.length} {teachers.length === 1 ? 'Teacher' : 'Teachers'}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="pb-6">
        <Button onClick={handleViewDetails} className="w-full group">
          View Details
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
