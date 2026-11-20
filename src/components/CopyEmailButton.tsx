import { useState } from 'react'
import { Check, Copy } from '@phosphor-icons/react'

export function CopyEmailButton({ email, className = '' }: { email: string; className?: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const copied = state === 'copied'
  const failed = state === 'failed'

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setState('copied')
      window.setTimeout(() => setState('idle'), 2200)
    } catch {
      setState('failed')
      window.setTimeout(() => setState('idle'), 3200)
    }
  }

  return (
    <span className={`relative inline-flex ${className}`.trim()}>
      <button
        type="button"
        className="inline-flex cursor-pointer items-center gap-1.5 rounded border border-rule bg-transparent px-2.5 py-1 font-mono text-[0.62rem] uppercase leading-[1.5] tracking-[0.08em] text-muted transition-all duration-200 hover:border-accent/50 hover:bg-accent/10 hover:text-ink"
        onClick={copy}
        aria-label={copied ? 'Email address copied' : 'Copy email address'}
      >
        {copied ? (
          <Check weight="bold" aria-hidden="true" />
        ) : (
          <Copy weight="bold" aria-hidden="true" />
        )}
        <span>{copied ? 'Copied' : failed ? 'Failed' : 'Copy'}</span>
      </button>
      <span
        aria-live="polite"
        className={`pointer-events-none absolute left-0 top-full z-20 mt-2 whitespace-nowrap rounded bg-accent px-2.5 py-1 font-mono text-[0.66rem] font-bold text-on-accent shadow-lg transition-all duration-200 ${
          copied || failed ? 'translate-x-0 opacity-100' : 'translate-x-1 opacity-0'
        }`}
      >
        {copied
          ? 'Copied to clipboard! ✓'
          : failed
            ? 'Copy failed — select the email'
            : ''}
      </span>
    </span>
  )
}
