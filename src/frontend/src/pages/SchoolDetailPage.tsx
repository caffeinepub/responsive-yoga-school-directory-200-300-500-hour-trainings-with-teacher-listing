import { useParams } from '@tanstack/react-router';
import { useRef } from 'react';
import { useSchoolDetails } from '@/hooks/useSchoolDetails';
import SchoolProfileBanner from '@/components/school/SchoolProfileBanner';
import AboutSchoolSection from '@/components/school/AboutSchoolSection';
import SchoolTrainingCoursesSection from '@/components/school/SchoolTrainingCoursesSection';
import TeacherList from '@/components/directory/TeacherList';
import FAQSection from '@/components/school/FAQSection';
import ImageGallerySection from '@/components/school/ImageGallerySection';
import SchoolVideoEmbedSection from '@/components/school/SchoolVideoEmbedSection';
import SchoolMapSection from '@/components/school/SchoolMapSection';
import SimilarSchoolsSection from '@/components/school/SimilarSchoolsSection';
import SchoolReviewsSection from '@/components/school/SchoolReviewsSection';
import SchoolInquiryFormSection from '@/components/school/SchoolInquiryFormSection';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin, Users, GraduationCap, ChevronRight } from 'lucide-react';
import { formatStructuredLocation, hasStructuredLocation } from '@/lib/locationFormat';
import { buildLocationBreadcrumbs } from '@/lib/locationRoutes';
import { useNavigate } from '@tanstack/react-router';
import { defaultSchoolFAQs } from '@/components/school/faqContent';
import { getCuratedGalleryImages } from '@/lib/curatedSchoolMedia';

export default function SchoolDetailPage() {
  const { schoolId } = useParams({ from: '/school/$schoolId' });
  const { school, teachers, trainings, isLoading, error } = useSchoolDetails(schoolId);
  const inquiryFormRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleInquire = () => {
    inquiryFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      const firstInput = inquiryFormRef.current?.querySelector('input');
      firstInput?.focus();
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Skeleton className="h-[420px] w-full" />
        <div className="container mx-auto px-4 py-12">
          <div className="space-y-8">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !school) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert variant="destructive">
          <AlertDescription>
            {error?.message || 'School not found. Please check the URL and try again.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const displayLocation = formatStructuredLocation(school);
  const locationBreadcrumbs = hasStructuredLocation(school)
    ? buildLocationBreadcrumbs(school.country, school.state, school.city)
    : [];

  // Get curated gallery images if available for banner
  const curatedGallery = getCuratedGalleryImages(school.id);
  
  // Build banner images array from curated gallery with defensive normalization
  const bannerImages = curatedGallery && curatedGallery.length > 0
    ? curatedGallery.map(img => ({ 
        src: img.src || '', 
        alt: img.alt || `${school.name} gallery image` 
      })).filter(img => img.src)
    : undefined;

  return (
    <div className="min-h-screen bg-background">
      <SchoolProfileBanner
        schoolName={school.name}
        location={displayLocation}
        onInquire={handleInquire}
        bannerImages={bannerImages}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <AboutSchoolSection 
              schoolName={school.name}
              location={displayLocation}
            />

            <Card>
              <CardContent className="pt-6">
                <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
                  <MapPin className="h-6 w-6 text-primary" />
                  Quick Info
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Location</p>
                    <div className="mt-1">
                      {locationBreadcrumbs.length > 0 ? (
                        <div className="flex flex-wrap items-center gap-2">
                          {locationBreadcrumbs.map((crumb, index) => (
                            <div key={crumb.path} className="flex items-center gap-2">
                              <button
                                onClick={() => navigate({ to: crumb.path })}
                                className="text-base font-medium text-primary hover:underline"
                              >
                                {crumb.label}
                              </button>
                              {index < locationBreadcrumbs.length - 1 && (
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-base">{displayLocation}</p>
                      )}
                    </div>
                  </div>
                  {teachers && teachers.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Teachers</p>
                      <div className="mt-1 flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <p className="text-base">{teachers.length} {teachers.length === 1 ? 'Teacher' : 'Teachers'}</p>
                      </div>
                    </div>
                  )}
                  {trainings && trainings.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Training Programs</p>
                      <div className="mt-1 flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-primary" />
                        <p className="text-base">{trainings.length} {trainings.length === 1 ? 'Program' : 'Programs'}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {trainings && trainings.length > 0 && (
              <SchoolTrainingCoursesSection 
                trainings={trainings} 
                schoolId={school.id}
                onInquire={handleInquire}
              />
            )}

            {teachers && teachers.length > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
                    <Users className="h-6 w-6 text-primary" />
                    Our Teachers
                  </h2>
                  <TeacherList teachers={teachers} />
                </CardContent>
              </Card>
            )}

            <ImageGallerySection />

            {school.videoUrl && (
              <SchoolVideoEmbedSection videoUrl={school.videoUrl} />
            )}

            <FAQSection faqs={defaultSchoolFAQs} />

            <SchoolReviewsSection schoolId={school.id} />
          </div>

          <div className="space-y-8">
            <div ref={inquiryFormRef}>
              <SchoolInquiryFormSection schoolName={school.name} />
            </div>

            <SchoolMapSection location={displayLocation} schoolName={school.name} />

            <SimilarSchoolsSection currentSchoolId={school.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
