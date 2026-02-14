/**
 * Deterministic thumbnail selector for school cards.
 * Maps school IDs to one of 6 available demo thumbnails.
 */

const THUMBNAIL_PATHS = [
  '/assets/generated/school-thumb-01.dim_1200x800.jpg',
  '/assets/generated/school-thumb-02.dim_1200x800.jpg',
  '/assets/generated/school-thumb-03.dim_1200x800.jpg',
  '/assets/generated/school-thumb-04.dim_1200x800.jpg',
  '/assets/generated/school-thumb-05.dim_1200x800.jpg',
  '/assets/generated/school-thumb-06.dim_1200x800.jpg',
];

/**
 * Simple hash function to convert a string to a number
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Get a deterministic thumbnail path for a school ID
 */
export function getSchoolThumbnail(schoolId: string): string {
  const hash = simpleHash(schoolId);
  const index = hash % THUMBNAIL_PATHS.length;
  return THUMBNAIL_PATHS[index];
}

/**
 * Get the default fallback thumbnail
 */
export function getDefaultThumbnail(): string {
  return THUMBNAIL_PATHS[0];
}
