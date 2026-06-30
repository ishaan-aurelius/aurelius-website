// All site copy. Edit text here, never in layout.
export const nav = {
  links: [
    { label: "Careers", href: "#careers" },
    { label: "Our Team", href: "#alumni" },
    { label: "Contact", href: "#contact" },
  ],
  primary: { label: "Request a Demo", href: "#contact" },
};

export const hero = {
  headPre: "Velocity meets Clarity in ",
  headGold: "Modern Conflict",
  headPost: "",
  sub: "Mission Planning & In-Mission for Decision Superiority in Contested Environments",
  sub2: "In Minutes - Not Months, Not Quarters, Not Years!",
  primary: { label: "Request a Demo", href: "#contact" },
  secondary: { label: "Contact Us", href: "#contact" },
};

export const problem = {
  // gold = the demand we meet (minutes); red = the slow status quo (weeks).
  head: {
    pre: "Warfare now demands reacting within ",
    gold: "minutes",
    mid: " ",
    mid2: "Today's planners take ",
    red: "months, quarters and even years",
    post: "",
  },
  // follow-on line: gold = the solution we provide.
  sub: {
    pre: "Constantly changing parameters at massive scale make this a ",
    em: "super combinatorial explosion",
    post: " problem that modern computers struggle to solve",
  },
  // Generic U.S.-military framing, no named officers, no named adversary/target.
  brief: {
    from: "U.S. Department of War HQ",
    to: "A U.S. Combatant Command",
    subj: "Execute order: immediate action required",
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

// "The Platform", the product. Hexagon capabilities + the 01-04 method.
export const solution = {
  kicker: "Product Overview",
  // gold = the thing we solve for.
  headline: { pre: "Multi-Domain, Pareto-Optimal Mission Plans ", gold: "in minutes", post: ", powered by proprietary GenAI optimizer" },
  lede: "One platform: Kill-Web-optimized, multi-domain, planning to in-mission.",
  // The six capabilities of the hexagon. group drives color: platform = teal, operational = gold.
  capabilities: [
    { key: "killweb", title: "Kill-Web Architecture", note: "Tens, hundreds, thousands of kill chains, woven into one kill web.", group: "platform" },
    { key: "multidomain", title: "Multi-Domain & Scalable", note: "Air, land, sea, space, and cyber, all planned at once.", group: "platform" },
    { key: "interop", title: "Inter-Operable", note: "Legacy systems plus next-gen capabilities. No rip-and-replace.", group: "platform" },
    { key: "speed", title: "Speed of Decisions", note: "Mission plans from months and days down to minutes.", group: "operational" },
    { key: "strategic", title: "Strategic to Operational", note: "Closes the gap from strategic direction to tactical execution.", group: "operational" },
    { key: "clarity", title: "Cross-Domain Clarity", note: "Commanders see what matters, without the overload. The human stays in the loop.", group: "operational" },
  ] as { key: string; title: string; note: string; group: "platform" | "operational" }[],
  methodKicker: "From intent to executable plan",
  steps: [
    { n: "01", title: "Understand Mission", body: "Commander intent and doctrine → structured planning logic" },
    { n: "02", title: "Model Options", body: "Compute CoAs - across domains, assets, & constraints" },
    { n: "03", title: "Evaluate Scenarios", body: "Pareto Optimal solutions in real time" },
    { n: "04", title: "Empower Commander", body: "Commander has all information to make decisions" },
  ],
};

// Two acts: the scale of the data problem, then the macro drivers ("why now").
// One continuous narrative, picking up where Scale left off (drowning in data):
// Beat 1 interconnection → Beat 2 the explosion that data creates → Beat 3 urgency.
export const whyNow = {
  whyKicker: "Why Now",
  // Beat 1, interconnection. The section's big headline, over the kill-web visual.
  headline: { pre: "Modern Battlefield is a ", em: "Kill Web", post: ": Complex, Interconnected Networks" },
  // Beat 2, the combinatorial explosion. Each input MULTIPLIES the decision space (not
  // adds), so the web detonates and the count races to 10^26, the bridge from "too much
  // data" (Scale) to "too many possible plans no human can solve". The 10^26 → 4 COAs
  // *solution* payoff lands later in Why Aurelius.
  explosion: {
    lead: { pre: "In a connected web, each new asset, domain, and threat doesn't add to the problem, it ", em: "multiplies", post: " it." },
    // The factors that multiply, data inputs (rendered teal). Displays are evocative,
    // not literal; the point is the runaway product, not the arithmetic.
    factors: [
      { label: "Assets", display: "100s" },
      { label: "Domains", display: "5" },
      { label: "Threats", display: "10s" },
      { label: "Windows", display: "secs" },
    ],
    // The detonation payoff. resultExp animates 0→26 as the exponent of 10.
    resultExp: 26,
    resultLabel: "possible plans",
    resultLine: { pre: "A ", em: "super combinatorial explosion", post: " no human can solve." },
  },
  // Beat 3, urgency. Titles only, rendered as tactical "headline boxes", no subtext.
  drivers: [
    { n: "01", title: "Near-peer adversaries already operate at machine speed" },
    { n: "02", title: "Multi-domain conflict has outpaced human planning" },
    { n: "03", title: "Legacy systems were built for a different era of warfare" },
    { n: "04", title: "Decision windows are now measured in seconds" },
  ],
  // The six key pain points, terse, presentation-style (no "the"/"and"; "&" for "and").
  // Merges the old driver boxes + capability gaps into one tactical "status board": em = the
  // bold key phrase, status = the red HUD tag, fill = lit segments (of 10) on the severity
  // bar. fill is high where the problem is runaway, near-zero where capability is unused.
  gaps: [
    { pre: "", em: "Decision timelines too long", post: ", measured in seconds", status: "CRITICAL", fill: 9 },
    { pre: "Data ", em: "siloed & fragmented", post: " across service lines, no unifying data fabric", status: "FRAGMENTED", fill: 5, tone: "caution" },
    { pre: "Commanders ", em: "overwhelmed by complexity, info overload", post: "", status: "SATURATED", fill: 9 },
    { pre: "Can't ", em: "leverage modern GenAI", post: " effectively", status: "URGENT", fill: 10 },
    { pre: "", em: "Multi-domain conflict", post: " outpaced human planning", status: "OUTPACED", fill: 8 },
    { pre: "", em: "Near-peer adversaries", post: " operate at machine speed", status: "ESCALATING", fill: 9 },
  ] as { pre: string; em: string; post: string; status: string; fill: number; tone?: "alert" | "caution" }[],
  // Beat 4, the combinatorial payoff caption under the kill-web visual: the decision
  // space detonates to 10^26 possible plans no human can hold. Recomposes the approved
  // `explosion` phrasing above into the single line the current layout renders.
  network: {
    caption: {
      pre: "In a connected web, each new asset, domain, and threat doesn't add to the problem, it ",
      em: "multiplies",
      mid: " it, a super combinatorial explosion to 10",
      exp: "26",
      post: " possible plans no human can solve.",
    },
  },
  bridge: "Exactly what the Pentagon wants: Kill-Web optimized, multi-domain ops from planning through execution.",
};

// "The Scale", recreates the cognitive-overload slide 1:1 (copy, stat colors, icons).
export const scale = {
  kicker: "Scale",
  // gold = the key pain point, matching the gold-accent pattern of every other headline.
  headline: { pre: "Commanders face ", gold: "cognitive overload", post: " from volume of data bombarding them constantly..." },
  // accent maps to the slide's per-column color; icon names map to react-icons/fa glyphs.
  stats: [
    { icon: "bolt", from: 1000000, value: 2000000, unit: "GB / Day", caption: "Aggregate Daily projected data from advanced sensor arrays in a theatre", accent: "red" },
    { icon: "globe", from: 50, value: 90, unit: "Seconds", caption: "Reaction Time for Mach5 Hypersonic from 100 miles away", accent: "teal" },
    { icon: "dragon", from: 5000, value: 10000, unit: "Requests / Second", caption: "No. of Adversarial signals scanned by US EW Jamming Suites", accent: "red" },
    { icon: "landmark", from: 5000, value: 10000, unit: "Data Streams", caption: "Being Monitored on average by US Command Post", accent: "gold" },
  ] as { icon: "bolt" | "globe" | "dragon" | "landmark"; from: number; value: number; unit: string; caption: string; accent: "teal" | "red" | "gold" }[],
  punch: "Majority of digital data generated by US military assets go un-processed",
  bottomLine: "Window of American decision advantage in contested environments is narrowing fast",
};

// "Why Aurelius", the thesis, the moat, the proof.
export const whyUs = {
  kicker: "Why Aurelius",
  // The technical thesis (the one point worth keeping from the "GenAI isn't enough" slide).
  headline: { pre: "GenAI alone can't decide. ", gold: "We fuse it with deep optimization", post: "." },
  lede: "Few teams can build optimizers at this scale. We cover every key node in the network.",
  // The moat. group drives the card's top-rule color: platform = teal, operational = gold.
  moat: [
    { tag: "Deep Data Access", title: "Zero Legacy", points: [
      "Built ground-up and AI-first, not reverse-engineered after the fact.",
      "Runs across on-prem, cloud, and edge.",
      "Layered data, so there's no need to rip and replace legacy systems.",
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
  title: "Build the Decision Engine for the Ages",
  lede: "",
  pillars: [
    { title: "Real-World Impact", body: "What you build shapes the outcome" },
    { title: "Elite Team", body: "Technologists, military strategists, and product minds at the edge of AI and conflict." },
    { title: "Zero Bureaucracy", body: "Small, fast, high-autonomy teams. No layers." },
    { title: "Dual-Use Future", body: "Pioneer decision intelligence for defense and beyond." },
  ],
  closing: "",
  cta: { label: "Join Us", href: "#contact" },
};

export const contact = {
  kicker: "Contact",
  title: "Start the conversation",
  lede: "Government partners, industry, and builders: reach out.",
  email: "contact@aurelius.guru",
};

export const footer = {
  tagline: "AI-Native Mission Engineering",
  copyright: "© 2026 Aurelius. All rights reserved.",
};
