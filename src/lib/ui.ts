/**
 * Shared Tailwind recipes for the few controls that repeat across routes.
 * Keeping them here (rather than in CSS) means every style is still a utility
 * class that Tailwind can see and prune.
 */

// The base deliberately omits background, text colour and border colour: two
// utilities for the same property are resolved by their order in the generated
// stylesheet, not by the order they appear in a class string, so overrides
// have to live in the variant recipes below.
const btnBase =
  'btn group inline-flex min-h-11 items-center justify-center gap-2 border px-5 py-3 text-center font-mono text-[0.7rem] font-medium uppercase leading-tight tracking-[0.09em] no-underline transition-[transform,box-shadow,background-color,color,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] [&_svg]:shrink-0'

export const btnPrimary = `${btnBase} border-transparent bg-fill text-on-fill hover:scale-[1.02] hover:bg-fill-hover hover:shadow-[0_0_22px_var(--glow-strong)]`

export const btnGhost = `${btnBase} border-rule bg-transparent text-ink-2 hover:border-accent/50 hover:bg-accent/5 hover:text-ink`

export const textLink =
  'group inline-flex items-center gap-1.5 border-b border-rule-strong pb-0.5 font-mono text-[0.7rem] font-medium uppercase leading-[1.4] tracking-[0.08em] text-ink no-underline transition-colors duration-200 hover:border-accent hover:text-accent-strong [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-200 [&:hover_svg]:translate-x-1 [&:hover_svg]:-translate-y-1'

export const fieldLabel =
  'font-mono text-[0.64rem] font-medium uppercase tracking-[0.09em] text-muted'

export const fieldControl =
  'w-full min-h-11 border border-rule bg-surface px-3 py-2.5 font-sans text-[0.95rem] leading-[1.5] text-ink outline-none transition-colors placeholder:text-muted hover:border-rule-strong focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus aria-[invalid=true]:border-danger aria-[invalid=true]:bg-danger-wash'
