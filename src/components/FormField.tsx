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
 */
export function FormField({
  label,
  type = 'text',
  multiline = false,
  hint,
  required = false,
  placeholder,
  ...rest
}: {
  label: string
  type?: string
  multiline?: boolean
  hint?: ReactNode
  required?: boolean
  placeholder?: string
}) {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-primary-dark">
        {label}
        {required && <span className="ml-0.5 text-accent-strong">*</span>}
      </label>

      {multiline ? (
        <textarea
          id={id}
          aria-describedby={hintId}
          required={required}
          placeholder={placeholder}
          rows={4}
          className={fieldClasses}
          {...rest}
        />
      ) : (
        <input
          id={id}
          type={type}
          aria-describedby={hintId}
          required={required}
          placeholder={placeholder}
          className={fieldClasses}
          {...rest}
        />
      )}

      {hint && (
        <p id={hintId} className="text-xs text-secondary">
          {hint}
        </p>
      )}
    </div>
  )
}
