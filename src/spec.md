# Specification

## Summary
**Goal:** Fix the Directory page showing no schools by ensuring the backend always has browseable seeded School data for anonymous users after install/upgrade, persists directory data across upgrades, and the frontend renders (and errors) correctly based on backend results.

**Planned changes:**
- Update the Motoko backend seeding so demo Schools are always available immediately after canister install and after upgrades, with idempotent behavior (no duplicates/traps) and required related demo data (Teachers/Trainings with 100/200/300/500 hour categories).
- Add stable persistence in `backend/main.mo` using `preupgrade()`/`postupgrade()` to snapshot and restore Schools, Teachers, Trainings, Reviews, UserProfiles, and BlogPosts without clearing existing records.
- Make backend directory queries safe for anonymous browsing by returning empty arrays (not trapping) when related data is missing for `searchSchoolsByName("")`, `getTeachersBySchool`, and `getTrainingsBySchool`.
- Adjust the frontend Directory data-fetching/rendering so a successful empty array shows the existing empty state (not the destructive error banner), while real failures still show the existing error message and Retry re-runs the query.

**User-visible outcome:** The Directory reliably shows seeded schools for anonymous users after install and after upgrades, and the page displays either a school grid, an empty state, or a recoverable error state depending on the backend response.
