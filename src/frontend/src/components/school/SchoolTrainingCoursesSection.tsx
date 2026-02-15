import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, Clock, FileText, Mail } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import type { Training } from '@/backend';

interface SchoolTrainingCoursesSectionProps {
  trainings: Training[];
  schoolId: string;
  onInquire?: () => void;
}

export default function SchoolTrainingCoursesSection({
  trainings,
  schoolId,
  onInquire,
}: SchoolTrainingCoursesSectionProps) {
  const navigate = useNavigate();

  // Generate course title from hours
  const getCourseTitle = (hours: bigint): string => {
    return `${Number(hours)} Hour Yoga Teacher Training Course`;
  };

  // Calculate estimated days from hours (assuming 8 hours per day)
  const getEstimatedDays = (hours: bigint): number => {
    return Math.ceil(Number(hours) / 8);
  };

  const handleViewCurriculum = (trainingId: string) => {
    navigate({
      to: '/school/$schoolId/training/$trainingId',
      params: { schoolId, trainingId },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Courses & Training
        </CardTitle>
      </CardHeader>
      <CardContent>
        {trainings && trainings.length > 0 ? (
          <div className="space-y-4">
            {trainings.map((training) => (
              <Card key={training.id} className="border-2 transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  {/* Course Title */}
                  <h3 className="mb-3 text-xl font-semibold tracking-tight">
                    {getCourseTitle(training.hours)}
                  </h3>

                  {/* Metadata Row */}
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1">
                      <Clock className="h-3.5 w-3.5" />
                      {getEstimatedDays(training.hours)} Days
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1">
                      {Number(training.hours)} Hours
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="mb-5 leading-relaxed text-muted-foreground">
                    {training.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleViewCurriculum(training.id)}
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      View Curriculum
                    </Button>
                    <Button 
                      variant="default" 
                      onClick={onInquire}
                      className="flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      Inquire Now
                    </Button>
                  </div>

                  {/* Helper Text */}
                  <p className="mt-3 text-xs text-muted-foreground">
                    Contact the school directly for enrollment information.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <GraduationCap className="mx-auto mb-3 h-12 w-12 text-muted-foreground/50" />
            <p className="text-muted-foreground">
              No training programs are currently listed for this school.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
