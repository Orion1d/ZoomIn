# Privacy Policy — ZoomIn

**Effective date: September 16, 2026**

---

## Who we are

ZoomIn is a Chrome browser extension that embeds an interactive Google Maps preview directly into Google Search results pages when a place or address is detected. It is developed and maintained by Orion1d.

---

## What data we collect

**We collect nothing.**

ZoomIn does not collect, transmit, store, or share any personal data, browsing history, search queries, location data, or any other information about you or your device. There are no analytics, no crash reports, and no telemetry of any kind.

---

## What happens locally

The only data the extension touches stays entirely inside your browser:

- **Your on/off preference** is saved using Chrome's built-in `chrome.storage.sync` API. This preference may sync across your own Chrome devices via your Google account — we have no access to it.
- **The current tab's URL** is read momentarily when you click the toggle in the popup, solely to check whether the active tab is a Google Search page before sending a toggle message. The URL is never stored or transmitted anywhere.

---

## Third-party services

When ZoomIn detects a location search, it renders a Google Maps `<iframe>` using the same embed URL that Google itself uses (`maps.google.com/maps?output=embed`). This request goes directly from your browser to Google's servers — ZoomIn is not involved in or able to intercept it. Your interaction with that map is governed by [Google's Privacy Policy](https://policies.google.com/privacy).

---

## Permissions justification

| Permission | Purpose |
|---|---|
| `storage` | Saves your enabled/disabled preference locally in your browser |
| `tabs` | Reads the active tab's URL to confirm it is a Google Search page before sending a toggle message; no tab data is stored |
| `host_permissions: https://www.google.com/*` | Required to inject the content script that detects place searches and inserts the map |

---

## Children's privacy

ZoomIn does not collect any data from anyone, including children. The extension is a passive UI enhancement with no user accounts, forms, or input fields.

---

## Changes to this policy

If we ever make a meaningful change to how the extension works in relation to privacy, we will update this document and the effective date above. You can always view the latest version at:
`https://github.com/Orion1d/ZoomIn/blob/main/PRIVACY_POLICY.md`

---

## Contact

Questions? Open an issue at [github.com/Orion1d/ZoomIn](https://github.com/Orion1d/ZoomIn) or reach out through the Chrome Web Store listing.
