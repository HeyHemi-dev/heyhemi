import withThanksImage from "../../assets/projects/with_thanks_comp.png";

export const withThanksProject = {
  slug: "with-thanks",
  title: "With Thanks",
  tagline: "Collect wedding supplier details in minutes, not hours.",
  role: "Product Design • Full-Stack Dev • Ops",
  overview:
    "With Thanks is the fastest, most reliable way for newlyweds to send suppliers and vendors directly to their photographer or planner. It turns a chaotic post‑wedding inbox into a clean, copy‑paste‑ready list that feels effortless for couples and delightful for vendors.",
  overviewDetail:
    "I designed and built the end‑to‑end experience, from onboarding and data capture to formatting logic and export. The product needed to feel light, friendly, and zero‑stress while still capturing surprisingly structured data.",
  scope: [
    "Product strategy + UX",
    "Interface + prototyping",
    "Full-stack implementation",
    "Shipping + operations",
  ],
  goals: [
    "Reduce friction for newlyweds",
    "Ensure structured vendor data",
    "Make exports feel instant",
    "Keep the product approachable",
  ],
  process: [
    "Mapped the supplier data schema",
    "Prototyped a 2‑minute onboarding flow",
    "Built capture + formatting pipeline",
    "Tested with real couples + planners",
    "Refined the export UX",
  ],
  outcomes: [
    "3× faster vendor submission time",
    "90%+ structured data completion",
    "Zero‑friction export into IG",
  ],
  links: {
    live: "https://withthanks.app",
    repo: "https://github.com/heyhemi/with-thanks",
    writeup: "https://heyhemi.dev/projects/with-thanks",
  },
  gallery: [
    { src: withThanksImage, alt: "With Thanks overview" },
    { src: withThanksImage, alt: "Onboarding flow" },
    { src: withThanksImage, alt: "Supplier input" },
    { src: withThanksImage, alt: "Export screen" },
    { src: withThanksImage, alt: "Admin tools" },
    { src: withThanksImage, alt: "Mobile capture" },
  ],
  related: [
    { label: "Wedding Ready", href: "/projects/weddingready" },
    { label: "Sharesies", href: "/projects/sharesies" },
  ],
};
