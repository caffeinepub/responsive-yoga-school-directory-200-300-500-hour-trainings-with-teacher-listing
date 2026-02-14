# Specification

## Summary
**Goal:** Stop the Directory page from repeatedly showing “Failed to load schools” by making the backend schools search reliable for anonymous users and ensuring demo/seed schools exist after deploys/upgrades, plus add an in-page retry action.

**Planned changes:**
- Backend: Make `searchSchoolsByName("")` always succeed for anonymous callers and always return a `[School]` (including `[]` when no schools exist), without trapping/rejecting.
- Backend: Add idempotent seed/demo data initialization so a fresh deploy and subsequent upgrades/redeploys result in a non-empty school list discoverable via `searchSchoolsByName("")`, without duplicate-key traps when seeding runs multiple times.
- Frontend: Keep the existing English error message exactly as-is, and add a clearly labeled “Retry” control that triggers a React Query refetch of the schools query (no full page refresh required).

**User-visible outcome:** The Directory page reliably loads schools by default after deploy/upgrade; if loading fails, the page shows the same error message plus a “Retry” button that can recover and load the schools list once the backend is available.
