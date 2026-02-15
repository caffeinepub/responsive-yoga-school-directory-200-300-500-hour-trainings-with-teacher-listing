import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, ArrowRight, ImageOff, ChevronLeft, ChevronRight } from 'lucide-react';
import type { School } from '@/backend';
import { useSchoolCardData } from '@/hooks/useSchoolCardData';
import { getSchoolThumbnail } from '@/lib/schoolThumbnails';
import { getCuratedThumbnail, getCuratedGalleryImages } from '@/lib/curatedSchoolMedia';
import { formatStructuredLocation } from '@/lib/locationFormat';

interface SchoolCardProps {
  school: School;
}

export default function SchoolCard({ school }: SchoolCardProps) {
  const navigate = useNavigate();
  const { trainings, teachers, isLoading } = useSchoolCardData(school.id);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleViewDetails = () => {
    navigate({ to: '/school/$schoolId', params: { schoolId: school.id } });
  };

  // Build slide list: prefer curated gallery + thumbnail, fall back to deterministic thumbnail
  const curatedGallery = getCuratedGalleryImages(school.id);
  const curatedThumb = getCuratedThumbnail(school.id);
  const fallbackThumbnail = getSchoolThumbnail(school.id);

  const slides: string[] = [];
  
  if (curatedGallery && curatedGallery.length > 0) {
    // Use curated gallery images
    slides.push(...curatedGallery.map(img => img.src));
    // Include curated thumbnail if it's not already in the gallery
    if (curatedThumb && !slides.includes(curatedThumb)) {
      slides.unshift(curatedThumb);
    }
  } else if (curatedThumb) {
    // Only curated thumbnail available
    slides.push(curatedThumb);
  } else {
    // Fall back to deterministic thumbnail
    slides.push(fallbackThumbnail);
  }

  const displayLocation = formatStructuredLocation(school);

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-video w-full overflow-hidden bg-muted group">
        {!imageError[currentSlide] ? (
          <img
            src={slides[currentSlide]}
            alt={`${school.name} - Photo ${currentSlide + 1}`}
            className="h-full w-full object-cover"
            onError={() => setImageError({ ...imageError, [currentSlide]: true })}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <ImageOff className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        
        {slides.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              onKeyDown={handleKeyDown}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100 focus:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              onKeyDown={handleKeyDown}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100 focus:opacity-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(index);
                  }}
                  aria-label={`Go to photo ${index + 1}`}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentSlide 
                      ? 'bg-white w-4' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </>
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
