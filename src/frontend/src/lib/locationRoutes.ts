/**
 * Utility functions for building and parsing location routes
 */

/**
 * Encodes a location segment for use in URLs
 */
export function encodeLocationSegment(segment: string): string {
  return encodeURIComponent(segment.trim());
}

/**
 * Decodes a location segment from a URL
 */
export function decodeLocationSegment(segment: string): string {
  return decodeURIComponent(segment);
}

/**
 * Builds a location route path from structured location components
 */
export function buildLocationRoute(
  country?: string,
  state?: string,
  city?: string
): string {
  const segments: string[] = ['/location'];

  if (country) {
    segments.push(encodeLocationSegment(country));
    if (state) {
      segments.push(encodeLocationSegment(state));
      if (city) {
        segments.push(encodeLocationSegment(city));
      }
    }
  }

  return segments.join('/');
}

/**
 * Generates breadcrumb links for a location
 */
export interface LocationBreadcrumb {
  label: string;
  path: string;
}

export function buildLocationBreadcrumbs(
  country?: string,
  state?: string,
  city?: string
): LocationBreadcrumb[] {
  const breadcrumbs: LocationBreadcrumb[] = [];

  if (country) {
    breadcrumbs.push({
      label: country,
      path: buildLocationRoute(country),
    });

    if (state) {
      breadcrumbs.push({
        label: state,
        path: buildLocationRoute(country, state),
      });

      if (city) {
        breadcrumbs.push({
          label: city,
          path: buildLocationRoute(country, state, city),
        });
      }
    }
  }

  return breadcrumbs;
}
