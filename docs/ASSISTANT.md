# Ask Repair Thread

Version 0.3.0 adds a dedicated assistant screen and an Overview shortcut. The existing label scanner remains unchanged.

## What works without AI

The attention list is calculated locally from the current workspace. It identifies pending approval decisions, urgent requests, decisions needing review, equipment missing brand/model/serial, and open requests with at least seven days since their latest recorded activity. Closed requests and retired equipment are excluded. Each item opens its source record. Several items can refer to the same request.

Inactivity is not an overdue deadline. The application has no due-date, assigned-owner or service-schedule fields. These reminders appear while the app is open; no scheduled email, push notification, or background delivery is implemented.

## AI answers

The assistant sends one question and a fresh text snapshot to the OpenAI Responses API. It can summarize attention items, explain pending approvals, identify missing records, and draft a follow-up. Each question stands alone; earlier answers are not sent as chat history. The AI cannot change records, approve expenses, order equipment, or send the draft. References are checked against the submitted record IDs before being displayed.

Users must check the sharing consent before sending. Shared fields: property/unit names; equipment type, brand, model and serial; repair titles, status, priority and activity dates; latest proposal type/version/total. Photos, raw OCR, unit notes, request descriptions, event text, vendor details and contact fields are excluded. A typed question may contain personal information, so review it before sending. `store: false` disables Responses application storage; this is not a promise of zero provider retention. See [OpenAI data controls](https://developers.openai.com/api/docs/guides/your-data).

## Local configuration

`pnpm dev` and `pnpm preview` provide the local `/api/assistant` endpoint through Vite middleware. `OPENAI_API_KEY` is loaded from ignored `.env.local`, only on the server. Never prefix it with `VITE_`. The development Electron app also reads that file. No key is included in the browser bundle, repository, or installer.

Packaged Electron includes the same backend but takes `OPENAI_API_KEY` from the launch environment. It does not include a shared customer credential. To run a locally built installer with the configured development key, use `node scripts/launch-configured-desktop.mjs` from this source checkout after building it. This launcher reads the approved local env file in memory and passes it only to the child process.

The default model is `gpt-4.1-mini`; the server-only `OPENAI_MODEL` environment variable can override it. The explicit smoke test `node scripts/test-assistant-live.mjs` sends synthetic equipment data. Ordinary `pnpm test` uses mocked provider calls and incurs no API charge.

## Hosted configuration

`api/assistant.js` provides the Vercel endpoint. Hosted requests fail closed unless both `OPENAI_API_KEY` and `ASSISTANT_ACCESS_CODE` are configured on the server. The latter must be a private random string of at least 24 characters; it is entered in the assistant UI, retained only in React memory, and is not an API key. Never put either value in client code or GitHub. The current public deployment does not have these secrets configured; the UI shows that AI is not connected, while local reminders remain usable.

The access code is a temporary restricted-demo control, not account authentication. Add real authentication, organization isolation, durable rate limiting and server-side record authorization before a paid multi-user rollout. The current endpoint accepts user-supplied local records, so it cannot attest to their authenticity.

## Limits and recovery

- At most 150 units, 150 assets and 150 requests; larger requests are rejected explicitly rather than silently truncated.
- 180 KB request limit, 1,200-character questions, 1,400 output tokens, 30-second provider timeout.
- Two concurrent requests and 30 requests/hour per server process. This is not a durable global spending cap; serverless instances have independent counters.
- Missing credentials, invalid access code, provider quota, rate limits, refusal/incomplete output, timeout, and malformed input produce visible errors without changing records.
- No raw provider error, API key, question, or record payload is logged by the application.

## Verification status — October 11, 2026

Automated tests cover reminders, the privacy whitelist, consent/origin checks, hosted access gates, reference filtering, and provider failures. A live request authenticated but returned `credit_balance_exhausted` / `insufficient_quota`. Real answer quality remains unverified until API billing is enabled. Local browser preview permission was declined, so no visual browser verification is claimed for this change.

API reference: [Structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs). Hosting reference: [Vercel Node.js Functions](https://vercel.com/docs/functions/runtimes/node-js).
