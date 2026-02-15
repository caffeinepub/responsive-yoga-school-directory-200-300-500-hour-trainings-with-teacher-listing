# Specification

## Summary
**Goal:** Add structured school locations (Country > State > City) and shareable, deep-linkable location/course URLs for promotion.

**Planned changes:**
- Extend the backend School model to include optional `country`, `state`, and `city` fields while preserving the existing `location` text field for backward compatibility.
- Update backend school create/update flows to accept and store structured location fields, and ensure existing public queries still return School objects with the new fields.
- Add a new public backend query method to fetch schools by structured location (country, optionally state and city) for anonymous callers.
- Update the Admin Dashboard Schools management UI to collect Country/State/City, persist them, and display the composed location as Country > State > City (with sensible fallbacks).
- Update school-facing UI components to display location as Country > State > City wherever shown, falling back to legacy `school.location` when structured fields are missing.
- Add location routes and a location listing page (country/state/city) that loads schools via the new backend location-filter query and includes English loading/empty/error states.
- Add location breadcrumbs/links on School Detail pages that navigate to the corresponding location listing URLs.
- Add “Copy link” controls on Training Curriculum pages and on location listing pages with English success/error messaging and a manual-copy fallback.

**User-visible outcome:** Admins can enter structured locations for schools; users see locations consistently as Country > State > City, can browse schools via shareable location URLs, and can copy promotional links for both location pages and training pages.
