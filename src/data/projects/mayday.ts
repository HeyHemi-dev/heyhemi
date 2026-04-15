import type { CaseStudy } from "../types";

export const maydayCaseStudy: CaseStudy = {
  slug: "mayday",
  name: "Mayday Weddings",
  excerpt:
    "A focused job board that helped wedding vendors find cover fast if they got sick during COVID-19. Built with a no-code/low-code stack, it matched jobs to qualified vendors, collected one-click responses, and presented a filterable candidate list.",
  heroImage: {
    src: "/apple-touch-icon.png",
    alt: "Mayday Weddings project placeholder image",
  },
  liveUrl: undefined,
  repoUrl: undefined,
  oneLiner:
    "COVID-era job board helping wedding suppliers find cover if they got sick",
  roles: ["Founder", "Product", "No-code/Low-code Development"],
  techStack: [
    { type: "md", text: "**Webflow** - UI, job posting, member profiles" },
    { type: "md", text: "**Airtable** - Datastore & admin UI" },
    { type: "md", text: "**Make (Integromat)** - orchestration + automations" },
    { type: "md", text: "**SendGrid** - email delivery + batching" },
    { type: "md", text: "**Custom webhooks** - matching + state changes" },
    { type: "md", text: "**JavaScript** - on-page logic" },
  ],
  problemSolution: {
    problem:
      "During COVID isolation waves, wedding vendors needed to replace key roles at short notice. Open social channels were noisy and unreliable, and cancellations were common when the right people couldn’t be reached fast enough.",
    solution:
      "Mayday Weddings used a job-board format to connect vendors who needed cover with available, qualified replacements. Job posts were delivered directly to inboxes (and SMS for urgent posts), responses were one-click, and posters received a filterable list of candidates with relevant detail (ratings, experience, skill level, and more).",
  },
  engineering: {
    caption:
      "Key decisions to make cover-finding fast, reliable, and easy to triage during COVID.",
    rows: [
      {
        constraint:
          "A replacement workflow only works if it’s fast and low-friction for both sides.",
        decision: {
          type: "md",
          text: "**Optimized for “post → notify → one-click response → shortlist”** so vendors can post quickly and candidates can indicate availability with minimal effort.",
        },
        tradeOff:
          "Requires careful UX tuning and dependable messaging; failures show up immediately as missed cover opportunities.",
      },
      {
        constraint:
          "Speed to launch mattered more than building bespoke infrastructure during COVID disruption.",
        decision: {
          type: "md",
          text: "**Connected no-code/low-code platforms** (Webflow + Airtable + Make + SendGrid) and used lightweight JS/webhooks for app-specific logic.",
        },
        tradeOff:
          "Operational issues (rate limits, deliverability, error handling) still have to be solved, but within platform constraints.",
      },
      {
        constraint:
          "Job posts need to reach the right people reliably, not get buried or missed.",
        decision: {
          type: "md",
          text: "**Delivered job posts directly to inboxes** (and SMS for urgent posts) so requests aren’t lost in a noisy feed.",
        },
        tradeOff:
          "Deliverability, rate limits, and retries become product-critical concerns that need ongoing monitoring and iteration.",
      },
      {
        constraint:
          "Vendors need to quickly compare candidates without managing scattered DMs and comment threads.",
        decision: {
          type: "md",
          text: "**Presented responses as a filterable candidate list** with details like ratings, experience, and skill level to support fast triage.",
        },
        tradeOff:
          "Requires keeping response data consistent and maintaining filtering UX as the feature set grows (e.g. job filtering and profile updates).",
      },
    ],
  },
  deepDive: {
    title: "Mayday vs Facebook groups (and how it worked)",
    content: [
      {
        type: "md",
        text: [
          "Mayday Weddings was a mission-critical web application designed to solve an urgent problem during the COVID-19 pandemic. When a wedding vendor had to isolate, they needed to find a trusted and qualified replacement fast.",
          "",
          "I designed, developed, and deployed the app end-to-end, connecting a no-code/low-code stack and adding a thin layer of JavaScript and webhooks so it could ship quickly and keep working under pressure.",
        ].join("\n"),
      },

      { type: "h3", text: "Why Mayday was better than Facebook" },
      {
        type: "md",
        text: [
          "Facebook groups were the standard way suppliers would find cover. This works while the volumn is low. But at high volume, it starts to fail: important posts get buried and responses get spread across comments and DMs.",
          "",
          "Mayday's focus allowed it to improve on this experience in all areas:",
        ].join("\n"),
      },
      {
        type: "ul",
        items: [
          {
            type: "md",
            text: "Job posts are delivered to inboxes where they won’t be missed.",
          },
          {
            type: "md",
            text: "Notifications were targeted to go to vendors who match the skills and region required.",
          },
          {
            type: "md",
            text: "The job poster would get a nicely formatted list of available candidates they could view and filter (skill level, relative price, preferred camera brand, and more).",
          },
        ],
      },

      { type: "h3", text: "How it worked" },
      {
        type: "ol",
        items: [
          {
            type: "md",
            text: "**Post a job** with the basics (skill, region) and job details like date, location, estimated budget, skills, and hours needed. Mark it urgent if it’s time critical.",
          },
          {
            type: "md",
            text: "**Mayday messages local vendors** who match the job details (email, plus SMS for urgent posts).",
          },
          {
            type: "md",
            text: "**One-click responses** let people indicate availability instantly.",
          },
          {
            type: "md",
            text: "**Browse a shortlist-ready list** of candidates with ratings, experience, skill level, and a connect button. Filter the list to find the best fit.",
          },
        ],
      },

      { type: "h3", text: "Post-launch" },
      {
        type: "md",
        text: "After launch I kept iterating in production:",
      },
      {
        type: "ul",
        items: [
          "Troubleshooting rate limits",
          "Improving email deliverability",
          "Hardening error handling",
          "Adding profile updates (with a review process)",
          "Adding job filtering",
          "Adding on-page job applications",
        ],
      },

      { type: "h3", text: "Impact" },
      {
        type: "md",
        text: "Mayday was very well received by the community:",
      },
      {
        type: "ul",
        items: [
          "We connected 500 vendors and saved 100 weddings.",
          "It was featured by The Project, 1News, Newstalk ZB, RNZ, NewsHub, and more.",
          "And I received (unprompted) a few hundred dollars in donations.",
        ],
      },
    ],
  },
};
