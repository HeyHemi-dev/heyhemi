import type { CaseStudy } from "./types";

export const sharesiesCaseStudy = {
  slug: "sharesies",
  name: "Sharesies",
  excerpt: "Case study coming soon.",
  heroImage: {
    src: "/favicon.svg",
    alt: "Sharesies project placeholder image",
  },
  oneLiner: "Internal tooling for employee share scheme operations.",
  roles: ["Software Engineer Intern"],
  techStack: ["React"],
  problemSolution: {
    problem:
      "Company-facing ESS workflows relied on manual spreadsheets and support-heavy operations.",
    solution:
      "Built a self-service internal portal to reduce manual steps and improve data flow.",
  },
  architecture: {
    diagram: {
      src: "/favicon.svg",
      alt: "Sharesies architecture placeholder diagram",
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
    brandBg: "#f7008b",
    indexBg: "#7e0067",
    descriptionBg: "#e6caec",
    imageBg: "#ebebee",
    imageFrameBg: "#dddddf",
    brandText: "#f8e6fa",
    indexText: "#f5cce8",
    descriptionText: "#3f2f45",
  },
} satisfies CaseStudy;
