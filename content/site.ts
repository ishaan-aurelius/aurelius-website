// All site copy. Edit text here — never in layout.
export const nav = {
  links: [
    { label: "Why Now", href: "#why-now" },
    { label: "The Way Forward", href: "#solution" },
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

export const problem = {
  kicker: "The Problem",
  // gold = the demand we meet (minutes); red = the slow status quo (weeks/months/quarters).
  head: {
    pre: "The live battlefield demands ",
    gold: "minutes",
    mid: ", but ",
    red: "weeks, months, quarters",
    post: " are currently delivered.",
  },
  // Generic U.S.-military framing — no named officers, no named adversary/target.
  brief: {
    from: "U.S. Department of War HQ",
    to: "A U.S. Combatant Command",
    subj: "Execute order — immediate action required",
    objective: "Maximize effect on a near-peer adversary's critical military infrastructure.",
    req: "Strike plan required NLT 0800Z.",
  },
  clock: { label: "Time to Brief", start: "05:47:12" },
  // Decorative ambient telemetry (aria-hidden, near-background contrast).
  telemetry: [
    "ASSET F-35A // VIPER 01 // LAT 29.4241 // ALT 28,000FT",
    "THREAT SA-21 // RANGE 400KM // STATUS ACTIVE // SIGINT-7",
    "ASSET B-2A // GHOST 04 // STATUS STANDBY // VIS 2NM",
    "SUPPLY 847 UNITS // ETA 0340Z // TRANSIT",
    "THREAT IADS // 23 NODES ACTIVE // UNRESOLVED // PRIORITY HIGH",
    "ASSET DDG-84 // BULKELEY // TOMAHAWK 96 READY",
    "ASSET MQ-9 // REAPER 07 // LOITER 14HRS // FUEL 67%",
    "CYBER // 4 VECTORS // STATUS UNCONFIRMED // HUMINT-3",
    "ASSET E-8C // GROUND TRACK // 847 CONTACTS",
    "EW // JAMMING DETECTED // BEARING 330 DEG",
  ],
  stats: [
    { value: 847, label: "Assets", accent: "teal" },
    { value: 23, label: "Threat Systems", accent: "hi" },
    { value: 11, label: "Commands", accent: "gold" },
    { value: 5, label: "Domains", accent: "hi" },
  ] as { value: number; label: string; accent: "teal" | "gold" | "hi" }[],
};

// "The Way Forward" — the solution. Hexagon capabilities + the 01–04 method.
export const solution = {
  kicker: "Aurelius — The Solution",
  // gold = the thing we solve for.
  headline: { pre: "Solving for ", gold: "complexity & latency", post: "." },
  lede: "One kill-web-optimized, multi-domain platform — from mission planning to in-mission execution.",
  // The six capabilities of the hexagon. group drives color: platform = teal, operational = gold.
  capabilities: [
    { key: "killweb", title: "Kill-Web Architecture", note: "Tens, hundreds, thousands of kill chains — woven into one kill web.", group: "platform" },
    { key: "multidomain", title: "Multi-Domain & Scalable", note: "Air, land, sea, space, and cyber — planned at once.", group: "platform" },
    { key: "interop", title: "Inter-Operable", note: "Legacy systems plus next-gen capabilities. Zero rip-and-replace.", group: "platform" },
    { key: "speed", title: "Speed of Decisions", note: "Mission plans from months and days down to minutes.", group: "operational" },
    { key: "strategic", title: "Strategic to Operational", note: "Closes the gap from strategic direction to tactical execution.", group: "operational" },
    { key: "clarity", title: "Cross-Domain Clarity", note: "Commanders see what matters — no overload. The human stays in the loop.", group: "operational" },
  ] as { key: string; title: string; note: string; group: "platform" | "operational" }[],
  methodKicker: "From intent to executable plan",
  steps: [
    { n: "01", title: "Understand the Mission", body: "LLMs turn commander intent and doctrine into structured planning logic." },
    { n: "02", title: "Model the Options", body: "Optimization computes courses of action at combinatorial scale — every domain, asset, and constraint." },
    { n: "03", title: "Evaluate the Scenarios", body: "Stack-ranked, pareto-optimal options, with trade-offs surfaced in real time." },
    { n: "04", title: "Empower the Commander", body: "Commanders stay in control — armed with clarity, speed, and foresight." },
  ],
  bridge: "Kill-web optimized, multi-domain — mission planning to in-mission.",
};

// Two acts: the scale of the data problem, then the macro drivers ("why now").
export const whyNow = {
  scaleKicker: "The Scale",
  // accent: teal = data only, red = status/threat only, gold = accent, hi = neutral.
  stats: [
    { value: 2000000, comma: true, unit: "GB / Day", caption: "Sensor data, single theater", accent: "teal" },
    { value: 90, unit: "Seconds", caption: "To react to a Mach-5 threat", accent: "hi" },
    { value: 10000, comma: true, unit: "Signals / sec", caption: "Scanned by EW jamming suites", accent: "red" },
    { value: 10000, comma: true, unit: "Data Streams", caption: "Per command post", accent: "gold" },
  ] as { value: number; comma?: boolean; unit: string; caption: string; accent: "teal" | "hi" | "red" | "gold" }[],
  punch1: { pre: "Most of it is ", em: "never processed", post: "." },
  punch2: { pre: "The window of decision advantage is ", em: "narrowing. Fast.", post: "" },
  whyKicker: "Why Now",
  // Rendered as the section's big headline, over the kill-web visual.
  headline: { pre: "Modern defense has become a giant ", em: "network problem", post: "." },
  // Titles only — rendered as tactical "headline boxes", no subtext.
  drivers: [
    { n: "01", title: "A New US–China Cold War" },
    { n: "02", title: "Warfare Shifts to the Multi-Domain Kill Web" },
    { n: "03", title: "FY26 Budgets Prioritize AI & Autonomy" },
    { n: "04", title: "The Pentagon Backs Non-Traditional Tech" },
  ],
  bridge: "The Pentagon wants kill-web-optimized, multi-domain ops — mission planning to in-mission.",
};

// "Why Aurelius" — the thesis, the moat, the proof.
export const whyUs = {
  kicker: "Why Aurelius",
  // The technical thesis (the one point worth keeping from the "GenAI isn't enough" slide).
  headline: { pre: "GenAI alone can't decide. ", gold: "We fuse it with deep optimization", post: "." },
  lede: "Building optimizers at massive scale is incredibly hard — and we have every key network node covered.",
  // The moat. group drives the card's top-rule color: platform = teal, operational = gold.
  moat: [
    { tag: "Deep Data Access", title: "Zero Legacy", points: [
      "Ground-up, AI-first architecture — not reverse-engineered after the fact.",
      "Runs across on-prem, cloud, and edge.",
      "Layered data — no need to rip and replace legacy systems.",
    ], group: "platform" },
    { tag: "Deep Talent Access", title: "Scarce Talent", points: [
      "AI, math, and physics talent with ex-Google product depth.",
      "Real warfighting experience in the room.",
      "Built to orchestrate a super-combinatorial explosion.",
    ], group: "platform" },
    { tag: "Deep Military Relationships", title: "2,500+ Hours", points: [
      "2,500+ hours of expert advice and joint product development.",
      "A network of 4-star generals, commanders, and planners.",
      "Primes across simulation, cyber, EW, and intel.",
    ], group: "operational" },
    { tag: "Deep Domain Expertise", title: "Kill-Web Pioneer", points: [
      "The only company building kill webs from the ground up.",
      "Evolutionary-algorithm optimizers since GenAI's 2022 inflection.",
      "10^26 possible plans → 4 courses of action → in minutes.",
    ], group: "operational" },
  ] as { tag: string; title: string; points: string[]; group: "platform" | "operational" }[],
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
  closing: "Tough for others to catch up now.",
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
