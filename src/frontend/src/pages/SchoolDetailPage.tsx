import { useParams, useNavigate } from '@tanstack/react-router';
import { useSchoolDetails } from '@/hooks/useSchoolDetails';
import TeacherList from '@/components/directory/TeacherList';
import FAQSection from '@/components/school/FAQSection';
import ImageGallerySection from '@/components/school/ImageGallerySection';
import SchoolVideoEmbedSection from '@/components/school/SchoolVideoEmbedSection';
import SchoolMapSection from '@/components/school/SchoolMapSection';
import SimilarSchoolsSection from '@/components/school/SimilarSchoolsSection';
import AboutSchoolSection from '@/components/school/AboutSchoolSection';
import SchoolTrainingCoursesSection from '@/components/school/SchoolTrainingCoursesSection';
import SchoolReviewsSection from '@/components/school/SchoolReviewsSection';
import { defaultSchoolFAQs } from '@/components/school/faqContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, MapPin, AlertCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function SchoolDetailPage() {
  const { schoolId } = useParams({ from: '/school/$schoolId' });
  const navigate = useNavigate();
  const { school, teachers, trainings, isLoading, error } = useSchoolDetails(schoolId);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="mb-6 h-10 w-32" />
        <div className="space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-60 w-full" />
        </div>
      </div>
    );
  }

  if (error || !school) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate({ to: '/' })} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Directory
        </Button>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            School not found or failed to load. Please try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate({ to: '/' })} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Directory
      </Button>

      {/* School Header */}
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          {school.name}
        </h1>
        <div className="flex items-center gap-2 text-lg text-muted-foreground">
          <MapPin className="h-5 w-5" />
          <span>{school.location}</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* About School Section */}
          <AboutSchoolSection 
            schoolName={school.name}
            location={school.location}
          />

          {/* Courses & Training Section */}
          <SchoolTrainingCoursesSection trainings={trainings || []} schoolId={schoolId} />

          {/* Reviews Section */}
          <SchoolReviewsSection schoolId={schoolId} />

          {/* Teachers Section */}
          <Card>
            <CardHeader>
              <CardTitle>Our Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              <TeacherList teachers={teachers || []} />
            </CardContent>
          </Card>

          {/* Video Section */}
          <SchoolVideoEmbedSection videoUrl={school.videoUrl} />

          {/* Location/Map Section */}
          <SchoolMapSection location={school.location} schoolName={school.name} showEmbed={false} />

          {/* Image Gallery Section */}
          <ImageGallerySection />

          {/* FAQ Section */}
          <FAQSection faqs={defaultSchoolFAQs} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-1 text-sm font-medium text-muted-foreground">Location</h3>
                <p className="text-base">{school.location}</p>
              </div>
              <Separator />
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                  Available Programs
                </h3>
                <div className="flex flex-wrap gap-2">
                  {trainings && trainings.length > 0 ? (
                    trainings.map((training) => (
                      <Badge key={training.id} variant="secondary">
                        {Number(training.hours)}h
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">None listed</span>
                  )}
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="mb-1 text-sm font-medium text-muted-foreground">Teachers</h3>
                <p className="text-base">
                  {teachers?.length || 0} {teachers?.length === 1 ? 'teacher' : 'teachers'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Similar Schools Section */}
          <SimilarSchoolsSection currentSchoolId={school.id} />
        </div>
      </div>
    </div>
  );
}
