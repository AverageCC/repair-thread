# Repair Thread — web identity / edition 02

The landing page uses oversized sans-serif headings, an italic Georgia accent, warm ivory (#F7F7EF), forest (#173F35), and restrained lime (#D2EB8B) for scan and completion indicators. The existing continuous-R symbol remains the product signature. No font downloads are required.

## Editable assets
- public/brand/editorial-social.svg: 1200 × 630 social/launch artwork. SVG text uses installed system fonts.
- src/ProductSequence.jsx and src/landing.css: original editable dimensional phone, equipment label, scan beam, review UI and saved-state composition.
- Existing SVG marks and software icon remain available in public/brand.

## Motion
Ten-second timeline: 0–3.5s capture; 3.5–7s review and unit association; 7–10s saved state. Scrolling controls the timeline with no visible playback controls. A sticky section pins the story during normal page scrolling; it never intercepts wheel or touch input. A skip link goes directly to the real scanner. Reduced-motion preferences disable scroll scrubbing and display the final state; the final state remains static.

This is a browser-native animation, not an MP4 or recorded app demonstration. All on-screen equipment is illustrative. The separate camera demo performs actual local OCR and does not save a record. Do not present generated identifiers as verified real equipment.

## Provenance
Higgsfield image/video submissions were rejected by account plan restrictions and produced no media. The user selected a custom animated sequence instead. The replacement artwork and motion are original code/vector assets created for Repair Thread; no stock photographs or paid fonts are used.

## Implementation
LandingScanner and CameraCapture remain unchanged. Marketing styles are scoped to the landing page. Public Windows download continues to point to the published 0.2.0 release; this web design update does not replace the installer.
