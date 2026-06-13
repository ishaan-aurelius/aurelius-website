// All site copy. Edit text here — never in layout.
export const nav = {
  links: [
    { label: "Solution", href: "#solution" },
    { label: "Why Now", href: "#why-now" },
    { label: "Why Us", href: "#why-us" },
    { label: "Careers", href: "#careers" },
  ],
  primary: { label: "Request a Demo", href: "#contact" },
  secondary: { label: "Contact Us", href: "#contact" },
};

export const hero = {
  headPre: "Velocity meets clarity in ",
  headGold: "modern conflict",
  headPost: ".",
  sub: "The hardest military planning problems, turned into decision advantage — plans in minutes, not months.",
  primary: { label: "Request a Demo", href: "#contact" },
  secondary: { label: "Contact Us", href: "#contact" },
};

export const solution = {
  kicker: "The Solution",
  title: "Mission plans in minutes — not months.",
  lede: "A kill-web optimized, multi-domain platform — from planning to in-mission execution.",
  steps: [
    { n: "01", title: "Understand the Mission", body: "LLMs turn commander intent and doctrine into structured planning logic." },
    { n: "02", title: "Model the Options", body: "Optimization computes courses of action at combinatorial scale — every domain, asset, and constraint." },
    { n: "03", title: "Evaluate the Scenarios", body: "Stack-ranked, pareto-optimal options, with trade-offs surfaced in real time." },
    { n: "04", title: "Empower the Commander", body: "Commanders stay in control — armed with clarity, speed, and foresight." },
  ],
  pillars: [
    { title: "Kill-Web Architected", body: "Built ground-up for the network problem — not retrofitted onto legacy systems." },
    { title: "Zero Legacy, AI-First", body: "Deploys across on-prem, cloud, and edge — no rip-and-replace." },
    { title: "Human-in-the-Loop", body: "Enhances, never replaces, commander judgment under pressure." },
    { title: "Strategic to Operational", body: "One platform, theater planning to in-mission replanning." },
  ],
};

export const whyNow = {
  kicker: "Why Now",
  title: "Advantage belongs to the fastest decider",
  lede: "The side that decides and acts faster than the fight unfolds wins.",
  points: [
    { title: "Multi-Domain Warfare", body: "Land, sea, air, space, cyber — decisions must span every domain at once." },
    { title: "The Kill Web", body: "The kill chain is now a kill web — distributed warfighting demands AI-native C2." },
    { title: "Budget Tailwinds", body: "FY26 U.S. defense spending of $962B and rising NATO budgets prioritize AI and autonomy." },
    { title: "GenAI Isn't Enough", body: "Language models alone can't decide. Aurelius fuses GenAI with deep optimization." },
  ],
  closing: "Decision latency is no longer a tolerable risk — it's a battlefield liability.",
};

export const whyUs = {
  kicker: "Why Us",
  title: "GenAI-native mission planning, at massive scale",
  narrative: [
    "Aurelius is a US GenAI-native mission planning company built for the era of kill webs — helping commanders develop, evaluate, and action plans at massive scale.",
    "Built with the US military and US primes, our platform evaluates nearly 10^26 courses of action and delivers four ranked, executable plans in minutes. The engine is inherently dual-use, far beyond defense.",
  ],
  proof: [
    { big: "10", exp: "26", label: "Possible COAs", note: "100 trillion trillion. Not a typo.", gold: false },
    { big: "4", label: "Ranked Plans Delivered", note: "Distinct, comparable, actionable.", gold: true },
    { big: "MINUTES", label: "Not Months", note: "From intent to executable plan.", gold: false },
  ] as { big: string; exp?: string; label: string; note: string; gold: boolean }[],
  credentials: [
    { title: "Silicon Valley DNA", body: "Technologists behind products used by billions, and $200B+ of M&A." },
    { title: "Military Leadership", body: "Retired 4-star US Generals and leaders in US military AI innovation." },
    { title: "Prime-Grade Engineering", body: "Simulation engineering experts from major US primes." },
  ],
};

export const careers = {
  kicker: "Careers",
  title: "Build the decision engine",
  lede: "GenAI, optimization, and real mission logic in software that can change the trajectory of conflict.",
  pillars: [
    { title: "Real-World Impact", body: "What you build may shape future outcomes." },
    { title: "Elite Team", body: "Technologists, military strategists, and product minds at the edge of AI and conflict." },
    { title: "Zero Bureaucracy", body: "Small, fast, high-autonomy teams. No layers." },
    { title: "Dual-Use Future", body: "Pioneer decision intelligence for defense and beyond." },
  ],
  closing: "No defense experience required — just intellectual firepower and operational focus.",
  cta: { label: "Join Us", href: "#contact" },
};

export const contact = {
  kicker: "Contact",
  title: "Start the conversation",
  lede: "Investors, partners, and builders — reach out.",
  email: "contact@aurelius.guru",
};

export const footer = {
  tagline: "AI-Native Mission Engineering",
  copyright: "© 2026 Aurelius. All rights reserved.",
};
