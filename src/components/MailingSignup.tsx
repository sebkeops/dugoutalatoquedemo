import { useState } from 'react'
import { Button } from './Button'
import { Card } from './Card'
import { FormField } from './FormField'

/**
 * Inscription à la liste de diffusion (feature F1).
 * DÉMONSTRATION : aucun envoi réel — à la validation, on affiche un état de
 * succès simulé. Pas de <form> à soumission native (onClick + état local).
 */
export function MailingSignup() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const valid = /.+@.+\..+/.test(email)

  if (done) {
    return (
      <Card accent>
        <p className="font-heading text-lg text-primary-dark">Merci, vous êtes inscrit·e !</p>
        <p className="mt-1 text-sm text-ink/80">
          Vous recevrez nos prochaines actualités à <strong>{email}</strong>.
          <br />
          <span className="text-xs italic text-secondary">
            (Démonstration — aucun e-mail n’est réellement envoyé.)
          </span>
        </p>
      </Card>
    )
  }

  return (
    <Card>
      <h3 className="font-heading text-lg text-primary-dark">Restons en contact</h3>
      <p className="mt-1 text-sm text-ink/80">
        Soirées à thème, événements à emporter, nouveautés du midi : recevez nos actualités.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <FormField
            label="Votre e-mail"
            type="email"
            name="email"
            placeholder="prenom@exemple.fr"
            value={email}
            onChange={setEmail}
          />
        </div>
        <Button
          type="button"
          variant="accent"
          disabled={!valid}
          onClick={() => setDone(true)}
        >
          S’inscrire
        </Button>
      </div>
    </Card>
  )
}
