"use client";
import { useEffect, useRef, useState } from "react";
import { contact } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { validateContact, type ContactErrors } from "@/lib/validation";

const interests = [
  { value: "investor", label: "Investor" },
  { value: "partner", label: "Partner" },
  { value: "careers", label: "Careers" },
  { value: "press", label: "Press" },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", org: "", email: "", interest: "", message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sent, setSent] = useState(false);
  const [interestOpen, setInterestOpen] = useState(false);
  const interestRef = useRef<HTMLDivElement>(null);

  // Close the custom dropdown on outside-click or Escape (native <select> would handle
  // this for us, but we replaced it to control the open-state styling).
  useEffect(() => {
    if (!interestOpen) return;
    function onDocClick(e: MouseEvent) {
      if (interestRef.current && !interestRef.current.contains(e.target as Node)) setInterestOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setInterestOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [interestOpen]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateContact(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    // TODO(deploy): POST to a form service (Formspree/Resend) once hosting is chosen.
    console.log("contact submission", form);
    setSent(true);
  }

  const field =
    "w-full border border-dark-border bg-dark-card px-4 py-3 font-body text-sm text-dark-hi outline-none focus:border-gold";
  const labelCls = "mb-2 block font-display text-xs font-bold uppercase tracking-[0.15em] text-dark-low";
  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value });

  const selectedInterest = interests.find((o) => o.value === form.interest);

  return (
    <Section id="contact" theme="dark">
      <div className="mx-auto max-w-[640px] text-center">
        <Kicker>{contact.kicker}</Kicker>
        <h2 className="mt-5 font-display text-[clamp(32px,4.2vw,52px)] font-bold tracking-tight text-dark-hi">{contact.title}</h2>
        <p className="mt-5 font-body text-[clamp(16px,1.5vw,19px)] text-dark-mid">{contact.lede}</p>
      </div>

      {sent ? (
        <p className="mx-auto mt-10 max-w-[640px] text-center font-body text-dark-hi">Thanks. We&apos;ll be in touch shortly.</p>
      ) : (
        <form onSubmit={submit} noValidate className="mx-auto mt-10 max-w-[640px] space-y-5 text-left">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="c-name" className={labelCls}>Name</label>
              <input id="c-name" className={field} value={form.name} onChange={set("name")} />
              {errors.name && <p className="mt-1 font-body text-xs text-alert-d">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="c-org" className={labelCls}>Organization</label>
              <input id="c-org" className={field} value={form.org} onChange={set("org")} />
            </div>
          </div>
          <div>
            <label htmlFor="c-email" className={labelCls}>Email</label>
            <input id="c-email" type="email" className={field} value={form.email} onChange={set("email")} />
            {errors.email && <p className="mt-1 font-body text-xs text-alert-d">{errors.email}</p>}
          </div>
          <div>
            <span id="c-interest-label" className={labelCls}>Interest</span>
            <div className="relative" ref={interestRef}>
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={interestOpen}
                aria-labelledby="c-interest-label"
                onClick={() => setInterestOpen((o) => !o)}
                className={`${field} flex cursor-pointer items-center justify-between text-left`}
              >
                <span className={selectedInterest ? "text-dark-hi" : "text-dark-low"}>
                  {selectedInterest ? selectedInterest.label : "Select one"}
                </span>
                <svg
                  className={`ml-2 h-4 w-4 shrink-0 text-dark-low transition-transform ${interestOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {interestOpen && (
                <ul
                  role="listbox"
                  aria-labelledby="c-interest-label"
                  className="absolute z-20 mt-1 w-full border border-dark-border bg-dark-card py-1 shadow-lg"
                >
                  {interests.map((o) => (
                    <li
                      key={o.value}
                      role="option"
                      aria-selected={form.interest === o.value}
                      onClick={() => {
                        setForm({ ...form, interest: o.value });
                        setInterestOpen(false);
                      }}
                      className={`cursor-pointer px-4 py-2.5 font-body text-sm transition-colors hover:bg-dark-canvasAlt ${
                        form.interest === o.value ? "text-gold" : "text-dark-mid hover:text-dark-hi"
                      }`}
                    >
                      {o.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="c-message" className={labelCls}>Message</label>
            <textarea id="c-message" rows={5} className={field} value={form.message} onChange={set("message")} />
            {errors.message && <p className="mt-1 font-body text-xs text-alert-d">{errors.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-gold px-8 py-4 font-display text-sm font-bold uppercase tracking-[0.15em] text-dark-canvas transition-colors hover:bg-gold-hoverD"
          >
            Send
          </button>
        </form>
      )}
    </Section>
  );
}
