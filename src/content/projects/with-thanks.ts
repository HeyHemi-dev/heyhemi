import type { CaseStudy } from "./types";

export const withThanksCaseStudy = {
  slug: "with-thanks",
  name: "With Thanks",
  excerpt: "Case study coming soon.",
  heroImage: {
    src: "/favicon.svg",
    alt: "With Thanks project placeholder image",
  },
  oneLiner: "Collect supplier credits from newlyweds, faster.",
  roles: ["Full-Stack Developer"],
  techStack: ["TanStack Start"],
  problemSolution: {
    problem: "Supplier credit collection from couples was manual and slow.",
    solution:
      "With Thanks streamlines supplier detail capture and output formatting.",
  },
  architecture: {
    diagram: {
      src: "/favicon.svg",
      alt: "With Thanks architecture placeholder diagram",
      caption: "Architecture details coming soon.",
    },
    content: [],
  },
  engineering: {
    rows: [],
  },
  deepDive: {
    title: "Deep dive coming soon",
    content: [],
  },
  theme: {
    brandBg: "#a94012",
    indexBg: "#255f29",
    descriptionBg: "#f2864a",
    imageBg: "#ddd5b0",
    imageFrameBg: "#d2caa5",
    brandText: "#f6eadf",
    indexText: "#98be9b",
    descriptionText: "#2f2d26",
  },
} satisfies CaseStudy;
