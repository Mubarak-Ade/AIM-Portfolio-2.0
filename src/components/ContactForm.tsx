import { useRef, useState, type FormEvent } from 'react'
import { ArrowUpRight, CheckCircle, WarningCircle } from '@phosphor-icons/react'
import { site } from '../data/site'
import { CopyEmailButton } from './CopyEmailButton'
import { btnPrimary, fieldControl, fieldLabel } from '../lib/ui'

type Fields = {
  name: string
  email: string
  topic: string
  message: string
}

type FieldName = keyof Fields
type Errors = Partial<Record<FieldName, string>>

const initialFields: Fields = {
  name: '',
  email: '',
  topic: '',
  message: '',
}

const fieldOrder: FieldName[] = ['name', 'email', 'topic', 'message']

function validate(fields: Fields): Errors {
  const errors: Errors = {}

  if (fields.name.trim().length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = 'Enter an email address in the format name@example.com.'
  }

  if (!fields.topic) {
    errors.topic = 'Choose what this is about.'
  }

  if (fields.message.trim().length < 12) {
    errors.message = 'Give me a sentence or two to work with (at least 12 characters).'
  }

  return errors
}

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(initialFields)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle')
  const successRef = useRef<HTMLHeadingElement>(null)

  function updateField(name: FieldName, value: string) {
    setFields((current) => ({ ...current, [name]: value }))
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }))
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(fields)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus('error')
      const firstInvalid = fieldOrder.find((field) => nextErrors[field])
      if (firstInvalid) {
        document.getElementById(`contact-${firstInvalid}`)?.focus()
      }
      return
    }

    const subject = `Portfolio enquiry — ${fields.topic}`
    const body = [
      `Name: ${fields.name.trim()}`,
      `Email: ${fields.email.trim()}`,
      `About: ${fields.topic}`,
      '',
      fields.message.trim(),
    ].join('\n')

    setErrors({})
    setStatus('success')
    window.setTimeout(() => successRef.current?.focus(), 60)
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  if (status === 'success') {
    return (
      <div className="rounded border border-accent/40 bg-accent/5 p-5" role="status">
        <CheckCircle className="mb-2 text-[1.8rem] text-accent" weight="fill" aria-hidden="true" />
        <h3 className="mb-2 text-[1.5rem] focus:outline-none" ref={successRef} tabIndex={-1}>
          Your email draft is ready.
        </h3>
        <p className="max-w-[55ch] text-[0.9rem] leading-[1.65] text-ink-2">
          Your email app should open with the message filled in. Nothing was sent from this
          website. If the draft did not open, email me directly at{' '}
          <a className="text-accent hover:text-accent-strong" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <CopyEmailButton email={site.email} />
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 font-mono text-[0.7rem] font-medium uppercase leading-[1.4] tracking-[0.08em] text-ink transition-colors hover:text-accent"
            onClick={() => setStatus('idle')}
          >
            Write another message
          </button>
        </div>
      </div>
    )
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
      {status === 'error' ? (
        <div
          className="flex items-start gap-2 rounded-r border-l-2 border-danger bg-danger-wash p-3 text-danger"
          role="alert"
        >
          <WarningCircle className="mt-0.5 flex-none" weight="fill" aria-hidden="true" />
          <p className="text-[0.82rem] leading-[1.5]">
            There are a few fields to fix before the email draft can open.
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <label className={fieldLabel} htmlFor="contact-name">
          Your name
        </label>
        <input
          className={fieldControl}
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={fields.name}
          onChange={(event) => updateField('name', event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          required
        />
        {errors.name ? (
          <p className="font-mono text-[0.66rem] leading-[1.5] text-danger" id="contact-name-error">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={fieldLabel} htmlFor="contact-email">
          Email address
        </label>
        <input
          className={fieldControl}
          id="contact-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={fields.email}
          onChange={(event) => updateField('email', event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          required
        />
        {errors.email ? (
          <p className="font-mono text-[0.66rem] leading-[1.5] text-danger" id="contact-email-error">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={fieldLabel} htmlFor="contact-topic">
          What is this about?
        </label>
        <select
          className={fieldControl}
          id="contact-topic"
          name="topic"
          value={fields.topic}
          onChange={(event) => updateField('topic', event.target.value)}
          aria-invalid={Boolean(errors.topic)}
          aria-describedby={errors.topic ? 'contact-topic-error' : undefined}
          required
        >
          <option value="">Choose one</option>
          <option value="Full-time role">Full-time role</option>
          <option value="Contract project">Contract project</option>
          <option value="Collaboration">Collaboration</option>
          <option value="Something else">Something else</option>
        </select>
        {errors.topic ? (
          <p className="font-mono text-[0.66rem] leading-[1.5] text-danger" id="contact-topic-error">
            {errors.topic}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={fieldLabel} htmlFor="contact-message">
          What are you building?
        </label>
        <textarea
          className={`${fieldControl} min-h-[8.5rem] resize-y`}
          id="contact-message"
          name="message"
          rows={6}
          value={fields.message}
          onChange={(event) => updateField('message', event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? 'contact-message-hint contact-message-error' : 'contact-message-hint'
          }
          required
        />
        <p className="font-mono text-[0.6rem] leading-[1.5] text-muted" id="contact-message-hint">
          A sentence about the product, the constraint, or the role is enough.
        </p>
        {errors.message ? (
          <p className="font-mono text-[0.66rem] leading-[1.5] text-danger" id="contact-message-error">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col items-start gap-2.5 pt-1">
        <button className={`${btnPrimary} self-stretch`} type="submit">
          Open email draft
          <ArrowUpRight weight="bold" aria-hidden="true" />
        </button>
        <p className="max-w-[55ch] font-mono text-[0.6rem] leading-[1.6] text-muted">
          This form does not send anything from the site. It opens a prefilled draft in your
          email app, addressed to {site.email}.
        </p>
      </div>
    </form>
  )
}
