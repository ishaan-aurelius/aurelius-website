import { describe, it, expect } from "vitest";
import { validateContact } from "@/lib/validation";

describe("validateContact", () => {
  it("flags empty required fields", () => {
    const e = validateContact({ name: "", org: "", email: "", message: "" });
    expect(e.name).toBeTruthy();
    expect(e.email).toBeTruthy();
    expect(e.message).toBeTruthy();
  });
  it("rejects a malformed email", () => {
    const e = validateContact({ name: "A", org: "DIU", email: "nope", message: "hi there" });
    expect(e.email).toBeTruthy();
  });
  it("passes a valid submission with no errors", () => {
    const e = validateContact({ name: "A", org: "DIU", email: "a@b.gov", message: "Let's talk." });
    expect(Object.keys(e)).toHaveLength(0);
  });
});
