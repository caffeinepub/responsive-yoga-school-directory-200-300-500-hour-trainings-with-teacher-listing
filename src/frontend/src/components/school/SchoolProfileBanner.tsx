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
  const [currentPage, setCurrentPage] = useState(0);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  // Build slide list: use provided bannerImages or fall back to default
  const allImages: BannerImage[] = bannerImages && bannerImages.length > 0
    ? bannerImages
    : [{ src: '/assets/generated/school-profile-banner.dim_1600x420.png', alt: schoolName }];

  // Calculate pagination (4 images per page in single horizontal row)
  const imagesPerPage = 4;
  const totalPages = Math.ceil(allImages.length / imagesPerPage);
  const startIndex = currentPage * imagesPerPage;
  const visibleImages = allImages.slice(startIndex, startIndex + imagesPerPage);
  const remainingCount = allImages.length - (startIndex + imagesPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
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

  const handleImageError = (absoluteIndex: number) => {
    setImageError((prev) => ({ ...prev, [absoluteIndex]: true }));
  };

  // Reset error state when page changes
  useEffect(() => {
    setImageError({});
  }, [currentPage]);

  const hasMultiplePages = totalPages > 1;

  return (
    <div 
      className="relative h-[420px] w-full overflow-hidden bg-muted"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="School banner with photo gallery"
    >
      {/* Single horizontal row layout */}
      <div className="absolute inset-0 flex h-full w-full">
        {visibleImages.length === 1 ? (
          // Single image: full width
          <div className="relative w-full overflow-hidden">
            {!imageError[startIndex] ? (
              <img
                src={visibleImages[0].src}
                alt={visibleImages[0].alt}
                className="h-full w-full object-cover"
                onError={() => handleImageError(startIndex)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <ImageOff className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>
        ) : (
          // Multiple images: 4 equal-width tiles in a row
          visibleImages.map((image, index) => {
            const absoluteIndex = startIndex + index;
            const isLastTile = index === 3 && remainingCount > 0;
            
            return (
              <div key={absoluteIndex} className="relative flex-1 overflow-hidden">
                {!imageError[absoluteIndex] ? (
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                    onError={() => handleImageError(absoluteIndex)}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <ImageOff className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                
                {/* Compact "See photos {count}" overlay on 4th tile - positioned top-right */}
                {isLastTile && (
                  <div className="absolute right-4 top-4 rounded-lg bg-black/75 px-4 py-2 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-white">
                      <ImageOff className="h-4 w-4" />
                      <span className="text-sm font-medium whitespace-nowrap">
                        See photos {remainingCount}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30 pointer-events-none" />
      
      {/* Navigation Controls - Only show if more than 4 images */}
      {hasMultiplePages && (
        <>
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            aria-label="Previous photos"
            className="absolute left-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 md:p-3"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          
          {/* Next Button */}
          <button
            onClick={handleNext}
            aria-label="Next photos"
            className="absolute right-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 md:p-3"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          
          {/* Page Indicators */}
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                aria-label={`Go to page ${index + 1}`}
                aria-current={index === currentPage ? 'true' : 'false'}
                className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white/50 ${
                  index === currentPage 
                    ? 'w-8 bg-white' 
                    : 'w-2 bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </>
      )}
      
      {/* Content Overlay - Left Aligned */}
      <div className="absolute inset-0 z-10 flex items-end pointer-events-none">
        <div className="w-full px-6 pb-16 md:px-12 md:pb-20 pointer-events-auto">
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
