# Repair Thread

**Property maintenance, connected.**

Connect equipment labels to unit inventory, repair requests, approval decisions, and replacement history. Give property teams the whole story behind “the dishwasher in 304B.”

[Live website](https://repair-thread.vercel.app/) · [Workspace](https://repair-thread.vercel.app/app) · [Camera demo](https://repair-thread.vercel.app/#camera-demo) · [Brand guide](https://repair-thread.vercel.app/brand/guide.html)

## Product and resources

- Capture a label with a camera or upload a photo. Local Tesseract OCR extracts model and serial numbers for human review.
- Organize equipment by property/unit, create repair proposals, simulate approval decisions, and preserve replacement history.
- Use a responsive browser workspace or Windows desktop app with bundled offline OCR.
- Explore the scroll-driven product story, live scanner, editable brand assets, and phone walkthrough.

| Resource | Link |
| --- | --- |
| Pitch deck — 17 slides, including AI build story and scan example | [PowerPoint](docs/pitch/Repair-Thread-Pitch.pptx) · [PDF](docs/pitch/Repair-Thread-Pitch.pdf) |
| Demo images and presenter instructions | [Demo assets](docs/demo/README.md) |
| Sample label | [Model ABC12345 / Serial 98765432](docs/demo/05-live-ocr-test-label.png) |
| Editable mobile design | [Figma design](https://www.figma.com/design/XIPVueJM82EDvWHDhD8oIr) |
| Phone walkthrough | [Figma demo](https://www.figma.com/proto/XIPVueJM82EDvWHDhD8oIr/Repair-Thread-Mobile?node-id=2-12&starting-point-node-id=2%3A12&scaling=scale-down) |
| Requirements and brand | [PRD](docs/PRD.md) · [Identity](docs/BRAND.md) · [Web brand](docs/WEB-BRAND.md) |

Figma simulates a fixed sample flow without camera access or real storage. The website animation is illustrative; the separate scanner performs actual OCR. Deck pricing and projections are proposals, not measured revenue. Ask Repair Thread is implemented; live AI answers require a configured server and available API credit. See [assistant setup and limitations](docs/ASSISTANT.md).

## Ask Repair Thread

Open **Ask Repair Thread** from the sidebar or Overview. The attention list works locally without AI. Questions and follow-up drafts use OpenAI after explicit data-sharing consent. The selected project currently needs API credit; the public website also needs server credentials before live answers work. [Configuration and privacy details](docs/ASSISTANT.md).

## Run locally

Requirements: **Node.js 22.12+** and **pnpm 11**. The package-manager version is pinned in `package.json`.

```sh
git clone https://github.com/AverageCC/repair-thread.git
cd repair-thread
pnpm install
pnpm dev
```

Open the localhost URL printed by Vite. No API keys or environment variables are required. Camera access needs HTTPS or localhost and your permission.

```sh
pnpm test       # workflow and sample-cleanup tests
pnpm build      # production website in dist/
pnpm preview    # preview the production build
pnpm desktop    # build and launch Electron
pnpm dist:win   # Windows x64 installer in release/
```

`pnpm prepare:ocr` copies installed OCR assets into `public/ocr` before dev/build. Generated assets, dependencies, builds, and installer binaries are excluded from source control.

## Try the workflow

1. Add a property and unit, such as **Maple Court / 304B**. New workspaces start empty.
2. Choose **Scan equipment**, capture/upload a label or use the synthetic sample, review the identifiers, and save equipment to the unit.
3. Report an issue. As Coordinator, create an itemized repair or replacement proposal.
4. Switch to the Approver role to simulate a decision. Revised proposals require a new decision and retain earlier versions.
5. Record an external fulfillment reference, complete the repair, or capture replacement equipment. Previous equipment remains in history.
6. Refresh to check persistence; export inventory CSV or a JSON snapshot.

For the scanner-only demo, print the sample label, display it on another screen, or download it for image upload. Expected results: **model ABC12345**, **serial 98765432**. This is text recognition, not barcode lookup. The landing-page scanner displays captured fields without saving equipment; use the workspace to save records.

## Data and current capabilities

Records stay in **IndexedDB on the browser/device where they were created**. Desktop and browser records do not sync. Role switching simulates workflow; it is not authentication or authorization. Use one tab for edits because simultaneous changes can overwrite each other. Storage can be cleared or evicted; export important records. JSON export is available; JSON restore is not implemented.

The source removes untouched sample records while preserving user records, edited samples, and their related equipment/unit history. Before the first migration, the previous workspace is backed up locally under `repair-thread-v1-before-sample-cleanup`. New workspaces start empty; the synthetic OCR label remains available.

OCR processes images locally without sending them to an AI API. Human review is required because characters can be misread; manual entry remains available.

Orders are not placed by this app. Shared accounts, cloud storage, live parts catalogs, verified compatibility, payments, tenant invitations, email delivery, and PMS integrations are not implemented. Before a paid rollout, add organization isolation, server-enforced permissions, durable storage, backup/restore, concurrency controls, and a tamper-resistant audit trail. See the PRD for planned scope.

## Windows installer

Source version: **0.3.0**. The website still links to the published **0.2.0 Windows installer**, which does not automatically receive source updates. The 0.3.0 assistant installer is built locally under `release/assistant-package/`; it has not been published as a GitHub release. Installed copies do not receive this update automatically.

- [Public Windows release, notes and checksum](https://github.com/AverageCC/repair-thread/releases/tag/v0.2.0).
- Windows 10/11 x64. The installer is unsigned and may display an unknown-publisher warning.
- Installation offers a destination folder, Start menu entry, desktop shortcut, and uninstaller. Uninstall retains the local profile.
- Bundled files are served only on `127.0.0.1:47831`; port conflicts produce a startup error.
- Electron uses sandboxing and context isolation with Node integration disabled. Camera access is video-only and restricted to the local app origin.
- If access is denied, check Windows camera privacy and browser/site settings. Image upload remains available.

## Repository map

| Path | Purpose |
| --- | --- |
| `src/Landing.jsx`, `src/landing.css` | Marketing website |
| `src/ProductSequence.jsx` | Scroll-driven animation |
| `src/LandingScanner.jsx`, `src/CameraCapture.jsx` | Camera and image capture |
| `src/main.jsx`, `src/domain.js` | Workspace, rules, exports and sample cleanup |
| `desktop/` | Electron shell and icon |
| `tests/` | Workflow and sample-data preservation tests |
| `public/brand/` | Brand guide, SVGs and design tokens |
| `docs/` | PRD, brand guidance, pitch deck and demo assets |
| `vercel.json` | Deployment build and routing settings |

## Deployment

GitHub `main` is connected to [Vercel](https://repair-thread.vercel.app/). Vercel builds the source and serves `dist`; confirm deployment status after each push. Website deployment does not rebuild or publish the Windows installer.

## Asset and dependency notes

The custom mark and SVGs are editable assets intended for this software; they do not establish trademark clearance. No open-source license has been selected: a public repository alone does not grant a general reuse license. Dependencies retain their own licenses. System fonts are not redistributed; Lucide icons use the ISC license. Sample identifiers and records are fictitious.


