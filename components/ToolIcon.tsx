import React from 'react'

const icons: Record<string, React.ReactNode> = {
  megaphone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8a3 3 0 0 1 0 6" />
      <path d="M10 8H5a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h1" />
      <path d="M10 8l8-4v14l-8-4" />
      <path d="M6 12v4a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-4" />
    </svg>
  ),
  microphone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="17" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  ),
  gauge: (
    <svg viewBox="0 0 48 48" role="img" aria-label="Mission Control">
      <circle cx="24" cy="24" r="24" fill="#0075C9" />
      <g stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round">
        <line x1="12.5" y1="16" x2="25.5" y2="16" />
        <line x1="12.5" y1="24" x2="28.5" y2="24" />
        <line x1="12.5" y1="32" x2="32.5" y2="32" />
      </g>
    </svg>
  ),
  film: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
      <line x1="7" y1="2" x2="7" y2="22" />
      <line x1="17" y1="2" x2="17" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="2" y1="7" x2="7" y2="7" />
      <line x1="2" y1="17" x2="7" y2="17" />
      <line x1="17" y1="7" x2="22" y2="7" />
      <line x1="17" y1="17" x2="22" y2="17" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
}

export function ToolIcon({ name, className }: { name: string; className?: string }) {
  return (
    <div className={className}>
      {icons[name] ?? null}
    </div>
  )
}
