import { describe, it, expect } from "vitest";
import { nav, solution, whyNow, whyUs, careers } from "@/content/site";

describe("site content", () => {
  it("nav has the expected links", () => {
    expect(nav.links.map((l) => l.label)).toEqual(["Why Now", "The Platform", "Careers"]);
  });
  it("each grouping has the expected item count", () => {
    expect(solution.steps).toHaveLength(4);
    expect(solution.capabilities).toHaveLength(6);
    expect(whyNow.stats).toHaveLength(4);
    expect(whyNow.drivers).toHaveLength(4);
    expect(careers.pillars).toHaveLength(4);
  });
  it("why-aurelius has a four-card moat and a three-entry proof with one gold", () => {
    expect(whyUs.moat).toHaveLength(4);
    expect(whyUs.proof).toHaveLength(3);
    expect(whyUs.proof.filter((p) => p.gold)).toHaveLength(1);
  });
});
