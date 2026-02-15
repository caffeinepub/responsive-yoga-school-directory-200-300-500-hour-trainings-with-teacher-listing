import { useState } from 'react';
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
    <div className="relative h-[420px] w-full overflow-hidden group">
      {!imageError[currentSlide] ? (
        <img
          src={slides[currentSlide].src}
          alt={slides[currentSlide].alt}
          className="h-full w-full object-cover"
          onError={() => setImageError({ ...imageError, [currentSlide]: true })}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted">
          <ImageOff className="h-16 w-16 text-muted-foreground" />
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      
      {slides.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            onKeyDown={handleKeyDown}
            aria-label="Previous photo"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100 focus:opacity-100 z-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={handleNext}
            onKeyDown={handleKeyDown}
            aria-label="Next photo"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100 focus:opacity-100 z-10"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide(index);
                }}
                aria-label={`Go to photo ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-white w-6' 
                    : 'bg-white/50 hover:bg-white/75 w-2.5'
                }`}
              />
            ))}
          </div>
        </>
      )}
      
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-4 pb-12">
          <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">
            {schoolName}
          </h1>
          <div className="flex items-center gap-2 text-lg text-white/90">
            <MapPin className="h-5 w-5" />
            <span>{location}</span>
          </div>
          {onInquire && (
            <Button
              size="lg"
              onClick={onInquire}
              className="mt-6"
            >
              Inquire Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
