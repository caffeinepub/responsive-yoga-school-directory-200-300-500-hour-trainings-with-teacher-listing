import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, Clock, FileText, Mail, ArrowDown } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useRef } from 'react';
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
  const coursesListRef = useRef<HTMLDivElement>(null);
  const firstCourseRef = useRef<HTMLHeadingElement>(null);

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

  const handleExplore = () => {
    if (coursesListRef.current) {
      coursesListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Focus the first course title for accessibility
      setTimeout(() => {
        if (firstCourseRef.current) {
          firstCourseRef.current.focus();
        }
      }, 500);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Courses & Training
          </CardTitle>
          {trainings && trainings.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleExplore}
              className="flex items-center gap-2"
            >
              <ArrowDown className="h-4 w-4" />
              Explore
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {trainings && trainings.length > 0 ? (
          <div ref={coursesListRef} className="space-y-4">
            {trainings.map((training, index) => (
              <Card key={training.id} className="border-2 transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  {/* Course Title */}
                  <h3
                    ref={index === 0 ? firstCourseRef : null}
                    tabIndex={index === 0 ? -1 : undefined}
                    className="mb-3 text-xl font-semibold tracking-tight outline-none"
                  >
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
