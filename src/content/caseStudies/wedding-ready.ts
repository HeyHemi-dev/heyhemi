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
      "Fresh, relevant content is the product. That meant investing in a low-friction supplier publishing flow (batch uploads, fast tagging, good defaults) while keeping validation, auth, and data integrity tight end-to-end.",
  },
  architecture: {
    diagram: {
      src: "/wedding-ready/wedding-ready-diagram-feed.png",
      alt: "Wedding Ready feed fetch architecture diagram",
      caption:
        "Feed route architecture: /feed -> API -> operations/model layer -> Postgres, with ranked retrieval via a simple scoring algorithm and client save-state cache pre-hydration.",
    },
    flowNote: {
      type: "md",
      text: [
        "When `/feed` loads, the API returns tiles ordered by a simple scoring algorithm, excluding private, recently viewed, and already saved tiles, then marks returned tiles as viewed.",
        "",
        "The score is a weighted blend of recency, quality, and social signals, normalised to 0..1.",
        "",
        "The client pre-populates save-state cache entries in the same pass to avoid an N+1 per-tile save-state fetch pattern, while still allowing isolated per-tile save/unsave mutation.",
      ].join("\n"),
    },
  },
  engineering: {
    rows: [
      {
        constraint: {
          type: "md",
          text: "**Supporting multiple authentication providers** (email/password + Google OAuth)",
        },
        decision:
          "Refactored authentication architecture to separate authentication from onboarding; introduced an explicit onboarded state with routing guards.",
        tradeOff:
          "Significant rework of signup and routing logic; added complexity around user state management (authenticated but not onboarded vs authenticated and onboarded).",
      },
      {
        constraint: {
          type: "md",
          text: "**Multi-entity ownership and team access** (one user -> multiple suppliers; one supplier -> multiple staff)",
        },
        decision:
          "Designed a relational database schema supporting 1-to-many ownership and team-based access with scoped roles and permissions.",
        tradeOff:
          "Increased schema and validation complexity; required strict backend access controls and careful UI context switching.",
      },
      {
        constraint: {
          type: "md",
          text: "**Need for stable, low-downtime deployments as a solo dev**",
        },
        decision:
          "Established a structured testing environment (Vitest), added integration tests, used preview deployments, and automated database migrations via GitHub Actions before production releases.",
        tradeOff:
          "Significant upfront engineering time to build deployment and testing discipline; payoff was safer releases, higher confidence, and faster long-term iteration.",
      },
      {
        constraint: {
          type: "md",
          text: "**Limited developer capacity** (single builder)",
        },
        decision:
          "Adopted a serverless-first architecture (Next.js on Vercel + Supabase) to reduce infrastructure overhead, simplify scaling, and enable scale-to-zero.",
        tradeOff:
          "Tighter vendor coupling; performance considerations in serverless environments (e.g. cold starts); reduced low-level infrastructure control.",
      },
    ],
  },
  deepDive: [
    { type: "h2", text: "Multi-Step Tile Upload (Batch + Supplier Crediting)" },
    { type: "h3", text: "Problem" },
    {
      type: "md",
      text: [
        "Wedding Ready depends on fresh tiles from suppliers, and tiles only work if credited accurately. The original one-step upload could not support proper supplier crediting or a multi-step UX for multiple images. I also wanted to avoid a naive implementation that would cause unnecessary re-renders and make typing/search feel laggy once there are several tiles in the batch.",
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
        "Configure each tile in two steps: details -> credit suppliers",
        "Upload and delete per tile (no draft persistence; safe to lose state on refresh)",
      ],
    },
    {
      type: "image",
      src: "/wedding-ready/upload-component-hierarchy.svg",
      alt: "Upload flow component hierarchy diagram",
      caption:
        "Component hierarchy for the multi-step supplier tile upload flow.",
    },
    { type: "h3", text: "Architecture: Separation of Concerns" },
    {
      type: "md",
      text: "The core design goal was clear ownership. Each layer owns a narrow responsibility and does not own the rest:",
    },
    {
      type: "ul",
      items: [
        "- `UploadProvider` owns the batch file list, stable `uploadId`s, and object URL lifecycle (add/remove/cleanup). It does not own form state or mutations.",
        "- `UploadPreviewItem` owns one tile's lifecycle: build payload, run the upload mutation, show progress, and remove the item from the batch on success.",
        "- `UploadPreviewForm` owns form state (React Hook Form), step state, and credit rows via `useFieldArray`.",
        "- Each credit row owns its own supplier search input (debounced query + shared cache by search term).",
      ],
    },
    { type: "h3", text: "Performance: Avoiding Unnecessary Re-renders" },
    {
      type: "md",
      text: "I treated re-render strategy as a first-class requirement:",
    },
    {
      type: "ul",
      items: [
        "- Stable keys: `uploadId` per tile card and `field.id` per credit row keep component identity stable.",
        "- High-frequency actions (typing, supplier search) stay local to a single card/row.",
        "- List-level updates only happen on low-frequency events (add/remove/clear files).",
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
  outcomes: [
    "Built a full-stack, server-rendered Next.js application with clear boundaries between UI, server actions/handlers, operations, and data access.",
    "Implemented secure, validated file uploads integrated with authentication and database record creation.",
    "Designed a multi-stage supplier publishing workflow with batch uploads and fast supplier tagging to support fresh content and accurate pin-to-supplier links.",
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
