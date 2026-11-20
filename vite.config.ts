import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * The Fraunces italic face is discovered late: the browser only requests it
 * once the hero's <em> renders, after React has mounted. Without a preload it
 * swaps in after first paint and reflows the hero heading on narrow screens
 * (measured CLS 0.134 on a throttled phone). The normal face is discovered
 * early through CSS and does not need the extra request. Preload the italic
 * from the built asset manifest so the filename hash stays automatic.
 */
function preloadDisplayFonts(): Plugin {
  return {
    name: 'preload-display-fonts',
    apply: 'build',
    transformIndexHtml(html, context) {
      const fontFiles = Object.keys(context.bundle ?? {}).filter((file) =>
        /fraunces-latin-full-italic-.*\.woff2$/.test(file),
      )

      return {
        html,
        tags: fontFiles.map((file) => ({
          tag: 'link',
          attrs: {
            rel: 'preload',
            as: 'font',
            type: 'font/woff2',
            href: `/${file}`,
            crossorigin: 'anonymous',
          },
          injectTo: 'head-prepend' as const,
        })),
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), preloadDisplayFonts()],
})
