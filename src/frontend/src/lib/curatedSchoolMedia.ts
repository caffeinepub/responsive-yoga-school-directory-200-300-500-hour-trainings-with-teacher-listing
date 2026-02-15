/**
 * Curated media helper for specific schools with custom photos/videos.
 * Returns static asset paths for directory thumbnails and gallery images.
 */

interface GalleryImage {
  src: string;
  alt: string;
}

interface CuratedMedia {
  thumbnail: string;
  galleryImages: GalleryImage[];
}

/**
 * Get curated media for Vinyasa Yogashala school
 */
function getVinyasaYogashalaCuratedMedia(): CuratedMedia {
  return {
    thumbnail: '/assets/generated/vinyasa-yogashala-thumb.dim_1200x800.jpg',
    galleryImages: [
      {
        src: '/assets/generated/vinyasa-yogashala-gallery-01.dim_1200x800.jpg',
        alt: 'Vinyasa Yogashala yoga training classroom scene',
      },
      {
        src: '/assets/generated/vinyasa-yogashala-gallery-02.dim_1200x800.jpg',
        alt: 'Vinyasa Yogashala yoga hall and studio interior',
      },
      {
        src: '/assets/generated/vinyasa-yogashala-gallery-03.dim_1200x800.jpg',
        alt: 'Vinyasa Yogashala retreat accommodation and campus environment',
      },
      {
        src: '/assets/generated/vinyasa-yogashala-gallery-04.dim_1200x800.jpg',
        alt: 'Vinyasa Yogashala outdoor building and campus exterior',
      },
      {
        src: '/assets/generated/vinyasa-yogashala-gallery-05.dim_1200x800.jpg',
        alt: 'Vinyasa Yogashala group yoga class practice session',
      },
      {
        src: '/assets/generated/vinyasa-yogashala-gallery-06.dim_1200x800.jpg',
        alt: 'Vinyasa Yogashala reception lobby and entrance area',
      },
      {
        src: '/assets/generated/vinyasa-yogashala-gallery-07.dim_1200x800.jpg',
        alt: 'Vinyasa Yogashala student accommodation rooms and facilities',
      },
      {
        src: '/assets/generated/vinyasa-yogashala-gallery-08.dim_1200x800.jpg',
        alt: 'Vinyasa Yogashala training materials, books, and yoga props',
      },
    ],
  };
}

/**
 * Check if a school has curated media and return it
 */
export function getCuratedSchoolMedia(schoolId: string): CuratedMedia | null {
  // Match by deterministic school ID
  if (schoolId === 'vinyasa-yogashala') {
    return getVinyasaYogashalaCuratedMedia();
  }
  
  return null;
}

/**
 * Get curated thumbnail for a school, or null if none exists
 */
export function getCuratedThumbnail(schoolId: string): string | null {
  const curatedMedia = getCuratedSchoolMedia(schoolId);
  return curatedMedia?.thumbnail ?? null;
}

/**
 * Get curated gallery images for a school, or null if none exist
 */
export function getCuratedGalleryImages(schoolId: string): GalleryImage[] | null {
  const curatedMedia = getCuratedSchoolMedia(schoolId);
  return curatedMedia?.galleryImages ?? null;
}
