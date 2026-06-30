import { describe, it, expect } from "vitest";
import { nav, careers } from "@/content/site";

describe("site content", () => {
  it("nav has the expected links", () => {
    expect(nav.links.map((l) => l.label)).toEqual(["Careers", "Our Team", "Contact"]);
  });
  it("each grouping has the expected item count", () => {
    expect(careers.pillars).toHaveLength(4);
  });
});
