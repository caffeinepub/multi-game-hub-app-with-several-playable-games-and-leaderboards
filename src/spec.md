# Specification

## Summary
**Goal:** Expand the frontend game catalog to support up to 50 games, including metadata for types like “funny” and “hard”, while keeping the hub usable via basic discovery controls.

**Planned changes:**
- Extend `frontend/src/gameRegistry.ts` with additional game entries (up to 50 total), ensuring unique `id` values and English `title`/`description`, with many entries marked as not yet playable.
- Update the `GameInfo` model to include optional metadata (e.g., tags and/or difficulty) and display it on the Hub, Game Shell, and All Leaderboards pages when present without breaking existing pages.
- Add hub discovery controls: a title text search and a category filter (based on existing category values) to keep navigation usable with a large catalog.
- Add lightweight runtime/dev validation that warns in the browser console for registry issues (more than 50 games and/or duplicate IDs) without crashing the app.

**User-visible outcome:** The hub can show a much larger catalog (up to 50 games) with “funny”/“hard” style metadata where available, and users can quickly find games using search and category filtering while existing playable games continue to work as before.
