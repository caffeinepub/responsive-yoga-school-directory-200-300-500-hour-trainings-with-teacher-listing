import { useParams, useNavigate } from '@tanstack/react-router';
import { useTrainingCurriculumData } from '@/hooks/useTrainingCurriculumData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Clock, GraduationCap, MapPin, Calendar, DollarSign, Home } from 'lucide-react';
import CopyLinkButton from '@/components/common/CopyLinkButton';
import { formatStructuredLocation } from '@/lib/locationFormat';

export default function TrainingCurriculumPage() {
  const { schoolId, trainingId } = useParams({ from: '/school/$schoolId/training/$trainingId' });
  const navigate = useNavigate();
  const { school, training, isLoading, error } = useTrainingCurriculumData(schoolId, trainingId);

  const handleBack = () => {
    navigate({ to: '/school/$schoolId', params: { schoolId } });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="mb-6 h-10 w-32" />
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
            <Skeleton className="h-96" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !school || !training) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert variant="destructive">
          <AlertDescription>
            {error?.message || 'Training curriculum not found. Please check the URL and try again.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const displayLocation = formatStructuredLocation(school);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to School
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Badge className="mb-3">{training.hours} Hour Program</Badge>
                    <CardTitle className="text-3xl">{training.hours}-Hour Yoga Teacher Training</CardTitle>
                    <p className="mt-2 text-lg text-muted-foreground">at {school.name}</p>
                  </div>
                  <CopyLinkButton variant="outline" size="sm" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-3 text-xl font-semibold">Course Overview</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {training.description || `This comprehensive ${training.hours}-hour yoga teacher training program at ${school.name} is designed to deepen your practice and prepare you to teach yoga with confidence and authenticity. Our curriculum combines traditional yoga philosophy with modern teaching methodologies.`}
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">Program Highlights</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <span>Internationally recognized {training.hours}-hour certification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <span>Comprehensive curriculum covering asana, pranayama, meditation, and philosophy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <span>Training held at our beautiful location in {displayLocation}</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Contact the school directly for current pricing and available payment plans.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-primary" />
                    Accommodation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Inquire about accommodation options and packages available during your training.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Training Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Duration</p>
                  <p className="mt-1 flex items-center gap-2 text-base">
                    <Clock className="h-4 w-4" />
                    {training.hours} Hours
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <p className="mt-1 flex items-center gap-2 text-base">
                    <MapPin className="h-4 w-4" />
                    {displayLocation}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">School</p>
                  <p className="mt-1 text-base font-medium">{school.name}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ready to Begin?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Take the next step in your yoga journey. Contact {school.name} to learn more about this training program.
                </p>
                <Button className="w-full" size="lg" onClick={handleBack}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Inquire Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
