export type ImageAsset = {
  src: string;
  alt: string;
  caption?: string;
};

export type CodeLanguage = "ts" | "js" | "sql" | "bash" | "txt";

export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; title?: string; text: string }
  | { type: "code"; language: CodeLanguage; code: string }
  | ({ type: "image" } & ImageAsset);

export type ConstraintDecisionRow = {
  constraint: string;
  decision: string;
  tradeOff: string;
};

export type ConstraintsDecisionsTable = {
  caption?: string;
  rows: ConstraintDecisionRow[];
};

// These map directly to CSS custom properties used by project sections.
export type CaseStudyTheme = {
  brandBg: string;
  indexBg: string;
  descriptionBg: string;
  imageBg: string;
  imageFrameBg: string;
  brandText: string;
  indexText: string;
  descriptionText: string;
  descriptionMuted?: string;
};

// Minimal shape needed for index/home cards.
export type CaseStudyPreview = {
  slug: string;
  name: string;
  logo?: ImageAsset;
  excerpt: string;
  heroImage: ImageAsset;
};

export type CaseStudy = CaseStudyPreview & {
  oneLiner: string;
  role: string;
  techStack: string[];

  problemSolution: {
    problem: string;
    solution: string;
    technicalWhy?: string;
  };

  systemOverview: {
    diagram: ImageAsset;
    flowNote?: string;
  };

  constraintsDecisions: ConstraintsDecisionsTable;

  deepDive: ContentBlock[];

  outcomes: string[];

  // Per-case-study design tokens that can be emitted as CSS variables.
  theme: CaseStudyTheme;
};
