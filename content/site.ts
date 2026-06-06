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
  kicker: "AI-Native Mission Engineering",
  headPre: "Velocity meets clarity in ",
  headGold: "modern conflict",
  headPost: ".",
  sub: "Aurelius turns the hardest military planning problems into decision advantage — mission plans in minutes, not months.",
  primary: { label: "Request a Demo", href: "#contact" },
  secondary: { label: "Contact Us", href: "#contact" },
};

export const solution = {
  kicker: "The Solution",
  title: "Mission plans in minutes — not months.",
  lede: "A kill-web optimized, multi-domain platform spanning mission planning to in-mission execution. It doesn't make the decision — it gives commanders the best possible map of the decision space before the window closes.",
  steps: [
    { n: "01", title: "Understand the Mission", body: "Large language models interpret commander intent and doctrine into structured, objective-based planning logic." },
    { n: "02", title: "Model the Options", body: "Advanced optimization computes courses of action at combinatorial scale — across every domain, asset, and constraint — beyond what any human staff process can parse." },
    { n: "03", title: "Evaluate the Scenarios", body: "Stack-ranked, pareto-optimal courses of action — trade-offs, constraints, and consequences surfaced in real time, backtested against existing supply chains." },
    { n: "04", title: "Empower the Commander", body: "Human decision-makers stay in control — armed with clarity, speed, and actionable foresight." },
  ],
  pillars: [
    { title: "Kill-Web Architected", body: "Built ground-up for the network problem modern defense has become — not retrofitted onto legacy systems." },
    { title: "Zero Legacy, AI-First", body: "Layered data architecture deploys across on-prem, cloud, and edge — no rip-and-replace required." },
    { title: "Human-in-the-Loop", body: "Designed to enhance, not replace, commanders' judgment under pressure." },
    { title: "Strategic to Operational", body: "One platform from theater-level planning down to in-mission replanning as conditions change." },
  ],
};

export const whyNow = {
  kicker: "Why Now",
  title: "Advantage belongs to the fastest decider",
  lede: "The side that can decide, adapt, and act faster than the fight unfolds — wins. Today's battlespace by the numbers:",
  stats: [
    { value: 2, suffix: "M", unit: "GB / DAY", caption: "Sensor data per theater, per day" },
    { value: 90, suffix: "", unit: "SECONDS", caption: "Mach 5 hypersonic reaction window" },
    { value: 10, suffix: "K", unit: "STREAMS", caption: "Monitored at once by a command center" },
    { value: null, text: "MONTHS", unit: "", caption: "To plan one mission, in one domain, today" },
  ] as { value: number | null; suffix?: string; text?: string; unit: string; caption: string }[],
  points: [
    { title: "Multi-Domain Warfare", body: "Land, sea, air, space, cyber: decisions must now span all domains, simultaneously and in sync, across multiple commands." },
    { title: "The Kill Web", body: "The kill chain has become a kill web. Distributed warfighting demands AI-native, human-machine teaming — faster, smarter command and control." },
    { title: "Budget Tailwinds", body: "FY26 U.S. defense spending of $962B and NATO commitments rising toward 5% of GDP prioritize AI, autonomy, and C2ISR." },
    { title: "GenAI Isn't Enough", body: "Language models alone weren't built for decision-making. Aurelius fuses GenAI with deep optimization to operate where others can't." },
  ],
  closing: "Decision latency is no longer a tolerable risk — it's a battlefield liability.",
};

export const whyUs = {
  kicker: "Why Us",
  title: "GenAI-native mission planning, at massive scale",
  narrative: [
    "Aurelius is a US GenAI-native mission planning company built for the era of kill chains and kill webs. We enable generals, commanders, and planners to develop, evaluate, and action mission plans at massive scale — warfighting, asset deployment, logistics, and beyond.",
    "Our proprietary platform, built in close cooperation with the US military and US primes, is multi-domain end to end. It produces four distinct, head-to-head comparable courses of action from nearly 10^26 possibilities — 100 trillion trillion, and no, that's not a typo — evaluated and ready to action in minutes.",
    "Our mission space extends beyond the military to the wider defense domain, including all forms of critical civilian infrastructure. The engine underneath is inherently dual-use: the same decision technology applies to logistics, drug discovery, financial services, and other massive sectors.",
    "We are currently bidding for US defense contracts in partnership with a US prime and a major US defense-tech company, and gearing up for NATO opportunities.",
  ],
  proof: [
    { big: "10²⁶", label: "Possible COAs", note: "100 trillion trillion. Not a typo.", gold: false },
    { big: "4", label: "Ranked Plans Delivered", note: "Distinct, comparable, actionable.", gold: true },
    { big: "MINUTES", label: "Not Months", note: "From intent to executable plan.", gold: false },
  ],
  credentials: [
    { title: "Silicon Valley DNA", body: "Seasoned technologists who launched iconic products used by billions — and led over $200B of M&A across tech and travel." },
    { title: "Military Leadership", body: "Retired 4-star US Generals, members of high-profile US military advisory councils, and leadership roles in US military AI innovation." },
    { title: "Prime-Grade Engineering", body: "Key simulation engineering experts from major US primes — the people who build and validate systems at defense scale." },
  ],
};

export const careers = {
  kicker: "Careers",
  title: "Build the decision engine",
  lede: "We're fusing GenAI, optimization, and real-world mission logic into software that can change the trajectory of conflict. If you can think clearly in complexity, design for pressure, and build for deployment — we want to talk.",
  pillars: [
    { title: "Real-World Impact", body: "What you build may shape future outcomes." },
    { title: "Elite Team", body: "Work alongside technologists, military strategists, and product minds who've operated at the edge of AI, conflict, and scale." },
    { title: "Zero Bureaucracy", body: "Small, fast, high-autonomy teams. No layers. No fluff." },
    { title: "Dual-Use Future", body: "Help pioneer decision intelligence for defense and beyond." },
  ],
  closing: "No defense experience required. Just intellectual firepower, AI wizardry, and operational focus.",
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
