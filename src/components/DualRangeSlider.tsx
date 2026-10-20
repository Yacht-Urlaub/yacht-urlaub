// Einfacher Zwei-Griff-Regler (min/max), ohne externe Bibliothek: zwei
// uebereinandergelegte native <input type="range">, deren Track per CSS
// unsichtbar gemacht wird (nur der Thumb bleibt klickbar) — der sichtbare
// Track/die Fuellung kommt aus eigenen divs darunter.
export default function DualRangeSlider({
  min, max, value, onChange, minLabel = 'Minimum', maxLabel = 'Maximum',
}: {
  min: number
  max: number
  value: [number, number]
  onChange: (value: [number, number]) => void
  minLabel?: string
  maxLabel?: string
}) {
  const [lo, hi] = value
  const pctLo = ((lo - min) / (max - min)) * 100
  const pctHi = ((hi - min) / (max - min)) * 100

  return (
    <div style={{ position: 'relative', height: '28px', display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, height: '4px', borderRadius: '2px', background: 'var(--gray-mid)' }} />
      <div style={{ position: 'absolute', left: `${pctLo}%`, right: `${100 - pctHi}%`, height: '4px', borderRadius: '2px', background: 'var(--blue)' }} />
      <input
        className="dual-range-input"
        type="range" min={min} max={max} step={1} value={lo}
        onChange={e => onChange([Math.min(Number(e.target.value), hi), hi])}
        style={{ zIndex: 1 }}
        aria-label={minLabel}
      />
      <input
        className="dual-range-input"
        type="range" min={min} max={max} step={1} value={hi}
        onChange={e => onChange([lo, Math.max(Number(e.target.value), lo)])}
        style={{ zIndex: 2 }}
        aria-label={maxLabel}
      />
      <style>{`
        .dual-range-input {
          position: absolute;
          left: 0;
          width: 100%;
          margin: 0;
          background: transparent;
          pointer-events: none;
          -webkit-appearance: none;
          appearance: none;
        }
        .dual-range-input::-webkit-slider-runnable-track { background: transparent; }
        .dual-range-input::-moz-range-track { background: transparent; }
        .dual-range-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          pointer-events: auto;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--blue);
          border: 2px solid #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.3);
          cursor: pointer;
        }
        .dual-range-input::-moz-range-thumb {
          pointer-events: auto;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--blue);
          border: 2px solid #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.3);
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}
