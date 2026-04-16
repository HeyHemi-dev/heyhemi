import type { CaseStudy } from "../types";

export const mcpCaseStudy: CaseStudy = {
  slug: "mcp",
  name: "AI Agent Server",
  client: "Patina Photo",
  excerpt:
    "Patina's internal automation platform: webhook workflows + MCP tools so AI agents can safely act across our stack (Notion, Dropbox, Gmail, Synology, Xero).",
  heroImage: {
    src: "/apple-touch-icon.png",
    alt: "AI Agent Server project preview",
  },
  liveUrl: "https://mcp-patina.vercel.app/",
  repoUrl: "https://github.com/HeyHemi-dev/mcp-patina",
  oneLiner:
    "Internal automation platform for AI agents; gives access to our data and tech stack",
  roles: [
    "Owner (Patina Photo)",
    "Full-Stack Developer",
    "AI Workflow Development",
    "Systems / Integrations",
  ],
  techStack: [
    {
      type: "md",
      text: "**Codex (OpenAI)** - agentic development",
    },
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
      "Off-the-shelf agent platforms (like Notion background agents) couldn't connect to key Patina tools (esp. Xero) so AI agents couldn't actually do the work we needed. Meanwhile, building and iterating on these integrations in no-code tools (e.g. Make.com) was also slow and cumbersome.",
    solution:
      "I built a code-first MCP server that exposes Patina-specific capabilities and tools to AI Agents in our Notion workspace. It runs on Vercel with a small admin UI to manage integrations (including OAuth for Gmail, Xero etc.), and enables agents to work with unstructured data to complete real actions like drafting invoices in Xero.",
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
      "A few constraints and decisions that shaped the system's security posture and reliability while staying lightweight for an internal beta.",
    rows: [
      {
        constraint:
          "This internal-first tool needed to ship quickly, without spending time on a proper user auth layer.",
        decision: {
          type: "md",
          text: "Admin UI auth was kept as a simple env-var password check, with the expectation that a proper auth layer could be added later if the audience expands.",
        },
        tradeOff:
          "Not suitable for productisation; expanding beyond an internal beta likely requires a real auth system or a rebuild of the admin surface.",
      },
      {
        constraint:
          "Each provider SDK throws different error shapes and details, making consistent handling and display difficult.",
        decision: {
          type: "md",
          text: "Normalised provider errors into a consistent `AppError` shape across the app while still capturing the raw/unserialised error for debugging.",
        },
        tradeOff:
          "The normalised shape is intentionally lossy; deeper debugging may require digging into the captured raw error details.",
      },
    ],
  },
  deepDive: {
    title: "Top use cases (AI-in-the-loop automations)",
    content: [
      { type: "h3", text: "Unlocking new types of automation" },
      {
        type: "md",
        text: [
          "Most automation tools work best when the input is clean and structured (a form submission, a fixed payload, a strict database schema). Patina's real workflows aren't like that.",
          "",
          "We use Notion extensively, and love how it accommodates our human messiness. But this makes automation difficult and brittle. This custom MCP server enables an agent to **read unstructured inputs, make human-like decisions**, and then use strongly-scoped tools to take action.",
        ].join("\n"),
      },

      { type: "h3", text: "Use case 1: Draft invoices from job notes" },
      {
        type: "md",
        text: "We `@`-comment the agent in Notion on a photo job. It turns unstructured notes into a draft invoice in Xero, then hands it back for review before anything is sent.",
      },
      {
        type: "ul",
        items: [
          "Read unstructured job notes (start/end, extensions, additional costs)",
          "Get the contact from the job and search Xero contacts (create if missing)",
          "Search Xero items/products for the best match",
          "Create a draft sales invoice in Xero",
          "Notify us in Notion with a link to review the invoice",
        ],
      },

      { type: "h3", text: "Use case 2: Inbox management + drafted replies" },
      {
        type: "md",
        text: "New emails are decision-heavy. The agent triages, pulls relevant context, drafts a reply, and then waits for a human approval step before sending.",
      },
      {
        type: "ul",
        items: [
          "Watch inbound emails and categorize based on criteria",
          "If it's a client email that needs more than a canned reply, gather recent messages for context",
          "Draft a reply using our email templates/knowledge base",
          "Create a Notion task with the draft reply for review",
          "After a human `@`-comments to approve, send the email and update the knowledge base",
        ],
      },

      {
        type: "h3",
        text: "Use case 3: Dropbox project folders + archive automation",
      },
      {
        type: "md",
        text: "Folder setup and archiving is easy to automate, but it still requires small judgment calls. The agent uses unstructured Notion job data to create the right folder, in the right place, with the right name—then archives it after delivery.",
      },
      {
        type: "ul",
        items: [
          "Date-based trigger creates a Dropbox project folder ready for photo data",
          "Choose the correct parent folder and naming based on unstructured Notion job data",
          "After job completion, archive the folder into long-term storage",
        ],
      },
    ],
  },
};
