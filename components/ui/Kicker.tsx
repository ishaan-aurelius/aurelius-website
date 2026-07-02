export function Kicker({ children, onLight = false }: { children: React.ReactNode; onLight?: boolean }) {
  // Gold text fails contrast on light → use goldTextL on light sections (color spec §5).
  const color = onLight ? "text-gold-textL" : "text-gold";
  return (
    <span className={`font-display block text-[18px] font-bold uppercase tracking-[0.22em] ${color}`}>
      {children}
    </span>
  );
}
