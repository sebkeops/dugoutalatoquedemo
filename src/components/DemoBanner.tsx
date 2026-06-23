/**
 * Bandeau discret signalant un écran de démonstration.
 * À poser en tête des mockups back-office : "Aperçu — démonstration".
 */
export function DemoBanner({ label = 'Aperçu — démonstration' }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-accent-strong/30 bg-accent/15 px-4 py-1.5 text-xs font-medium text-accent-strong">
      <span aria-hidden="true">●</span>
      <span className="tracking-label uppercase">{label}</span>
    </div>
  )
}
