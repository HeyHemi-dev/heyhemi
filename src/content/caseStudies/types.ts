export type ImageBlock = {
  type: "image";
  src: string; // e.g. "/images/weddingready/architecture.png"
  alt: string;
  caption?: string;
};

export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; title?: string; text: string }
  | {
      type: "code";
      language: "ts" | "js" | "sql" | "bash" | "txt";
      code: string;
    }
  | ImageBlock;

export type ConstraintDecisionRow = {
  constraint: string;
  decision: string; // include the "why" in the sentence
  tradeOff: string;
};

export type ConstraintsDecisionsTable = {
  caption?: string;
  rows: ConstraintDecisionRow[]; // 2-4 rows
};

export type CaseStudy = {
  slug: string;
  name: string;
  oneLiner: string;
  role: string;
  techStack: string[];

  tldr: {
    problem: string;
    solution: string;
    technicalWhy?: string;
  };

  systemOverview: {
    diagram: ImageBlock; // the one allowed diagram
    flowNote?: string; // 1-2 lines
  };

  constraintsDecisions: ConstraintsDecisionsTable; // the one allowed table

  deepDive: ContentBlock[]; // free-form but renderable blocks

  nextSteps: string[]; // 2-3 bullets
};
