# Custom MCP Server (Patina) — Project Notes

## What it is (clarified)

Custom MCP Server is an internal automation platform for Patina that lets AI agents and webhook-based workflows trigger real work across Patina’s tools.

It exists because “agent” products (e.g. Notion’s background AI agents) don’t always have first-class connectors for the software Patina uses day-to-day. Instead of waiting for integrations (or wiring everything through Make.com), this server exposes Patina-specific capabilities as:

- **MCP tools** (so an AI agent can take an intention and execute actions safely), and
- **Webhook endpoints** (so event-driven automations can run without a human in the loop).

In practice, it replaces much of what Make.com was used for, while adding an “agent-friendly” interface that makes automations smarter than rigid step-by-step flows.

## Problem

Patina’s workflows span multiple systems (Notion, Dropbox, Xero, etc.), but many “AI agent” platforms don’t offer the necessary connectors.

That forces a trade-off:

- manual copy/paste and admin work, or
- brittle automations in third-party tools that can’t reason about messy / unstructured inputs.

More specifically:

- Notion AI agents (and similar products) can’t connect to key Patina systems (especially Xero), which limits what “background agents” can actually do.
- Shipping and maintaining these integrations in no-code tools (e.g. Make.com) was slow and cumbersome; a code-first integration layer is simpler and faster to extend.

## Solution

Build a Patina-specific integration layer that:

- provides **webhook automations** for predictable triggers (e.g. “new client signed”), and
- provides **MCP tools** for agent-driven work that requires judgement (e.g. turning unstructured job notes into an invoice).

Implementation notes:

- Deployed on **Vercel**, with an **admin screen** for connection state + integration setup.
- Handles OAuth-style connections for **Gmail** and **Xero**, plus connection status for **Notion** and **Synology** (and other integrations as needed).
- Exposes **webhook endpoints** and **MCP endpoints** that route into “flows”, which call the relevant provider SDKs / APIs (Notion, Dropbox, Xero, Gmail, Synology).

## Examples

### Webhook automation example

- When a new client is signed, automatically create a standard **Dropbox job folder structure**.

### MCP / agent example

- A photographer records unstructured notes in a Notion job page (start time, end time, extras).
- An agent reads that job context and uses exposed tools to **create the correct invoice in Xero** (and optionally attach metadata / references).

Example agent workflow (invoice):

- Pull job context from Notion (unstructured notes).
- Check if the client already exists in Xero contacts (create/update if needed).
- Fetch product/items from Xero to choose an appropriate line-item template.
- Construct an invoice using extracted job details + chosen item(s).
- Notify for human review/approval before sending to the client.

## Top use cases (AI-in-the-loop)

The differentiator is that the “decision” step can be AI-driven. Automations can start from messy notes, then use strongly-scoped capabilities to take real actions, with humans approving the final step when needed.

1. Draft invoices from Notion job notes (human review)

- We `@`-comment the agent in Notion on a photo job.
- It reads unstructured notes (start/end, extensions, additional costs).
- It gets the contact from the job, searches Xero contacts, and creates the contact if missing.
- It searches our Xero items/products for the best match.
- It creates a draft invoice and notifies us in Notion with the invoice link to review.

2. Inbox management (triage + drafted replies, human approval)

- Watches new inbound emails and categorizes them based on criteria.
- If it’s a client email that needs more thought, gathers recent emails from that contact for context.
- Uses our email templates/knowledge base to draft a reply.
- Pastes the draft into Notion as a task for review.
- Human reviews and `@`-comments the agent to send.
- Sent emails are used to improve templates/knowledge base over time.

3. Dropbox folders (create + archive)

- Date-based automation triggers an agent to create a Dropbox project folder ready for photo data.
- Chooses the correct parent folder and thoughtfully names it based on unstructured Notion job data.
- After the job completes, another automation archives the folder into long-term storage.

## Draft copy (v0)

### One-liner options

Primary one-liner (chosen direction):

- An internal automation platform for Patina: webhook workflows + MCP tools so AI agents can safely do real work across our tech stack.

Alternate one-liners:

- A custom MCP server for Patina that turns messy job notes into real actions like folders and invoices.
- An agent-ready automation layer for Patina that replaces Make.com and unlocks smarter workflows.

### Excerpt length reference (existing projects)

- With Thanks excerpt: ~19 words
- Wedding Ready excerpt: ~38 words

### Excerpt options (2–3 sentences)

Recommended excerpt (shorter, closer to existing pages):

- Custom MCP Server is Patina’s internal automation platform. It exposes webhook workflows and MCP tools so AI agents can safely act across Notion, Dropbox, Gmail, Synology, and Xero—replacing Make.com and unlocking automations that can interpret unstructured job notes.

2. Many agent platforms can’t connect to the tools Patina relies on, which limits what “background agents” can actually do. This custom MCP server bridges that gap by providing a Patina-specific set of tools and triggers—so agents can reliably create folders, update records, and generate invoices from job notes.

## Open questions to fill in

- What’s the **current status** (prototype / in use / production)? (current: internal beta)
- What are the **primary integrations** (Notion, Dropbox, Xero — anything else)? (current: Notion, Dropbox, Xero, Synology, Gmail; planned: Airtable)
- What’s the **auth model** for webhooks and MCP clients?
- Where is it **hosted/deployed**?
- What are 3–6 **engineering constraints/decisions** worth calling out?

## Current facts (confirmed)

- Status: internal beta
- Live URL: https://mcp-patina.vercel.app/
- Repo URL: https://github.com/HeyHemi-dev/mcp-patina (currently private; OK if it 404s)
- Integrations (today): Notion, Dropbox, Xero, Synology, Gmail
- Planned integration: Airtable
- MCP transport: HTTP

## Roles (draft)

Suggested “My Role” entries for the case study (keep it short):

- Owner (Patina Photo)
- Full-Stack Developer
- Systems / Integrations

## Auth + safety (current)

- Admin UI access: simple password check against a secret stored in environment variables.
- Webhook + MCP auth: clients pass a shared secret (bearer token / secret) which is validated against an environment variable.
- Provider auth: each connected service uses its own auth mechanism; OAuth flows are set up and managed via the admin screen (connect / disconnect / reconnect).
- Human approval for invoices: handled in Notion. After the server creates an invoice, it returns the invoice link so the Notion agent can prompt a human to review/approve before any “send to client” action.

## Tech stack (current)

- App/framework: Next.js (SSR admin app)
- Language: TypeScript
- Validation: Zod
- Database: Neon Postgres
- ORM: Drizzle
- Styling/UI: Tailwind + shadcn/ui
- Hosting: Vercel
- Provider SDKs: official SDKs for Dropbox, Gmail, Xero, Notion
- Synology: custom client built from API docs (no official SDK)

## MCP tools (current)

Xero:

- Search Xero contacts: search by name or email.
- Get Xero items (products): optional search term; returns only items that are currently for sale.
- Create Xero sales invoice (draft): creates a draft sales invoice; requires a `contactId` (so contact must be found/created first).

## Engineering constraints & decisions (draft)

1. Admin auth speed vs completeness

- Constraint: this started as an internal tool and needed to ship quickly.
- Decision: keep admin UI auth as a simple env-var password check instead of building full user accounts/auth.
- Trade-off: not suitable for multi-user access without additional work; may need a proper auth layer or a rebuild if the audience expands.

2. Provider SDK errors are inconsistent

- Constraint: each provider SDK throws different error shapes and details, making reliable handling difficult.
- Decision: normalize provider errors into a consistent `AppError`-style shape across the app; keep the original/unserialized error for debugging.
- Trade-off: some error detail is intentionally not surfaced in the normalized shape (lossy), and deeper debugging requires digging into the captured raw error.

## Deep dive (chosen)

- Error normalization across provider SDKs (keep it light/placeholder for now; expand with real examples later).
