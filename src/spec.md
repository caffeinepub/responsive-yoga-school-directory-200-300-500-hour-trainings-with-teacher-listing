# Specification

## Summary
**Goal:** Add configurable, accessible social profile links to the site header and footer.

**Planned changes:**
- Create a reusable Social Links component driven by a single centralized configuration, rendering only social items with non-empty URLs and nothing when all URLs are empty.
- Add a “Follow us” label plus a horizontal row of social icons/links to the global footer, matching existing footer typography and muted styling without breaking current footer links.
- Add social icons/links to the global header in a space-efficient way that preserves desktop and mobile navigation layouts (desktop near existing controls; mobile accessible via the dropdown/menu if needed).

**User-visible outcome:** Visitors can quickly open the site’s social profiles from both the header and footer, with consistent styling and accessible, secure new-tab links.
