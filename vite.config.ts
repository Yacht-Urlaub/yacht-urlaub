import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Das gesamte Stylesheet ist nur ~5 KB (die Seiten stylen ueberwiegend inline) —
// als <style> ins HTML gelegt entfaellt ein renderblockierender Request
// (Lighthouse: "Render blocking requests", rund 450 ms bis zum ersten Paint
// auf Mobilgeraeten). Die CSS-Datei selbst bleibt im Build liegen, wird aber
// nicht mehr verlinkt.
function inlineCss(): Plugin {
  return {
    name: 'inline-css',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const bundle = ctx.bundle
        if (!bundle) return html
        return html.replace(/<link rel="stylesheet"[^>]*href="\/(assets\/[^"]+\.css)"[^>]*>/g, (match, file: string) => {
          const asset = bundle[file]
          if (!asset || asset.type !== 'asset') return match
          return `<style>${String(asset.source)}</style>`
        })
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), inlineCss()],
})
