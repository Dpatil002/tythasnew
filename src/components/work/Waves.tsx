/** Flowing line field behind the case study heroes (like the reference). Pure SVG + CSS. */
export default function Waves({ accent = "#1457CB", className = "" }: { accent?: string; className?: string }) {
  const id = `wv-${accent.replace("#", "")}`;
  const lines = Array.from({ length: 26 }, (_, i) => {
    const t = i / 25;
    const y0 = 300 + t * 260;
    const y1 = 40 + t * 260 + Math.sin(i * 0.7) * 14;
    const y2 = 560 - t * 200;
    const y3 = 60 + t * 300;
    return `M -40 ${y0.toFixed(1)} C 320 ${y1.toFixed(1)}, 760 ${y2.toFixed(1)}, 1240 ${y3.toFixed(1)}`;
  });
  return (
    <svg aria-hidden viewBox="0 0 1200 600" preserveAspectRatio="none" className={`waves pointer-events-none ${className}`}>
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={accent} stopOpacity="0" />
          <stop offset="0.35" stopColor={accent} stopOpacity="0.9" />
          <stop offset="0.65" stopColor="#B65CFF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#8FB3F5" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${id})`} strokeWidth="1.1">
        {lines.map((d, i) => <path key={i} d={d} opacity={0.25 + (i % 5) * 0.12} />)}
      </g>
    </svg>
  );
}
