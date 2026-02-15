import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';

interface BannerImage {
  src: string;
  alt: string;
}

interface SchoolProfileBannerProps {
  schoolName: string;
  location: string;
  onInquire?: () => void;
  bannerImages?: BannerImage[];
}

export default function SchoolProfileBanner({
  schoolName,
  location,
  onInquire,
  bannerImages,
}: SchoolProfileBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  // Build slide list: use provided bannerImages or fall back to default
  const slides: BannerImage[] = bannerImages && bannerImages.length > 0
    ? bannerImages
    : [{ src: '/assets/generated/school-profile-banner.dim_1600x420.png', alt: schoolName }];

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrevious();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  const handleImageError = (index: number) => {
    setImageError((prev) => ({ ...prev, [index]: true }));
  };

  // Reset error state when slide changes
  useEffect(() => {
    setImageError({});
  }, [currentSlide]);

  const currentImage = slides[currentSlide];
  const hasMultipleSlides = slides.length > 1;

  return (
    <div 
      className="relative h-[420px] w-full overflow-hidden bg-muted"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="School banner carousel"
    >
      {/* Background Image */}
      {!imageError[currentSlide] ? (
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => handleImageError(currentSlide)}
        />
      ) : (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-muted">
          <ImageOff className="h-16 w-16 text-muted-foreground" />
        </div>
      )}
      
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
      
      {/* Navigation Controls - Always Visible */}
      {hasMultipleSlides && (
        <>
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            aria-label="Previous photo"
            className="absolute left-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 md:p-3"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          
          {/* Next Button */}
          <button
            onClick={handleNext}
            aria-label="Next photo"
            className="absolute right-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 md:p-3"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          
          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to photo ${index + 1}`}
                aria-current={index === currentSlide ? 'true' : 'false'}
                className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white/50 ${
                  index === currentSlide 
                    ? 'w-8 bg-white' 
                    : 'w-2 bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </>
      )}
      
      {/* Content Overlay - Left Aligned */}
      <div className="absolute inset-0 z-10 flex items-end">
        <div className="w-full px-6 pb-16 md:px-12 md:pb-20">
          <div className="max-w-7xl">
            <h1 className="mb-2 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              {schoolName}
            </h1>
            <div className="mb-4 flex items-center gap-2 text-base text-white/95 md:text-lg">
              <MapPin className="h-4 w-4 flex-shrink-0 md:h-5 md:w-5" />
              <span>{location}</span>
            </div>
            {onInquire && (
              <Button
                size="lg"
                onClick={onInquire}
                className="mt-2 bg-primary hover:bg-primary/90"
              >
                Inquire Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
