# Specification

## Summary
**Goal:** Make the School Detail profile banner display a multi-image carousel that matches the interactive style of the directory School Card media carousel while keeping the current overlay content and behavior.

**Planned changes:**
- Update `frontend/src/components/school/SchoolProfileBanner.tsx` to support a banner image carousel when multiple images are provided, including accessible Previous/Next controls, keyboard navigation consistent with the School Card carousel, and a graceful image-load failure fallback.
- Keep the existing banner gradient overlay readability treatment, school name + location display, and optional “Inquire Now” button behavior unchanged.
- Update `frontend/src/pages/SchoolDetailPage.tsx` to pass curated gallery images from `getCuratedGalleryImages(school.id)` into the School Profile banner when available, falling back to the existing default banner image when not.
- Ensure any newly added aria-labels and any visible fallback messaging for the banner are in English.

**User-visible outcome:** On a school’s detail page, the top banner can be browsed as a carousel through curated school images (with accessible controls and keyboard support), and schools without curated images continue to show the existing single default banner.
