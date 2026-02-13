import type { CaseStudy } from "./types";

export const weddingReadyCaseStudy = {
  slug: "wedding-ready",
  name: "Wedding Ready",
  excerpt:
    "Work-in-progress MVP: a Pinterest-inspired wedding planning platform built with Next.js + Supabase, featuring a ranked tile feed (simple scoring algorithm + React Query cache to avoid N+1 save-state fetching) and a multi-step batch upload flow for supplier crediting.",
  heroImage: {
    src: "/wedding-ready/hero.png",
    alt: "Wedding Ready project preview",
  },
  liveUrl: "https://wedding-ready.vercel.app/",
  repoUrl: "https://github.com/HeyHemi-dev/wedding-ready",
  oneLiner: "Wedding inspiration you can actually book.",
  roles: ["Founder", "Full-Stack Dev", "Design"],
  techStack: [
    { type: "md", text: "**Next.js (App Router)** - React/Node w SSR/RSC" },
    { type: "md", text: "**TanStack Query**" },
    { type: "md", text: "**React Hook Form**" },
    { type: "md", text: "**Zod**" },
    { type: "md", text: "**Vercel** - deployment branching and cron" },
    { type: "md", text: "**GitHub Actions** - CI/CD" },
    { type: "md", text: "**Supabase** - integrated Postgres + Auth" },
    { type: "md", text: "**Drizzle ORM** - DAL, no client-side queries" },
    { type: "md", text: "**UploadThing** - S3 wrapper" },
    { type: "md", text: "**Tailwind CSS**" },
    { type: "md", text: "**Shadcn/ui**" },
    {
      type: "md",
      text: "**Vitest** - integration testing w 'scene' pattern",
    },
  ],
  problemSolution: {
    problem:
      "Couples can easily collect inspiration on Pinterest, but it is hard to turn ideas into a realistic plan with suppliers who can actually deliver locally.",
    solution:
      "Wedding Ready combines inspiration and sourcing: users browse and save vendor-created pins, and each pin links directly to the relevant local suppliers.",
  },
  architecture: {
    diagram: {
      src: "/projects/wedding-ready/feed-route-architecture.svg",
      alt: "Feed route architecture. /feed -> API -> operations/model layer -> Postgres, with ranked retrieval via a simple scoring algorithm and client save-state cache pre-hydration.",
      caption: "Wedding Ready full-stack architecture; /feed route.",
    },
    content: [
      {
        type: "md",
        text: "I adopted a layered architecture for Wedding Ready so each part of the stack owns a clear concern: UI rendering, request boundaries, business operations, and data access/definitions. The goal is to keep ownership boundaries explicit as the product grew, so complexity stays manageable.",
      },
      {
        type: "md",
        text: "The `/feed` route shows how this works in practice:",
      },
      {
        type: "ul",
        items: [
          {
            type: "md",
            text: "**Proxy gate:** JWT-based authentication is enforced before route rendering, so unauthenticated users are redirected before the server loads `/feed`.",
          },
          {
            type: "md",
            text: "**Server-rendered route shell (RSC):** `/feed` uses React Server Components, handles Suspense and error boundaries around the interactive feed client.",
          },
          {
            type: "md",
            text: "**UI components (tiles):** tile cards stay presentational ('dumb') with no business logic, so they remain reusable across different contexts.",
          },
          {
            type: "md",
            text: "**Client boundary (feed client + `useFeed`):** owns interaction state and client orchestration, not business rules.",
          },
          {
            type: "md",
            text: "**Server boundary (API endpoint):** handles authentication, request parsing/validation, and invokes operations.",
          },
          {
            type: "md",
            text: "**Operations layer:** enforces authorization and maps raw model/database outputs into safe response DTOs before returning data to the client.",
          },
          {
            type: "md",
            text: "**Data layer:** performs typed retrieval using precomputed ranking signals (recency, quality, social) and updates delivery/view state so duplicate tiles are not returned to the feed.",
          },
        ],
      },
      {
        type: "md",
        text: "This separation lets me change ranking logic or retrieval strategy without rewriting UI components. On `/feed`, the API returns ranked tiles and the client pre-hydrates save-state cache entries in the same pass, avoiding N+1 per-tile save-state requests while preserving isolated save/unsave mutations.",
      },
    ],
  },
  engineering: {
    rows: [
      {
        constraint:
          "Supporting multiple authentication providers (email/password + Google OAuth)",
        decision: {
          type: "md",
          text: "**Separated authentication from onboarding** and introduced an explicit onboarded state with routing guards.",
        },
        tradeOff:
          "Significant rework of signup and routing logic; added complexity around user state management (authenticated but not onboarded vs authenticated and onboarded).",
      },
      {
        constraint:
          "Multi-entity ownership and team access (one user -> multiple suppliers; one supplier -> multiple staff)",
        decision: {
          type: "md",
          text: "**Designed a relational ownership model** with team-based access, scoped roles, and permissions.",
        },
        tradeOff:
          "Increased schema and validation complexity; required strict backend access controls and careful UI context switching.",
      },
      {
        constraint: "Need for stable, low-downtime deployments as a solo dev",
        decision: {
          type: "md",
          text: "**Built a safer release pipeline** with Vitest, integration tests, preview deployments, and automated database migrations in GitHub Actions.",
        },
        tradeOff:
          "Significant upfront engineering time to build deployment and testing discipline; payoff was safer releases, higher confidence, and faster long-term iteration.",
      },
      {
        constraint: "Limited developer capacity (solo founder/developer)",
        decision: {
          type: "md",
          text: "**Adopted a serverless-first stack** (Next.js on Vercel + Supabase) to offload infrastructure, and used **TypeScript end-to-end** to reduce context switching and ship faster across frontend and backend.",
        },
        tradeOff:
          "Tighter vendor coupling; performance considerations in serverless environments (e.g. cold starts); reduced low-level infrastructure control.",
      },
    ],
  },
  deepDive: {
    title: "Multi-Step Tile Upload Form",
    content: [
      { type: "h3", text: "The Problem" },
      {
        type: "md",
        text: [
          "Wedding Ready depends on fresh tiles from suppliers, and tiles are most useful if credited accurately. The original one-step upload had a poor UX for supplier crediting and would be a bottleneck for planned features. I also wanted to avoid a naive implementation that would cause unnecessary re-renders and make typing/search feel laggy once there are several tiles in the batch.",
        ].join("\n"),
      },
      { type: "h3", text: "What I Built" },
      {
        type: "md",
        text: "A client-side refactor of the supplier upload flow at `/suppliers/[handle]/new`:",
      },
      {
        type: "ul",
        items: [
          "Batch add up to ~10 images into a single upload session",
          "Configure each tile in two steps: basic details -> crediting suppliers",
          "Upload and delete per tile (no draft persistence; safe to lose state on refresh)",
        ],
      },
      { type: "h3", text: "Separation of Concerns" },
      {
        type: "image",
        src: "/projects/wedding-ready/tile-upload-components.svg",
        alt: "Upload flow component hierarchy diagram",
        caption:
          "Component hierarchy for the multi-step supplier tile upload flow.",
      },

      {
        type: "md",
        text: "The core design goal was clear ownership. Each layer owns a narrow responsibility and does not own the rest:",
      },
      {
        type: "ul",
        items: [
          {
            type: "md",
            text: "`UploadProvider` owns the batch file list, stable `uploadId`s, and object URL lifecycle (add/remove/cleanup). It does not own form state or mutations.",
          },
          {
            type: "md",
            text: "`UploadPreviewItem` owns one tile's lifecycle: build payload, run the upload mutation, show progress, and remove the item from the batch on success.",
          },
          {
            type: "md",
            text: "`UploadPreviewForm` owns form state (React Hook Form), step state, and credit rows via `useFieldArray`.",
          },
          "Each credit row owns its own supplier search input (debounced query + shared cache by search term).",
        ],
      },
      { type: "h3", text: "Preventing Unnecessary Re-renders" },
      {
        type: "md",
        text: "I treated re-render strategy as a first-class requirement:",
      },
      {
        type: "ul",
        items: [
          "Stable keys: `uploadId` per tile card and `field.id` per credit row keep component identity stable.",
          "High-frequency actions (typing, supplier search) stay local to a single card/row.",
          "List-level updates only happen on low-frequency events (add/remove/clear files).",
        ],
      },
      { type: "h3", text: "Outcome" },
      {
        type: "ul",
        items: [
          "Suppliers can batch upload multiple tiles and credit other suppliers without a clunky, error-prone form.",
          "Each tile upload is isolated: one failing tile does not break the entire batch.",
          "The flow stays extensible as requirements grow (more metadata, moderation, ranking signals).",
        ],
      },
    ],
  },

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
