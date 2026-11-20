import { useEffect, useState } from 'react'
import { MoonStars, Sun } from '@phosphor-icons/react'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggleTheme() {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', next ? '#05070A' : '#F4F6F9')
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-9 w-9 items-center justify-center rounded border border-rule text-muted transition-all duration-200 hover:border-rule-strong hover:bg-ink/[0.04] hover:text-ink active:scale-95 [&_svg]:text-[1rem]"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? <Sun weight="bold" aria-hidden="true" /> : <MoonStars weight="bold" aria-hidden="true" />}
    </button>
  )
}
