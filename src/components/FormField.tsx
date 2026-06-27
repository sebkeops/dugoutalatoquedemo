import { useId, type ReactNode } from 'react'

const fieldClasses = [
  'w-full rounded-button border border-secondary/50 bg-cream px-3 py-2 text-ink',
  'placeholder:text-secondary/70',
  'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40',
].join(' ')

/**
 * Champ de formulaire accessible (label lié, focus visible).
 * Rend un <input> par défaut, ou un <textarea> si `multiline`.
 * `hint` affiche une aide sous le champ.
 *
 * Champ contrôlé : passer `value` + `onChange(valeur)` (signature simplifiée,
 * adaptée à un état local React — pas de soumission native).
 */
export function FormField({
  label,
  type = 'text',
  multiline = false,
  hint,
  required = false,
  placeholder,
  name,
  value,
  onChange,
}: {
  label: string
  type?: string
  multiline?: boolean
  hint?: ReactNode
  required?: boolean
  placeholder?: string
  name?: string
  value?: string
  onChange?: (value: string) => void
}) {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined
  const common = {
    id,
    name,
    'aria-describedby': hintId,
    required,
    placeholder,
    value,
    className: fieldClasses,
    onChange: (e: { target: { value: string } }) => onChange?.(e.target.value),
  }

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-primary-dark">
        {label}
        {required && <span className="ml-0.5 text-accent-strong">*</span>}
      </label>

      {multiline ? (
        <textarea {...common} rows={4} />
      ) : (
        <input {...common} type={type} />
      )}

      {hint && (
        <p id={hintId} className="text-xs text-secondary">
          {hint}
        </p>
      )}
    </div>
  )
}
