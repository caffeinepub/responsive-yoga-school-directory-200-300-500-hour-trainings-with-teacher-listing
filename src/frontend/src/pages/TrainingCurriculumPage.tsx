import { useParams, useNavigate } from '@tanstack/react-router';
import { useTrainingCurriculumData } from '@/hooks/useTrainingCurriculumData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, Calendar, CheckCircle2, AlertCircle, DollarSign, Home } from 'lucide-react';

export default function TrainingCurriculumPage() {
  const { schoolId, trainingId } = useParams({ from: '/school/$schoolId/training/$trainingId' });
  const navigate = useNavigate();
  const { school, training, isLoading, error } = useTrainingCurriculumData(schoolId, trainingId);

  const handleBack = () => {
    navigate({ to: '/school/$schoolId', params: { schoolId } });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="mb-6 h-10 w-32" />
        <div className="space-y-6">
          <Skeleton className="h-16 w-3/4" />
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-60 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  if (error || !training || !school) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={handleBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to School
        </Button>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Curriculum not found. The training program may have been removed or does not exist.
          </AlertDescription>
        </Alert>
        <Button onClick={handleBack} className="mt-4">
          Return to School Details
        </Button>
      </div>
    );
  }

  const hours = Number(training.hours);
  const estimatedDays = Math.ceil(hours / 8);
  const estimatedWeeks = Math.ceil(estimatedDays / 7);

  // Generate course highlights from description
  const generateHighlights = (description: string): string[] => {
    // Split description into sentences and take first few as highlights
    const sentences = description
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 20);
    
    if (sentences.length > 0) {
      return sentences.slice(0, 3);
    }
    
    // Fallback highlights based on training hours
    const fallbackHighlights = [
      'Comprehensive yoga teacher training program',
      'Foundational practice, theory, and spiritual discipline',
      'Ideal for aspiring yoga teachers and dedicated practitioners',
    ];
    
    return fallbackHighlights;
  };

  const highlights = generateHighlights(training.description);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Back Button */}
      <Button variant="ghost" onClick={handleBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to {school.name}
      </Button>

      {/* Course Header */}
      <div className="mb-8">
        <div className="mb-4">
          <Badge variant="secondary" className="mb-3">
            {school.location}
          </Badge>
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {hours} Hour Yoga Teacher Training Course
          </h1>
        </div>

        {/* Key Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-lg">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">{estimatedDays} Days</span>
            <span className="text-muted-foreground">
              ({estimatedWeeks} {estimatedWeeks === 1 ? 'week' : 'weeks'})
            </span>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">{hours} Hours</span>
            <span className="text-muted-foreground">of training</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Course Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Course Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">
                {training.description}
              </p>
            </CardContent>
          </Card>

          {/* Course Highlights */}
          <Card>
            <CardHeader>
              <CardTitle>Course Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Pricing & Accommodation */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Accommodation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Private Room Card */}
                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-center">
                      <Home className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 text-center text-lg font-semibold">Private Room</h3>
                    <div className="mb-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-sm">Pricing not available</span>
                      </div>
                    </div>
                    <Alert>
                      <AlertDescription className="text-sm">
                        Contact the school directly for current pricing and availability.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>

                {/* Shared Room Card */}
                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-center">
                      <Home className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 text-center text-lg font-semibold">Shared Room</h3>
                    <div className="mb-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-sm">Pricing not available</span>
                      </div>
                    </div>
                    <Alert>
                      <AlertDescription className="text-sm">
                        Contact the school directly for current pricing and availability.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>

              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Pricing details are not provided by this school yet. Please contact them directly for the most up-to-date information on course fees, accommodation options, and payment plans.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Training Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-1 text-sm font-medium text-muted-foreground">School</h3>
                <p className="text-base font-medium">{school.name}</p>
              </div>
              <Separator />
              <div>
                <h3 className="mb-1 text-sm font-medium text-muted-foreground">Location</h3>
                <p className="text-base">{school.location}</p>
              </div>
              <Separator />
              <div>
                <h3 className="mb-1 text-sm font-medium text-muted-foreground">Duration</h3>
                <p className="text-base">{estimatedDays} days ({hours} hours)</p>
              </div>
              <Separator />
              <div>
                <h3 className="mb-1 text-sm font-medium text-muted-foreground">Program Type</h3>
                <Badge variant="secondary">{hours}h Certification</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="border-primary/50 bg-primary/5">
            <CardContent className="p-6">
              <h3 className="mb-3 text-lg font-semibold">Ready to Begin?</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Contact {school.name} to learn more about enrollment, upcoming dates, and special offers.
              </p>
              <Button className="w-full" disabled>
                Inquire Now
              </Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Coming soon
              </p>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What's Included</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>Comprehensive training materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>Certification upon completion</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>Expert instruction and guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>Practice teaching opportunities</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
