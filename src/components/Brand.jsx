// Lumina logo — gradient flame inside a ring
export default function Brand({ size = 40, withRing = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="lm-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--accent-3)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="none" stroke="url(#lm-g)" strokeWidth={withRing ? 3.5 : 0} opacity="0.95" />
      <path
        d="M32 13c6.5 8.5 11 13 11 20.5a11 11 0 1 1-22 0c0-4.5 2.2-8 4.5-11.2 1.1 3.2 2.2 4.5 4.5 5.6 0-5.4 0-10 2-14.9z"
        fill="url(#lm-g)"
      />
    </svg>
  )
}
