/**
 * Utility functions for formatting and handling structured location data
 */

export interface StructuredLocation {
  country?: string;
  state?: string;
  city?: string;
}

/**
 * Composes a location string from structured fields in Country > State > City order
 * Falls back to legacy location text if structured fields are not available
 */
export function formatStructuredLocation(
  location: StructuredLocation & { location?: string }
): string {
  const parts: string[] = [];

  if (location.country) parts.push(location.country);
  if (location.state) parts.push(location.state);
  if (location.city) parts.push(location.city);

  if (parts.length > 0) {
    return parts.join(' > ');
  }

  // Fallback to legacy location field
  return location.location || '';
}

/**
 * Sanitizes and normalizes a location segment for display
 */
export function sanitizeLocationSegment(segment: string | undefined): string {
  if (!segment) return '';
  return segment.trim();
}

/**
 * Checks if a school has structured location data
 */
export function hasStructuredLocation(location: StructuredLocation): boolean {
  return !!(location.country || location.state || location.city);
}
