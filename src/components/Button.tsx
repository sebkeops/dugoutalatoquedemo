import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'accent' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const VARIANTS: Record<Variant, string> = {
  // Brun — action structurante (couche restaurant / navigation).
  primary:
    'bg-primary text-on-primary hover:bg-primary-dark shadow-soft',
  // Terracotta soutenu — action événementielle / traiteur (texte blanc).
  accent:
    'bg-accent-strong text-on-accent hover:brightness-95 shadow-soft',
  // Contour brun — action secondaire.
  outline:
    'border border-primary text-primary-dark hover:bg-surface',
  // Discret — action tertiaire.
  ghost: 'text-primary-dark hover:bg-surface',
}

const SIZES: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3 text-lg',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
}

/** Bouton de marque. Brun par défaut ; `accent` pour l'événementiel/traiteur. */
export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-2 rounded-button font-semibold',
        'transition-colors focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream',
        'disabled:cursor-not-allowed disabled:opacity-50',
        VARIANTS[variant],
        SIZES[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
