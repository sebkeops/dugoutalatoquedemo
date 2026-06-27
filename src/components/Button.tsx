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

/**
 * Classes de bouton de marque, réutilisables pour styler un autre élément
 * (ex. un <Link> de react-router) en bouton sans dupliquer le style.
 */
export function buttonClasses(
  variant: Variant = 'primary',
  size: Size = 'md',
  className = '',
): string {
  return [
    'inline-flex items-center justify-center gap-2 rounded-button font-semibold',
    'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream',
    'hover:-translate-y-0.5 active:translate-y-0',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0',
    VARIANTS[variant],
    SIZES[size],
    className,
  ].join(' ')
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
    <button className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </button>
  )
}
