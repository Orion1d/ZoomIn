# ZoomIn — Inline Maps for Google

**ZoomIn** adds an interactive Google Maps embed directly to Google Search results whenever you search for a place. No tab switching. No extra clicks. Just open Google, search, and the map is already there.

---

## Features

- **Instant interactive map** — replaces the static thumbnail with a live, pannable map
- **Location-aware** — only activates when Google detects a place or address in your search
- **Lightweight** — one content script, zero external requests, no background service worker
- **Toggle on/off** — click the toolbar icon to enable or disable at any time
- **Privacy-first** — no data collected, no analytics, everything runs locally in your browser

## Installation

### Chrome Web Store
*(Coming soon)*

### Manual (Developer Mode)
1. Download or clone this repository
2. Open `chrome://extensions/`
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** → select the project folder
5. Done — search for any place on Google

## How It Works

1. You search for a location on Google (e.g. "Yaylada AVM Maltepe")
2. ZoomIn detects that Google is showing a knowledge panel with a map
3. An interactive Google Maps iframe is inserted at the top of the results panel
4. You can pan, zoom, and explore — without ever leaving the search results page

## Permissions

| Permission | Why |
|---|---|
| `storage` | Saves your on/off preference |
| `tabs` | Sends toggle message to the active tab |
| `host_permissions: google.com` | Runs the content script on Google Search pages only |

## Privacy

ZoomIn collects **nothing**. There are no analytics, no remote servers, no tracking pixels. The only network request made is the Google Maps iframe — the same one Google would show you anyway.

See [PRIVACY_POLICY.md](PRIVACY_POLICY.md) for full details.

## License

All Rights Reserved. Copyright © 2026 ZoomIn
