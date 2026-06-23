import type { ReactNode } from 'react'

type Width = 'content' | 'wide' | 'full'

const WIDTHS: Record<Width, string> = {
  // Contenu courant : colonne mobile, conservée même sur desktop (lecture confortable).
  content: 'max-w-screen-sm',
  // Héros & galeries : étroit sur mobile, élargi à partir de md (présentation grand écran).
  wide: 'max-w-screen-sm md:max-w-5xl',
  // Pleine largeur (fonds de héros pleine bande).
  full: 'max-w-none',
}

/**
 * Conteneur responsive centré. Mobile-first : tout reste en colonne étroite à
 * ~375px ; `wide` autorise l'élargissement à partir de md pour les sections
 * héros / galeries traiteur. `full` retire la largeur max (fonds pleine bande).
 */
export function Container({
  width = 'content',
  className = '',
  children,
}: {
  width?: Width
  className?: string
  children: ReactNode
}) {
  const pad = width === 'full' ? '' : 'px-4'
  return (
    <div className={`mx-auto w-full ${WIDTHS[width]} ${pad} ${className}`}>
      {children}
    </div>
  )
}
