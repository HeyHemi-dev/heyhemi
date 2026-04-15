import type { CaseStudy } from "../types";

export const mcpCaseStudy: CaseStudy = {
  slug: "mcp",
  name: "AI Agent Server",
  client: "Patina Photo",
  excerpt:
    "Patina’s internal automation platform: webhook workflows + MCP tools so AI agents can safely act across our stack (Notion, Dropbox, Gmail, Synology, Xero).",
  heroImage: {
    src: "/favicon.svg",
    alt: "Mayday Weddings project placeholder image",
  },
  liveUrl: "https://mcp-patina.vercel.app/",
  repoUrl: "https://github.com/HeyHemi-dev/mcp-patina",
  oneLiner:
    "Internal automation platform for AI agents; gives access to our data and tech stack",
  roles: [
    "Owner (Patina Photo)",
    "Full-Stack Developer",
    "AI Workflow Development",
    "Systems & Integration",
  ],
  techStack: [
    { type: "md", text: "**Next.js (SSR)** - Admin UI + endpoints" },
    { type: "md", text: "**Zod** - validation at endpoint and SDK boundaries" },
    { type: "md", text: "**Drizzle ORM**" },
    { type: "md", text: "**Neon Postgres**" },
    { type: "md", text: "**Tailwind CSS + shadcn/ui**" },
    { type: "md", text: "**Vercel** - deployment and hosting" },
    { type: "md", text: "**MCP over HTTP**" },
    {
      type: "md",
      text: "**Provider SDKs** - official SDKs where possible (e.g. Notion, Xero, Gmail etc.)",
    },
  ],
  problemSolution: {
    problem:
      "Off-the-shelf agent platforms (like Notion background agents) couldn’t connect to key Patina tools (esp. Xero) so AI agents couldn’t actually do the work we needed. Meanwhile, building and iterating on these integrations in no-code tools (e.g. Make.com) was also slow and cumbersome.",
    solution:
      "I built a code-first integration layer that exposes Patina-specific capabilities as both webhook automations and MCP tools. It runs on Vercel with a small admin UI to manage integrations (including OAuth for Gmail, Xero etc.). This enables agents to work with unstructured data to complete real actions like drafting invoices in Xero.",
  },
  architecture: {
    diagram: {
      src: "/projects/mcp/webhook-request-flow.svg",
      alt: "Webhook request flow and provider client boundary: request preflow (auth + Zod), flow orchestration, capability calls, provider client wrapper, and consistent error shaping into public HTTP responses.",
      caption:
        "Endpoint request flow: request boundary (auth + Zod) → flow orchestration → capability → provider client wrapper (SDK boundary + error normalization) → consistent public HTTP responses.",
    },
  },
  engineering: {
    caption:
      "A few constraints and decisions that shaped the system’s security posture and reliability while staying lightweight for an internal beta.",
    rows: [
      {
        constraint:
          "This internal-first tool needed to ship quickly, without spending time on a proper user auth layer.",
        decision: {
          type: "md",
          text: "Admin UI auth was keep as a simple env-var password check, with the expectation that a proper auth layer could be added later if the audience expands.",
        },
        tradeOff:
          "Not suitable for productisation; expanding beyond an internal beta likely requires a real auth system or a rebuild of the admin surface.",
      },
      {
        constraint:
          "Each provider SDK throws different error shapes and details, making consistent handling and display difficult.",
        decision: {
          type: "md",
          text: "Normalized provider errors into a consistent `AppError` shape across the app while still capturing the raw/unserialized error for debugging.",
        },
        tradeOff:
          "The normalized shape is intentionally lossy; deeper debugging may require digging into the captured raw error details.",
      },
    ],
  },
};
