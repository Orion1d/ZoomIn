# Changelog

## [2.0.0] — 2026-09-15

### Changed
- Complete rewrite — lighter, faster, cleaner codebase
- Map now inserts at the top of the Google knowledge panel
- Detection now uses reliable page signals (map tiles, address attributes, directions links) instead of the search query text
- Popup redesigned: minimal dark UI, brand + toggle only
- Removed all DOM manipulation of Google's original elements — nothing is hidden or moved
- Dropped unused CSS content script
- Bumped version to 2.0.0 to reflect the new approach

## [1.0.0] — 2025-01-XX

### Added
- Initial public release
- Interactive Google Maps embed on Google Search results
- Popup with on/off toggle
- Settings persistence via `chrome.storage.sync`
