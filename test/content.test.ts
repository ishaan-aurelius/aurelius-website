import { describe, it, expect } from "vitest";
import { nav, solution, whyNow, whyUs, careers } from "@/content/site";

describe("site content", () => {
  it("nav has the four required links", () => {
    expect(nav.links.map((l) => l.label)).toEqual(["Solution", "Why Now", "Why Us", "Careers"]);
  });
  it("each grouping has exactly four items", () => {
    expect(solution.steps).toHaveLength(4);
    expect(solution.pillars).toHaveLength(4);
    expect(whyNow.stats).toHaveLength(4);
    expect(whyNow.points).toHaveLength(4);
    expect(careers.pillars).toHaveLength(4);
  });
  it("why-us proof has three entries with one gold", () => {
    expect(whyUs.proof).toHaveLength(3);
    expect(whyUs.proof.filter((p) => p.gold)).toHaveLength(1);
  });
});
