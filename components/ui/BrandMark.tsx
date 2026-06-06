export function BrandMark({ className = "" }: { className?: string }) {
  // Rounded triangular "A" peak from the logo geometry — decorative accent only.
  return (
    <svg viewBox="0 0 64 56" fill="none" className={className} aria-hidden="true">
      <path
        d="M32 6 L58 50 a6 6 0 0 1-5 6 H11 a6 6 0 0 1-5-6 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
