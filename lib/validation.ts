export type ContactInput = { name: string; org: string; email: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: ContactInput): ContactErrors {
  const e: ContactErrors = {};
  if (!input.name.trim()) e.name = "Name is required.";
  if (!input.email.trim()) e.email = "Email is required.";
  else if (!EMAIL.test(input.email)) e.email = "Enter a valid email.";
  if (!input.message.trim()) e.message = "Message is required.";
  return e;
}
