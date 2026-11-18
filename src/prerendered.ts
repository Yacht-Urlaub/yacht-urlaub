// Beim ersten Laden einer Seite mit statischem Snapshot (siehe
// scripts/prerender.cjs) steht der fertige Inhalt bereits im #root, bevor
// React mountet. Wer dann seine Einblend-Animation erneut von opacity 0
// startet, blendet sichtbaren Inhalt kurz aus und wieder ein (und verschiebt
// damit den Largest Contentful Paint nach hinten). Dieser Wert wird beim
// Import ausgewertet — vor dem ersten createRoot().render(), das #root leert.
export const hadPrerender: boolean =
  typeof document !== 'undefined' && !!document.getElementById('root')?.firstElementChild
