# Repair Thread brand guide

Version 1.0 · October 11, 2026

## The idea

**Property maintenance, connected.** Repair Thread brings the equipment record, request, decision and replacement into one continuous history. The identity should feel organized, practical and reassuring to a busy property manager.

Write the name **Repair Thread**, with a space and both initial letters capitalized. Use `repair-thread` for package, repository and deployment identifiers. Explain the category with the tagline on first contact; the name alone should not carry every product detail.

## The mark

A continuous line forms an R with visible endpoints: the request and its resolution belong to the same record. Use `mark.svg` as the app icon and favicon. Use `lockup.svg` on light backgrounds. `mark-mono.svg` is for single-color print; `mark-reversed.svg` is for dark surfaces.

Keep clear space of at least one quarter of the mark width. Minimum icon size is 24 CSS pixels; use the name separately below this size. Do not stretch, rotate, add shadows, alter the path, or place the mark on a busy photograph. SVG files remain crisp at any size. The lockup uses a system-font wordmark; retain the full text or convert it to outlines in a design editor before handing it to a print supplier.

## Palette

| Token | Value | Role |
| --- | --- | --- |
| Ink | `#142E35` | Primary text and sidebar |
| Thread green | `#28644F` | Primary actions, links, selected state |
| Paper | `#F7F8F4` | Workspace canvas |
| Sage | `#E5EEE5` | Quiet highlights |
| Muted | `#6B7B72` | Secondary text on light backgrounds |
| Line | `#E0E6DD` | Borders, never sole state indicator |
| Amber | `#8B6018` | Pending or review-needed text |
| Error | `#9E4333` | Error text with explicit explanation |

Use ink on paper and white on green for primary controls. Do not use pale green as body text. State labels always include words, not color alone. Test final text/background pairs for WCAG AA when extending the palette.

## Type and layout

Use `Inter, Segoe UI, Arial, sans-serif` as declared in the software; Inter is optional and not bundled. System fonts keep the initial load light. Headings use bold weight with tight but readable spacing; body text starts at 14–16 px. Use tabular numerals for prices. Use 4/8/12/16/24/32 px spacing and generous whitespace around consequential decisions. Panels use fine borders and 12–20 px rounded corners. Avoid decorative charts where an actionable list would be clearer.

## Voice

Lead with the next useful action: “Review the label,” “Approve this proposal,” “Confirm replacement.” Write status in plain language. Say “No verified reference available” instead of inventing a part match. A scanned field is a draft until reviewed. Do not promise savings, guaranteed identification, automatic diagnosis or secure multi-user access that has not been validated.

## Software behavior

Keep unit and equipment context visible at decision points. Show costs before approval. Keep earlier proposal versions and retired equipment accessible. Use a visible loading state, actionable error, keyboard focus ring and descriptive label for every input. Honor reduced-motion settings. On mobile, prioritize capture and the next action over dashboard density.

## Deliverables and rights

The `public/brand` directory contains original custom SVG artwork, a web guide, a social preview and CSS tokens ready to reference from software. No external font files or stock imagery are included. These materials are for the Repair Thread product; trademark registration or availability is not certified. Third-party library licenses remain separate.
