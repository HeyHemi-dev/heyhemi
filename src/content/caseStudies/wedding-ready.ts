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
      "Fresh, relevant content is the product. That meant investing in a low-friction supplier publishing flow (batch uploads, fast tagging, good defaults) while keeping validation, auth, and data integrity tight end-to-end.",
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
        constraint:
          "Fresh content and accurate supplier tagging require a low-friction publishing workflow.",
        decision:
          "Build a multi-stage upload flow that supports up to 10 images at once, with lightweight tagging UX to link pins to the right suppliers without overwhelming the user.",
        tradeOff:
          "More complex form state, validation, and error recovery than a single-step upload form.",
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
    {
      type: "h2",
      text: "Deep Dive: Batch Upload + Supplier Tagging Without a Clunky Form",
    },
    {
      type: "p",
      text: "Wedding Ready needs fresh pins to stay useful, and pins only work if they link to the right local suppliers. The hard part was making supplier uploads fast enough to be repeatable, while keeping tagging accurate and the UI calm.",
    },
    { type: "h3", text: "Approach" },
    {
      type: "list",
      items: [
        "Use a multi-stage form to reduce cognitive load: upload -> details -> tagging -> review.",
        "Support batch selection (up to 10 images) and keep per-image metadata lightweight.",
        "Make tagging fast with search-first UI and sensible defaults (remember last-used suppliers where possible).",
        "Validate on both client and server so errors are caught early, but server remains the source of truth.",
      ],
    },
    {
      type: "code",
      language: "ts",
      code: [
        "// Pseudocode: multi-stage upload state (batch files + per-file metadata).",
        "type UploadStage = \"upload\" | \"details\" | \"tag\" | \"review\";",
        "",
        "type DraftPin = {",
        "  fileKey: string;",
        "  caption?: string;",
        "  taggedSupplierIds: string[];",
        "};",
        "",
        "const MAX_FILES = 10;",
        "const [stage, setStage] = useState<UploadStage>(\"upload\");",
        "const [drafts, setDrafts] = useState<DraftPin[]>([]);",
        "",
        "function onFilesSelected(files: File[]) {",
        "  if (files.length > MAX_FILES) throw new Error(\"Too many files\");",
        "  // Upload files and store fileKeys, then initialize drafts.",
        "}",
      ].join(\"\\n\"),
    },
    {
      type: "callout",
      title: "Trade-off",
      text: "A multi-stage flow improves UX, but it increases the number of states and failure modes. I kept it manageable by making the server authoritative and keeping draft state explicit and serializable.",
    },
    { type: "h3", text: "Outcome" },
    {
      type: "list",
      items: [
        "Suppliers can upload up to 10 images in one go, then tag the right suppliers without getting buried in fields.",
        "Pins reliably link to relevant local suppliers, reinforcing the core product promise.",
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
