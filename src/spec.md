# Specification

## Summary
**Goal:** Update the School Detail page banner to display a single-row, 4-tile photo strip (no collage) and adjust photo navigation/overlays to match the provided reference.

**Planned changes:**
- Update `frontend/src/components/school/SchoolProfileBanner.tsx` to render banner images as a single horizontal row of up to 4 tiles on desktop/wide layouts (not a 2x2 grid), using `object-cover` with consistent tile aspect handling.
- Ensure the banner degrades gracefully when fewer images exist (e.g., 1 image renders as a single full-width tile; no empty placeholders).
- Keep the existing dark gradient readability overlay and ensure school name and location remain visible and readable over the banner images.
- Adjust banner controls for multi-page photo sets: keep left/right navigation arrows (mouse + keyboard) with English `aria-label`s, and replace the centered remaining-count overlay with a compact “See photos {remainingCount}” overlay on the last visible (4th) tile when additional photos exist.
- Ensure the “See photos {remainingCount}” overlay placement does not interfere with the school name/location overlay and that navigation does not cause layout shift.

**User-visible outcome:** On the School Detail page, users see a clean 4-photo horizontal banner strip like the reference, can page through more photos using arrows, and can see a “See photos {count}” cue on the last tile when additional photos are available.
