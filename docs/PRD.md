# Repair Thread — Product Requirements Document

Version: 0.1 · October 9, 2026 · Status: proposed scope for hackathon and paid-pilot validation

## 1. Product decision

Repair Thread is a phone-friendly appliance-record and maintenance-handoff product for rental property managers. It connects photographed appliance identifiers to a specific property and unit, carries that evidence into a repair or replacement approval, and updates the inventory after installation.

Working brand: **Repair Thread**. Tagline: **Property maintenance, connected.** Name, domain and trademark availability have not been cleared.

The product is a business subscription with a web dashboard and mobile capture flow. Residents and vendors receive restricted task links. The first release supports appliance records, proposals and replacement confirmation; it does not replace a property-management system.

## 2. The problem

A maintenance request such as “the dishwasher in 304B is broken” often requires staff to assemble several separate pieces of information: the installed appliance, its exact identifiers, the issue evidence, a vendor quote, approval and the replacement record. An existing system may have fields for this information without having complete or current records.

The product hypothesis is that missing information and disconnected handoffs create avoidable administrative work. Customer reviews support broader concerns about capture friction, setup, adoption and integration, but do not establish the frequency or cost of this exact problem. Validate those with actual appliance cases before claiming savings.

Key distinction: the model identifies a product design; the serial identifies a particular manufactured unit. Neither should serve as the application's sole internal identifier. A photograph of a fault does not establish a repair diagnosis.

## 3. Offer and positioning

### Public offer

**Stop chasing appliance details every time something breaks.**

Repair Thread turns label photos into reviewed unit records, brings the appliance details into repair approvals, and records what was installed when a replacement is complete.

**Founding Property Partner Pilot: $149 for 30 days.**

- Access for up to 200 managed units and five staff members.
- One guided onboarding session and import of a standard property/unit CSV.
- Up to 1,000 analysis attempts during the pilot; meter usage and warn before the limit. No automatic overage billing.
- Tenant/vendor task links, appliance records, proposals, manager decisions, replacement history and CSV export.
- Benchmark the first five eligible appliance cases against the customer's existing process.
- If the agreed benchmark does not show at least a 25% reduction in median coordinator handling time, refund the $149 pilot fee on request.
- If fewer than five eligible cases occur, extend the evaluation by 14 days without charge; if still insufficient, allow a refund on request.
- No automatic subscription renewal. Customer explicitly elects ongoing service.

This is a proposed commercial offer, not an already launched guarantee. The team must be willing and operationally able to honor it before publication. The time-saving target is not a demonstrated result.

### Benchmark rules

Agree on representative cases and the measurement method before starting. Measure active coordinator time assembling equipment details, requesting missing evidence, preparing an approval packet and recording completion. Exclude repair labor, supplier delivery time, waiting for owner decisions and initial inventory setup. Use matched historical cases with credible time records or a side-by-side replay of the same de-identified cases. Report sample size and any differences in complexity. Never translate a five-case result into a universal claim.

The customer supplies the unit list, permissions, source photos and staff participation. Standard onboarding does not include site visits, manual creation of a full portfolio, custom integrations or supplier purchasing.

### Intended differentiation

1. Property → unit → appliance navigation with the location always visible.
2. Reviewable camera extraction with original evidence and explicit unresolved fields.
3. Short resident/vendor contribution flows without a full platform account.
4. A proposal carries the appliance record and evidence into approval.
5. Replacement confirmation closes the event and preserves the old appliance history.

This combination is a positioning hypothesis, not a claim that competitors lack these capabilities. Prove an advantage through fewer steps, faster completion and complete records.

## 4. Target customers and users

Initial ideal customer: independent residential property managers with roughly 200–1,500 units, a maintenance coordinator, recurring appliance work and incomplete equipment records. Prefer a pilot customer willing to use CSV exports while integration requirements are validated.

Buyer: company owner or operations director. Champion: maintenance coordinator. Approver: authorized manager or owner delegate. Contributors: residents, employees, repair vendors and installers.

Avoid initially: individual homeowners, very small landlords with little recurring activity, enterprises requiring a procurement/security integration program before testing, and customers seeking automated repair diagnosis.

## 5. Desired outcomes

Customer outcomes:

- Identify the installed appliance without searching unrelated messages and photo folders.
- Prepare a reviewed appliance-specific proposal with less repeated entry.
- Know who owns the next action.
- Preserve accurate unit inventory when equipment is moved or replaced.

Business outcomes:

- Convert at least two of the first three completed pilots to paid subscriptions.
- Demonstrate repeated use after initial scanning.
- Keep manual correction and direct support costs compatible with subscription pricing.

## 6. Scope by release

| Capability | 48-hour hackathon MVP | Paid-pilot requirement | Later |
|---|---|---|---|
| Properties and units | Seeded examples plus create/edit | Validated CSV import | PMS property sync |
| Label extraction | Real photo analysis; review and correction | Device testing, usage limits, consent and retention controls | Larger tested equipment coverage |
| Unit appliance list | Search and appliance cards | Cross-property disambiguation and filtering | Portfolio analytics |
| Requests | Resident-style task flow in demo workspace | Expiring restricted links and notifications | PMS work-order integration |
| Proposals and approvals | Real saved decisions within demo roles | Authenticated approver permissions and immutable decision history | Configurable multi-stage routing |
| Replacement | New record and old-record archive | Duplicate checks and reviewed transfers | Invoice-assisted matching |
| Supplier purchasing | User-supplied link/quote | Clear external handoff and manual order status | Supplier APIs and confirmed checkout |
| Export | CSV and printable record | Controlled bulk export including evidence references | One supported PMS connector |
| Offline | Clear network errors and safe retry | Verified draft recovery across target devices | Full offline sync if justified |
| Billing | Display proposed pricing | Pilot payment/refund process and opt-in renewal | Self-service subscription management |

The demo must label seeded data, role simulation and unconnected integrations. It must not pretend an email was sent, an order placed or a PMS updated. A working hackathon demo is not automatically ready for real tenant data.

Non-goals: rent collection, leasing, accounting, full-property inspections, autonomous diagnosis, automatic deposit charges, warranty adjudication, universal parts compatibility, predictive appliance failure, live monitoring of occupied units, or a custom deployment per client.

## 7. Primary workflow

### A. Create a trustworthy appliance record

1. Employee chooses property, unit and appliance category.
2. Takes or uploads a label photo; optionally adds a whole-appliance photo.
3. System extracts visible manufacturer, model and serial fields into structured output.
4. Review shows source photo and editable values together. Missing or ambiguous fields remain unresolved.
5. User confirms or marks a field unreadable. Save is allowed with a visible incomplete status.
6. Record receives an internal asset ID, location assignment and confirmation timestamp.

Never infer a unit number from a photograph or silently replace uncertain characters. Do not present an uncalibrated model-generated percentage as accuracy. Separate “extracted,” “human confirmed” and “externally matched.”

### B. Report and prepare

1. A resident opens a link scoped to their current unit or a particular appliance.
2. Selects the appliance, describes the problem and adds optional evidence.
3. Coordinator reviews the report with the saved equipment details.
4. A reviewed diagnosis or quote is supplied by staff/vendor as needed.
5. Coordinator creates a repair or replacement proposal with line items, supplier/quote references, estimated tax, delivery, installation and disposal costs, and any unknown amounts.

### C. Decide and complete

1. An authorized approver sees the exact proposal version and supporting record.
2. Approves, rejects or requests changes; actor, timestamp and comments are saved.
3. Approval permits the next workflow step; it does not place an order.
4. Staff records external order confirmation or vendor dispatch separately.
5. Installer captures the replacement label and confirms property/unit.
6. Staff reviews the replacement, retires the old asset and links the new one to it.
7. Unit inventory and exported record reflect the change; history remains intact.

Changing cost, supplier, item or scope after approval creates a new version and requires reapproval. An approved proposal is never silently edited.

## 8. Functional requirements and acceptance criteria

| ID | Requirement | Acceptance criteria |
|---|---|---|
| F01 | Unit search | Searching 304B returns matching units with property names; selecting one cannot show another property's assets. |
| F02 | Camera extraction | A real uploaded label produces a draft or an explicit analysis failure. Invalid model output cannot create a confirmed record. |
| F03 | Human review | User can compare, correct and confirm every extracted identifier. Original image and original extraction remain available to authorized staff. |
| F04 | Incomplete records | Unreadable/missing serials can be saved and filtered for follow-up; no invented placeholder serial is treated as real. |
| F05 | Duplicate handling | Matching identifiers generate a possible-duplicate prompt; assets are not automatically merged. |
| F06 | Location history | An asset has one current assignment. A reviewed transfer ends its prior assignment and retains the historical timeline. |
| F07 | Request creation | Request links to an asset ID and location snapshot; repeated submission does not create duplicate requests. |
| F08 | Approval | Only an authorized approver can decide; approval references an immutable proposal version. |
| F09 | Replacement | Confirming a replacement retains both asset records and a link between them; old repairs remain attached to the old asset. |
| F10 | Evidence persistence | Upload success appears only after server confirmation. Failures show retry; submitted records retain photo references after reload. |
| F11 | Export | Export includes property/unit IDs, internal asset ID, identifiers, review status, current assignment and timestamps. |
| F12 | Honest lookup status | A manual/part reference has a source and matching status. Unsupported models return “No verified reference available.” |
| F13 | Next-action visibility | Every open case displays status, responsible role/person and next action. |

## 9. Information model

- Organization: tenant boundary, branding, membership, plan and usage.
- Property and Unit: organization-owned, stable IDs; unit labels unique within a property.
- ApplianceModel: manufacturer/model reference and optionally verified source links.
- Asset: permanent internal ID, category, identifiers, review status, original evidence and lifecycle status.
- AssetAssignment: asset, property/unit/location, start/end dates and confirming actor.
- Evidence: image/document, uploader, upload timestamp, optional user-declared capture date, retention state.
- Extraction: original output, source evidence, processing version, corrections and review result.
- MaintenanceCase: asset, reported location snapshot, issue, evidence, assignee and status.
- ProposalVersion and ApprovalDecision: immutable proposed scope/cost and authorized decision.
- FulfillmentRecord: external supplier/vendor reference, manually confirmed order/delivery/installation status.
- ReplacementLink: old asset, new asset, effective date and confirmation.
- AuditEvent: actor, action, timestamp, object and relevant change.

Keep manufacture date, purchase date and installation date separate. Keep warranty documents separate from inferred age. Do not merge models and individual assets.

## 10. Permissions and trust

- Organization administrator manages users and settings.
- Coordinator manages inventory and cases; spending approval requires an explicit permission.
- Approver sees assigned proposals and necessary supporting records.
- Resident access is limited to the authorized unit/task and expires when revoked or occupancy changes.
- Vendor/installer links expose only assigned task information; exclude unrelated resident information and owner financial records.
- Enforce permissions server-side, including image downloads and exports. Use private storage and short-lived access URLs.
- Task tokens must be unguessable, expiring and revocable. Approval actions require authenticated approver identity for paid pilots.
- Treat image text, invoices and external content as untrusted data. Extraction cannot issue commands, send messages or authorize purchasing.
- Disclose external AI processing, retention and deletion behavior before receiving real customer data. Do not use client images for training by default.
- Uploaded historical photos must not be represented as authenticated live capture. “Last confirmed” denotes a recorded observation, not continuous verification.

## 11. Experience and visual direction

Primary screens: unit directory; unit appliance cards; capture/review; appliance detail and timeline; request detail; approval queue; replacement confirmation; export/settings.

Use a calm navy, warm white and teal palette. Use amber for unresolved fields and red for actionable failures. Large phone touch targets, clear text labels and keyboard-accessible desktop controls are required. Never communicate state with color alone.

Keep property/unit/appliance context visible throughout each task. Prioritize the next action over charts. Show loading, empty, permission-denied, upload-failure and retry states. A resident sees a short task, not a management dashboard.

Do not promise “saved on this device” until persistent storage actually succeeds. For paid pilots, test browser refresh, app switching, interrupted upload and retry. Full offline support is a separate capability.

## 12. Technical outline

Responsive web application with mobile camera/file input, a server-side application API, relational storage, private image storage and a replaceable vision/OCR provider adapter. Provider credentials stay on the server. Validate structured extraction responses before saving.

Compress images without destroying label legibility; preserve an appropriate original. Apply upload type/size limits and processing timeouts. Use stable request IDs to avoid duplicate writes and charges on retries. Store analysis attempts and latency for cost measurement.

Begin with CSV import/export and no external write integrations. Choose hosting and provider based on available accounts and a real-label benchmark. Cloudflare was discussed as an option, not a deployed or final architecture decision.

Before advertising any PMS integration, verify API access, field coverage, source-of-truth direction, attachment support, reconciliation behavior and partner terms. Display sync results and failures explicitly.

## 13. Validation and release gates

### Hackathon demonstration

- Use a small reference set of consented or synthetic equipment photos with known identifiers.
- Demonstrate real extraction, a corrected ambiguous field, an incomplete record and a failed request with retry.
- Walk through 101A and 304B, a dishwasher issue, a saved approval and a replacement.
- Reload to verify persistence. Confirm disallowed role actions fail on the server where real roles exist.
- Show exports containing the correct unit/asset relationships.

### Before paid pilot

- Evaluate at least 50 varied, consented label images; record exact model match, exact serial match, abstentions, silent errors, correction time, latency and processing cost. This small benchmark informs scope, not broad accuracy claims.
- Verify access isolation across two organizations and two resident task scopes, including evidence URLs.
- Test stale approval versions, duplicate submissions, interrupted uploads and replacement history.
- Test target iPhone and Android browsers using real devices where available.
- Establish backups, restore procedure, deletion process, usage alerts, support ownership and payment/refund procedure.
- A launch blocker is silent data loss, cross-organization access, false approval/purchase state or invalid replacement history.

### Product metrics

Primary: median active coordinator minutes per completed appliance case, measured against an agreed baseline.

Supporting: time to first confirmed asset; incomplete identifiers; correction rate; repeated requests for evidence; approval turnaround (reported separately from staff handling time); percentage of completed replacements with confirmed new asset records; export failures; support time per organization; direct cost per organization.

Commercial: pilot-to-paid conversion, organizations using case/replacement workflows after inventory onboarding, monthly recurring revenue and customer churn. Do not count setup fees, refundable pilot fees or hypothetical contracts as committed MRR.

## 14. Pricing and unit economics

Proposed ongoing plan: **$149/month for up to 200 managed units, plus $0.50 per additional managed unit/month.** Example: 500 units = $299/month; 1,000 units = $549/month. Define managed units as units actively included in the subscribed portfolio, whether occupied or vacant. Preserve export access on cancellation according to the published retention policy.

Include staff collaboration and restricted contributor links. Set production processing/storage allowances after the pilot benchmark; do not sell unlimited AI processing before measuring costs. Standard historical imports, custom integrations and human cleanup beyond onboarding require a separate agreed scope and fee.

For a $299 account, an 80% gross-margin target implies at most $59.80/month of direct delivery cost. Include AI retries, hosting/storage allocation, payment fees and direct support. Sales, development and general overhead remain additional expenses. This is a target, not a forecast.

If use drops after inventory completion, consider an onboarding/usage product instead of forcing a subscription. White-label and API licenses follow demonstrated repeatability, not the hackathon.

## 15. Lead generation and pilot recruitment

Lead offer: “Show us five appliance cases. We will demonstrate a unit-specific record and approval handoff using your existing process.”

Start with local independent property managers and maintenance companies serving them. Qualify portfolio size, monthly appliance activity, current software, missing-record frequency and integration constraints. Use a sample five-unit demonstration; request only permissioned, necessary information.

Useful later channels: property-management consultants, maintenance partners, practical inventory/approval templates and one supported integration marketplace. A free generic scanner may attract non-buyers, so qualify the business need before investing in broad traffic acquisition.

Initial sales assets: a 90-second workflow demo, one sample unit record, the pilot offer, a transparent pricing page and a before/after benchmark sheet. Customer case studies require permission and measured results.

## 16. 48-hour delivery plan

| Hours | Deliverable |
|---|---|
| 0–4 | Confirm one workflow, obtain sample labels, test extraction, freeze scope |
| 4–12 | Property/unit/asset records, upload, extraction and review |
| 12–22 | Unit inventory, appliance detail, issue creation and persistence |
| 22–30 | Proposal versions, approval decisions and replacement flow |
| 30–38 | Brand, responsive layouts, export, empty/error/retry states |
| 38–44 | End-to-end validation, authorization checks and real-device testing |
| 44–48 | Deploy demo, prepare pitch and backup recording, document limitations |

If time runs short, cut supplier lookup, notifications and advanced filtering first. Preserve real extraction, review, correct unit assignment, decision history and replacement persistence.

## 17. Open decisions before development/pilot

1. Team size, implementation skills and hours remaining in the hackathon.
2. First pilot customer's software, portfolio and monthly appliance-case volume.
3. Available hosting, AI provider and payment accounts/budget.
4. Supported initial appliance types and real-photo coverage.
5. Whether approval is internal manager approval or property-owner approval for the first pilot.
6. Who supplies and confirms supplier references and quotes.
7. Acceptance of the proposed refund offer and operational owner for honoring it before publication.
8. Actual name/domain availability and final subscription processing allowances.

## 18. Research references and limits

Reviewed during this conversation; vendor features, review accounts and prices can change. Reviews are qualitative signals and may describe older versions.

- RentCheck review evidence: https://www.trustpilot.com/review/getrentcheck.com
- RentCheck current collaboration: https://help.getrentcheck.com/en/articles/14424246-inspection-collaboration
- RentCheck asset capture: https://www.getrentcheck.com/features/asset-capture
- RentCheck current pricing: https://www.getrentcheck.com/plan-pricing — published tiers starting at $1, $1.25 and $1.75/unit/month; asset-capture inclusion varies by tier/add-on.
- Property Meld reviews: https://www.capterra.com/p/149045/Property-Meld/reviews/
- Property Meld Buildium integration boundaries: https://help.propertymeld.com/hc/en-us/articles/45794084928915-Integration-and-Screen-Details-Buildium
- Property Meld pricing: https://propertymeld.com/pricing/ — published $1.60–$2/unit/month and $200 monthly minimum.
- ServiceTrade reviews: https://www.capterra.com/p/132690/ServiceTrade-Commercial/reviews/
- XOi reviews: https://www.capterra.com/p/174225/Vision/reviews/
- Propertyware unit asset support: https://www.propertyware.com/blog/how-to-attach-work-order-to-bill-in-propertyware/
- Parts Town app and reviews: https://play.google.com/store/apps/details?id=com.partstown.mobile

The evidence supports investigating operational friction. It does not prove a unique feature gap, superior extraction accuracy, customer willingness to pay or achievable savings. Those are the purpose of the prototype and paid pilots.

## Implementation status — October 11, 2026

Repair Thread is the selected product name. The first delivered release is a browser-local React/Vite prototype. This section takes precedence over any earlier hackathon implementation assumptions below. Requirements elsewhere in this PRD remain the intended paid-pilot product scope, not a claim that every feature is shipped.

**Implemented:** real browser OCR with editable label review; property/unit inventory; issue reporting; versioned proposals; simulated approver decisions bound to the latest proposal; external fulfillment notes; repair completion and linked replacement records; local IndexedDB persistence; CSV and JSON snapshot exports; responsive UI; reusable SVG brand kit and web guide.

**Simulated:** Coordinator, Approver and Resident role selection. These are demonstration views, not identity verification or access control. All sample data is fictitious.

**Not implemented:** shared authentication, organization isolation, resident invitation links, cloud storage, server authorization, verified parts lookup, automatic ordering, PMS integrations, billing, notifications, asset transfers, JSON restore and concurrent edit resolution. The public deployment must not be used as the system of record for a live property portfolio.

**Prototype acceptance:** a user can scan a synthetic or uploaded label, correct and save it to a unit, create a request, submit a proposal, switch demo role to approve, record completion/replacement and see the same record after a refresh in the same browser. Tests must protect approval version binding, negative-cost validation, replacement lineage and CSV escaping.

**Paid-pilot gate:** implement and test server identity, authorization, organization isolation, durable records and backup/restore before storing real tenant or customer data. Pricing and savings remain validation hypotheses.
