import type { CaseStudy } from "./types";

export const weddingReadyCaseStudy = {
  slug: "wedding-ready",
  name: "Wedding Ready",
  excerpt:
    "A Pinterest-inspired wedding planning platform where each idea links to the local suppliers who can bring it to life.",
  heroImage: {
    src: "/wedding-ready/hero.png",
    alt: "Wedding Ready project preview",
  },
  oneLiner:
    "Convert wedding inspiration into real purchases by connecting couples with local suppliers.",
  role: "Founder • Product Design • Full-Stack Development",
  techStack: [
    "Next.js (App Router)",
    "React",
    "TypeScript",
    "TanStack Query",
    "React Hook Form",
    "Zod",
    "Supabase (Postgres + Auth)",
    "Drizzle ORM",
    "UploadThing",
    "Tailwind CSS",
    "shadcn/ui",
    "Vitest",
  ],
  problemSolution: {
    problem:
      "Couples can easily collect inspiration on Pinterest, but it is hard to turn ideas into a realistic plan with suppliers who can actually deliver locally.",
    solution:
      "Wedding Ready combines inspiration and sourcing: users browse and save vendor-created pins, and each pin links directly to the relevant local suppliers.",
    technicalWhy:
      "The product lives or dies on perceived speed and trust: an image-heavy feed must feel instant, while uploads, auth, and data integrity stay tight end-to-end.",
  },
  systemOverview: {
    diagram: {
      src: "/wedding-ready/system-diagram.svg",
      alt: "Wedding Ready system overview diagram",
      caption: "High-level flow: UI -> server boundary -> Supabase and UploadThing.",
    },
    flowNote:
      "A Next.js App Router frontend uses server actions/handlers for authenticated mutations and validation, with Supabase (Auth + Postgres) and UploadThing for storage.",
  },
  constraintsDecisions: {
    caption: "Constraints that shaped the implementation.",
    rows: [
      {
        constraint: "Image-heavy browsing must feel fast and responsive.",
        decision:
          "Use TanStack Query with proactive cache seeding and optimistic mutations so common interactions do not trigger follow-up fetches.",
        tradeOff:
          "More cache complexity and invalidation edge cases compared to always refetching.",
      },
      {
        constraint: "Uploads must be secure and avoid malformed or orphaned records.",
        decision:
          "Gate uploads behind auth + validation (type/size/metadata) and only create DB rows after a successful upload completes.",
        tradeOff:
          "More moving parts and more careful error handling across client/server boundaries.",
      },
      {
        constraint: "Type safety must hold from database to UI without leaking sensitive fields.",
        decision:
          "Define Drizzle schema as the source of truth and enforce boundary validation with Zod, separating raw rows from safe client-facing shapes.",
        tradeOff:
          "Upfront modeling work and occasional duplication between runtime schemas and static types.",
      },
      {
        constraint: "Auth needs to work with SSR and protect server-side mutations.",
        decision:
          "Use Supabase Auth with SSR helpers/middleware so server actions can reliably authorize via headers/cookies.",
        tradeOff:
          "Extra cookie/header plumbing and careful handling of session lifecycles.",
      },
    ],
  },
  deepDive: [
    { type: "h2", text: "Deep Dive: Cache Seeding to Avoid N+1 Save-State Fetches" },
    {
      type: "p",
      text: "In an infinite-scrolling, image-heavy feed, even small interaction delays add up. A common anti-pattern is fetching a list of pins and then making separate requests to resolve per-item saved state (an N+1 problem).",
    },
    { type: "h3", text: "Approach" },
    {
      type: "list",
      items: [
        "When fetching pins in bulk, also fetch (or compute) the saved state for each pin in the same response.",
        "Seed the per-pin cache entries immediately so later interactions do not trigger extra fetches.",
        "Use optimistic updates for save/unsave so the UI responds instantly and then reconciles on success/failure.",
      ],
    },
    {
      type: "code",
      language: "ts",
      code: [
        "// Pseudocode: seed per-pin saved state while ingesting a feed page.",
        "pins.forEach((pin) => {",
        "  queryClient.setQueryData([\"pin\", pin.id, \"saved\"], pin.isSaved);",
        "});",
        "",
        "// Later: mutations can optimistically flip the cached value.",
        "await mutateSavePin({",
        "  onMutate: ({ id }) => queryClient.setQueryData([\"pin\", id, \"saved\"], true),",
        "});",
      ].join(\"\\n\"),
    },
    {
      type: "callout",
      title: "Trade-off",
      text: "This pattern shifts complexity into client caching. It requires clear query keys and disciplined invalidation to avoid stale or inconsistent saved state.",
    },
    { type: "h3", text: "Outcome" },
    {
      type: "list",
      items: [
        "Eliminated follow-up save-state requests when interacting with pins in the feed.",
        "Improved perceived speed by keeping common actions instant and predictable.",
        "Scaled more cleanly with infinite scroll by treating per-pin state as a first-class cache entry.",
      ],
    },
  ],
  outcomes: [
    "Built a full-stack, server-rendered Next.js application with clear boundaries between UI, server actions/handlers, operations, and data access.",
    "Implemented secure, validated file uploads integrated with authentication and database record creation.",
    "Used advanced TanStack Query patterns (cache seeding + optimistic updates) to remove avoidable network chatter in the feed experience.",
    "Defined a layered, type-safe data model using Drizzle + Zod to keep DB, server, and client in sync without leaking unsafe fields.",
  ],
  theme: {
    brandBg: "#005e52",
    indexBg: "#e6f72a",
    descriptionBg: "#81d2c2",
    imageBg: "#cbe0de",
    imageFrameBg: "#bfd6d2",
    brandText: "#d3e9e3",
    indexText: "#2c2f1e",
    descriptionText: "#204448",
  },
} satisfies CaseStudy;
