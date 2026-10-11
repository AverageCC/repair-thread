# Repair Thread

**Property maintenance, connected.**

A working, phone-friendly prototype that connects equipment labels, unit inventory, repair requests, approval decisions, and replacement history. Built for property managers who need the whole story behind “the dishwasher in 304B.”

## Run locally

Use Node.js 22.12+ and pnpm 11.

```sh
pnpm install
pnpm dev
pnpm test
pnpm build
```

Open the localhost URL printed by Vite. No API keys or environment variables are required. Vercel uses the included build settings and serves `dist`.

## Try the complete workflow

1. Open **Properties & units** and find **304B**. Each asset has its own model, serial, and evidence.
2. Choose **Scan equipment**. Upload a clear label photo or use the synthetic demo label. Real Tesseract OCR runs in your browser; correct the extracted fields and confirm review before saving.
3. Report an issue against an asset. The thread retains the unit and equipment context.
4. As **Coordinator**, create a repair or replacement proposal with an itemized estimate.
5. Switch to the **Approver demo role**. Approve, reject, or request changes. A revision requires a new decision and keeps the old proposal.
6. As Coordinator, record the external fulfillment reference. Complete the repair or capture replacement equipment. The original asset remains in history and exports.
7. Refresh to verify local persistence. Export inventory CSV or a JSON snapshot from the workspace controls.

## What works

- Property/unit search and new unit creation; equipment records tied to units.
- Image upload, on-device OCR, raw extraction evidence, human correction and review.
- Repair requests, proposal revisions, itemized estimates, exact-version decisions.
- External supplier links and fulfillment notes; replacement lineage and audit timeline.
- Browser persistence, CSV export, JSON snapshot, record printing, responsive layouts.
- Custom SVG identity, CSS design tokens, and a downloadable web brand guide.

## Prototype boundaries

This is a **single-browser demonstration, not a production multi-tenant service**. Each visitor has separate IndexedDB data. Role switching simulates the workflow and is **not authentication or authorization**. Use one tab for edits; simultaneous tab changes can overwrite each other. Browser data can be cleared or evicted. Export a snapshot before resetting; JSON restore is not implemented.

OCR processes the image locally. The web app loads bundled OCR files from its own host. The installed desktop app includes the worker, WASM engines and English model and can analyze labels offline. No image is sent to an AI API. OCR can misread characters; a human must confirm the label. Manual entry remains available. The sample label is synthetic.

Orders are **not placed** by this app. There is no live parts catalog, verified compatibility, automatic diagnosis, payment collection, tenant invitation, email delivery, PMS integration, or shared cloud database. There is no trademark clearance implied by this repository. Sample people, properties, quotes and identifiers are fictitious demonstration data.

## Project map

| Path | Purpose |
| --- | --- |
| `src/main.jsx` | Application views and browser workflows |
| `src/domain.js` | Proposal, approval, replacement, export rules |
| `src/style.css` | Responsive product design |
| `tests/domain.test.js` | Workflow invariant tests |
| `public/brand/guide.html` | Standalone brand kit and downloadable assets |
| `public/brand/tokens.css` | Reusable software design tokens |
| `docs/PRD.md` | Product requirements and release boundaries |
| `docs/BRAND.md` | Identity rules and asset usage |

## Before a paid pilot

Implement server authentication, tenant isolation, server-enforced roles, durable database/object storage, signed resident links, backup/restore, concurrency control and a tamper-resistant audit log. Test those controls with two independent organizations. Add verified supplier references and PMS integration only after validating the workflow with real managers. See the PRD for acceptance criteria; prototype simulation does not satisfy production requirements.

## Asset and dependency notes

The custom Repair Thread mark and SVG assets are editable source assets intended for this software. Brand assets do not establish trademark rights. No open-source license has been selected for this project; publishing source does not grant a general reuse license. Third-party libraries retain their own licenses. The UI uses installed system fonts and does not redistribute font files. Lucide icons are provided by `lucide-react` under its ISC license.

## Desktop and live camera (v0.2.0)

- Visit `/` for the landing page and Windows download; `/app` opens the workspace.
- Visit `/app?capture=1` to open camera capture directly. Choose **Use live camera**, allow camera access, frame the label, then choose **Capture label & analyze**. Stop/close ends the camera tracks. Audio is never requested.
- The Windows installer is for Windows 10/11 x64. It is unsigned; verify the SHA-256 checksum on the GitHub release. No signing certificate is included.
- Desktop data stays in Electron's local app profile and is separate from browser data. The app serves its bundled files only on `127.0.0.1:47831`; it does not expose a LAN server. Port conflicts produce a startup error rather than switching to a different data origin.
- The installer offers a destination folder, Start menu entry, desktop shortcut and uninstaller. Uninstall retains the local profile; export records before removing local data manually.
- If camera permission is denied, use Windows camera privacy settings or browser site settings, then retry. If no camera is connected, image upload and synthetic label OCR still work.

```sh
pnpm desktop   # build and launch local desktop app
pnpm dist:win  # Windows NSIS installer in release/
```

`pnpm prepare:ocr` copies pinned package assets into `public/ocr` before dev/build; generated OCR files and release binaries are not checked into source. Electron runs with a sandbox, context isolation and Node integration disabled. Camera access is limited to the local app origin and video; external pages open in the system browser.
