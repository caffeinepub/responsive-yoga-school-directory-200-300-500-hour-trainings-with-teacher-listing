# Specification

## Summary
**Goal:** Add a Google Maps location option and a Similar Schools section to School Detail pages.

**Planned changes:**
- Add a Location/Map section on `/school/$schoolId` that uses the existing `school.location` text to provide an “Open in Google Maps” external link (new tab) and a graceful empty state when location is missing.
- Create a reusable `SchoolMapSection` React component that builds a valid Google Maps URL from a provided location string and can render a responsive embedded iframe or a link-only fallback without any API key.
- Add a “Similar Schools” section on the School Detail page that suggests a small set of other schools (excluding the current one) from existing data, shows each school’s name and location, links to its detail page, and displays an English empty state when none are found.

**User-visible outcome:** On a school’s detail page, users can open the school location in Google Maps (and optionally view an embedded map when available), and can browse and navigate to a list of similar schools.
