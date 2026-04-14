import type { CaseStudy } from "../types";

export const mcpCaseStudy: CaseStudy = {
  slug: "mcp",
  name: "Custom MCP Server",
  client: "Patina Photo",
  excerpt:
    "Patina’s internal automation platform: webhook workflows + MCP tools so AI agents can safely act across our stack (Notion, Dropbox, Gmail, Synology, Xero).",
  heroImage: {
    src: "/projects/mcp/hero.svg",
    alt: "Custom MCP Server project preview",
  },
  liveUrl: "https://mcp-patina.vercel.app/",
  repoUrl: "https://github.com/HeyHemi-dev/mcp-patina",
  oneLiner:
    "An internal automation platform for Patina: webhook workflows + MCP tools so AI agents can safely do real work across our tech stack.",
  roles: [
    "Owner (Patina Photo)",
    "Full-Stack Developer",
    "Systems / Integrations",
  ],
  techStack: [
    { type: "md", text: "**Next.js (SSR)** - admin UI + endpoints" },
    { type: "md", text: "**TypeScript**" },
    { type: "md", text: "**Zod** - validation at request boundaries" },
    { type: "md", text: "**Drizzle ORM**" },
    { type: "md", text: "**Neon Postgres**" },
    { type: "md", text: "**Tailwind CSS + shadcn/ui**" },
    { type: "md", text: "**Vercel** - deployment and hosting" },
    { type: "md", text: "**MCP over HTTP**" },
    {
      type: "md",
      text: "**Provider SDKs** - official SDKs for Notion, Dropbox, Gmail, Xero",
    },
    {
      type: "md",
      text: "**Synology API client** - custom client built from API docs (no official SDK)",
    },
  ],
  problemSolution: {
    problem:
      "Off-the-shelf agent platforms (like Notion AI background agents) couldn’t connect to key Patina tools—especially Xero—so “agents” couldn’t actually do the work we needed. Building and iterating on these integrations in no-code tools (e.g. Make.com) was also slow and cumbersome.",
    solution:
      "I built a code-first integration layer that exposes Patina-specific capabilities as both webhook automations and MCP tools. It runs on Vercel with a small admin UI to manage integrations (including OAuth for Gmail/Xero), and it enables agents to turn unstructured job context into real actions like drafting invoices in Xero.",
  },
  architecture: {
    diagram: {
      src: "/projects/mcp/architecture.svg",
      alt: "Architecture diagram showing an admin UI, webhook and MCP HTTP endpoints, a flows layer, provider clients, and Neon Postgres for connection state.",
      caption:
        "Custom MCP Server runs on Vercel with an admin UI plus webhook + MCP HTTP endpoints that route into a flows layer, backed by Neon Postgres and provider APIs.",
    },
    content: [
      {
        type: "md",
        text: [
          "This project is intentionally “code-first”: instead of wiring automations in a no-code tool, Patina’s integrations live in one server that owns auth, request validation, provider API calls, and consistent error handling.",
          "",
          "There are two entry points into the same underlying capabilities:",
          "",
          "- **Webhooks** for predictable, event-driven workflows (e.g. create standard folder structures).",
          "- **MCP tools** for agent-driven workflows that require reasoning over unstructured inputs (e.g. draft an invoice from job notes).",
        ].join("\n"),
      },
      {
        type: "ul",
        items: [
          {
            type: "md",
            text: "**Admin UI (Next.js SSR):** connect/disconnect integrations and view connection status.",
          },
          {
            type: "md",
            text: "**Auth gates:** admin password + shared secrets for webhook/MCP clients (env-based).",
          },
          {
            type: "md",
            text: "**Flows layer:** orchestration that calls provider SDKs/APIs (Notion, Dropbox, Gmail, Xero, Synology).",
          },
          {
            type: "md",
            text: "**Persistence:** Neon Postgres via Drizzle for integration state and tokens.",
          },
        ],
      },
    ],
  },
  engineering: {
    caption:
      "A few constraints and decisions that shaped the system’s security posture and reliability while staying lightweight for an internal beta.",
    rows: [
      {
        constraint:
          "This started as an internal tool and needed to ship quickly without spending weeks on user management.",
        decision: {
          type: "md",
          text: "Kept the admin UI auth as a simple env-var password check, with the expectation that a proper auth layer could be added later if the audience expands.",
        },
        tradeOff:
          "Not suitable for multi-user access as-is; expanding beyond an internal beta likely requires a real auth system or a rebuild of the admin surface.",
      },
      {
        constraint:
          "Each provider SDK throws different error shapes and details, making consistent handling and display difficult.",
        decision: {
          type: "md",
          text: "Normalized provider errors into a consistent `AppError`-style shape across the app while still capturing the raw/unserialized error for debugging.",
        },
        tradeOff:
          "The normalized shape is intentionally lossy; deeper debugging sometimes requires digging into the captured raw error details.",
      },
    ],
  },
  deepDive: {
    title: "Error normalization across providers",
    content: [
      { type: "h3", text: "The Problem" },
      {
        type: "md",
        text: "Notion, Dropbox, Gmail, and Xero SDKs all surface errors differently. Without a consistent error shape, it’s hard to build predictable UI feedback, retry behavior, and logging across many integrations.",
      },
      { type: "h3", text: "What I Built" },
      {
        type: "md",
        text: "A provider-agnostic error normalization layer that converts SDK/API errors into a consistent `AppError` shape used throughout the app, while also retaining the original error for deeper debugging when needed.",
      },
      { type: "h3", text: "Trade-off" },
      {
        type: "md",
        text: "Normalizing errors means not every provider-specific detail is surfaced in the standard shape. The payoff is predictability in handling; the cost is that deeper investigation sometimes requires inspecting the captured raw error.",
      },
    ],
  },
};
