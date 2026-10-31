/**
 * Radar de radio operativo: anillos a 30, 60, 90 y 150 m y una pluma en giro.
 * Las etiquetas salen del registro de flota: 90 m es la pluma máxima de XCA750SA, XCA600 y
 * XCA500BR; 150 m, la XCA500SA con torre y plumines. Animación sin JS, apagada con
 * prefers-reduced-motion por la regla global.
 */
export function RadarPluma({ className }: { className?: string }) {
  const ticks = Array.from({ length: 36 }, (_, i) => {
    const a = (i * 10 * Math.PI) / 180;
    const r1 = 360;
    const r2 = i % 3 === 0 ? 346 : 353;
    return <line key={i} x1={400 + r1 * Math.sin(a)} y1={400 - r1 * Math.cos(a)} x2={400 + r2 * Math.sin(a)} y2={400 - r2 * Math.cos(a)} stroke="rgba(255,255,255,.34)" />;
  });
  return (
    <svg viewBox="0 0 800 800" className={className} role="img" aria-label="Diagrama de radio operativo con anillos de 30, 60, 90 y 150 metros y una pluma en giro">
      <circle cx="400" cy="400" r="72" fill="none" stroke="rgba(255,255,255,.2)" />
      <circle cx="400" cy="400" r="144" fill="none" stroke="rgba(255,255,255,.2)" />
      <circle cx="400" cy="400" r="216" fill="none" stroke="rgba(255,255,255,.2)" />
      <circle cx="400" cy="400" r="360" fill="none" stroke="rgba(255,255,255,.28)" strokeDasharray="3 7" />
      <line x1="400" y1="20" x2="400" y2="780" stroke="rgba(255,255,255,.14)" />
      <line x1="20" y1="400" x2="780" y2="400" stroke="rgba(255,255,255,.14)" />
      <g>{ticks}</g>
      <g className="r-sweep">
        <path d="M400 400 L276.1 223.1 A216 216 0 0 1 400 184 Z" fill="rgba(223,8,33,.12)" />
        <path d="M400 400 L362.5 187.3 A216 216 0 0 1 400 184 Z" fill="rgba(223,8,33,.16)" />
        <line x1="400" y1="400" x2="400" y2="184" stroke="#df0821" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="400" cy="184" r="6" fill="#df0821" />
      </g>
      <circle className="r-pulse" cx="400" cy="400" r="6" fill="none" stroke="#df0821" strokeWidth="1.5" />
      <circle cx="400" cy="400" r="5" fill="#fff" />
      <g fill="rgba(255,255,255,.62)" fontFamily="var(--font-tm-mono), monospace" fontSize="11" letterSpacing=".08em">
        <text x="408" y="324">30 m</text>
        <text x="408" y="252">60 m</text>
        <text x="408" y="180">90 m</text>
        <text x="408" y="36">150 m</text>
        <circle cx="552.7" cy="247.3" r="3.5" fill="#ff5a6b" />
        <text x="566" y="244" fill="#ff5a6b">90 M · PLUMA MÁX.</text>
        <text x="566" y="259">XCA750SA · XCA600 · XCA500BR</text>
        <circle cx="675.8" cy="168.6" r="3.5" fill="#ff5a6b" />
        <text x="790" y="128" textAnchor="end" fill="#ff5a6b">150 M · XCA500SA</text>
        <text x="790" y="143" textAnchor="end">CON TORRE Y PLUMINES</text>
      </g>
    </svg>
  );
}
