# Specification

## Summary
**Goal:** Make the Hub game catalog easier to browse by grouping games into category sections when “All Categories” is selected, while preserving existing search and game-card behavior.

**Planned changes:**
- Update the Hub page “All Categories” view to render games grouped into separate sections by `game.category`, each with a clear category heading and its own game list/grid.
- Keep the existing search behavior, ensuring the grouped sections update dynamically based on the current search query and hide category sections with zero matching games.
- When a specific category filter is selected (not “all”), continue to show only that category’s results (single section or ungrouped list) while preserving the existing game-card UI, Play/Coming Soon behavior, and accurate “Showing X games” messaging.

**User-visible outcome:** On the Hub page, selecting “All Categories” shows games grouped under category headings (only for categories with matches), and selecting a specific category continues to show the filtered results with the same cards and controls as before.
