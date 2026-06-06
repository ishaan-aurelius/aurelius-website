"use client";
import { useState } from "react";
import { contact } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Kicker } from "@/components/ui/Kicker";
import { validateContact, type ContactErrors } from "@/lib/validation";

export function Contact() {
  const [form, setForm] = useState({ name: "", org: "", email: "", message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sent, setSent] = useState(false);

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
    "w-full border border-light-border bg-light-card px-4 py-3 font-body text-sm text-light-hi outline-none focus:border-gold";
  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value });

  return (
    <Section id="contact" theme="light">
      <div className="mx-auto max-w-[640px] text-center">
        <Kicker onLight>{contact.kicker}</Kicker>
        <h2 className="mt-5 font-display text-[clamp(32px,4.2vw,52px)] font-bold tracking-tight text-light-hi">{contact.title}</h2>
        <p className="mt-5 font-body text-[clamp(16px,1.5vw,19px)] text-light-mid">{contact.lede}</p>
      </div>

      {sent ? (
        <p className="mx-auto mt-10 max-w-[640px] text-center font-body text-light-hi">Thanks — we&apos;ll be in touch shortly.</p>
      ) : (
        <form onSubmit={submit} noValidate className="mx-auto mt-10 max-w-[640px] space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <input className={field} placeholder="Name" value={form.name} onChange={set("name")} aria-label="Name" />
              {errors.name && <p className="mt-1 font-body text-xs text-alert-l">{errors.name}</p>}
            </div>
            <input className={field} placeholder="Organization" value={form.org} onChange={set("org")} aria-label="Organization" />
          </div>
          <div>
            <input className={field} placeholder="Email" value={form.email} onChange={set("email")} aria-label="Email" />
            {errors.email && <p className="mt-1 font-body text-xs text-alert-l">{errors.email}</p>}
          </div>
          <div>
            <textarea className={field} rows={5} placeholder="Message" value={form.message} onChange={set("message")} aria-label="Message" />
            {errors.message && <p className="mt-1 font-body text-xs text-alert-l">{errors.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-gold px-8 py-4 font-display text-sm font-bold uppercase tracking-[0.15em] text-dark-canvas transition-colors hover:bg-gold-hoverL"
          >
            Send
          </button>
          <p className="text-center font-body text-sm text-light-low">
            or email{" "}
            <a className="text-gold-textL underline" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </p>
        </form>
      )}
    </Section>
  );
}
