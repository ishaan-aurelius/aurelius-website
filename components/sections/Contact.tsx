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
  const labelCls = "mb-2 block font-display text-xs font-bold uppercase tracking-[0.15em] text-light-low";
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
        <form onSubmit={submit} noValidate className="mx-auto mt-10 max-w-[640px] space-y-5 text-left">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="c-name" className={labelCls}>Name</label>
              <input id="c-name" className={field} value={form.name} onChange={set("name")} />
              {errors.name && <p className="mt-1 font-body text-xs text-alert-l">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="c-org" className={labelCls}>Organization</label>
              <input id="c-org" className={field} value={form.org} onChange={set("org")} />
            </div>
          </div>
          <div>
            <label htmlFor="c-email" className={labelCls}>Email</label>
            <input id="c-email" type="email" className={field} value={form.email} onChange={set("email")} />
            {errors.email && <p className="mt-1 font-body text-xs text-alert-l">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="c-message" className={labelCls}>Message</label>
            <textarea id="c-message" rows={5} className={field} value={form.message} onChange={set("message")} />
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
