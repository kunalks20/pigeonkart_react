import React from 'react'

// Small hand-drawn-style SVG icons for the ingredients behind each product —
// avoids hotlinking external photos (reliability + copyright), stays on-brand
// with the jar-label aesthetic, and is instant to load.

export function MangoIcon(props) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      <path d="M14 30c-4-8 2-20 14-20 8 0 12 6 12 13 0 12-10 20-16 20-6 0-8-6-10-13z" fill="#D9A441" stroke="#8C2F39" strokeWidth="1.5" />
      <path d="M26 10c2-3 5-4 8-3" fill="none" stroke="#3A4F3F" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function GarlicIcon(props) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      <path d="M24 14c8 0 12 8 10 16-1 6-6 10-10 10s-9-4-10-10c-2-8 2-16 10-16z" fill="#FFFBF2" stroke="#B9863A" strokeWidth="1.5" />
      <path d="M24 14V8m-5 6-3-5m13 5 3-5" stroke="#B9863A" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 18v18M18 22v12M30 22v12" stroke="#B9863A" strokeWidth="1" opacity="0.6" />
    </svg>
  )
}

export function LemonIcon(props) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      <ellipse cx="24" cy="24" rx="15" ry="12" fill="#D9A441" stroke="#3A4F3F" strokeWidth="1.5" />
      <path d="M9 24c0-1 1-2 3-2m30 2c0-1-1-2-3-2" stroke="#3A4F3F" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function ChilliIcon(props) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      <path d="M16 12c2-2 5-2 6 0 4 6-2 22-10 26-4 2-8-1-7-5 2-9 6-16 11-21z" fill="#8C2F39" stroke="#3A4F3F" strokeWidth="1.5" />
      <path d="M16 12c-1-3 0-6 3-7" fill="none" stroke="#3A4F3F" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function VeggieIcon(props) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      <path d="M20 16c1-4 3-6 5-6s3 3 2 6l-3 10h-2z" fill="#D9A441" stroke="#3A4F3F" strokeWidth="1.5" />
      <circle cx="16" cy="30" r="6" fill="#8C2F39" stroke="#3A4F3F" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="6" fill="#3A4F3F" stroke="#2C3B2E" strokeWidth="1.5" />
    </svg>
  )
}

export function SevIcon(props) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      <path d="M10 20c6-4 8 4 14 0s8 4 14 0" fill="none" stroke="#D9A441" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 26c6-4 8 4 14 0s8 4 14 0" fill="none" stroke="#B9863A" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 32c6-4 8 4 14 0s8 4 14 0" fill="none" stroke="#D9A441" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function DalIcon(props) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      {[...Array(12)].map((_, i) => (
        <ellipse
          key={i}
          cx={12 + (i % 4) * 8}
          cy={16 + Math.floor(i / 4) * 8}
          rx="3" ry="2.2"
          fill="#D9A441"
          stroke="#8C2F39"
          strokeWidth="0.5"
        />
      ))}
    </svg>
  )
}

export function ChivdaIcon(props) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      {[...Array(10)].map((_, i) => (
        <rect
          key={i}
          x={8 + (i % 5) * 7}
          y={14 + Math.floor(i / 5) * 10}
          width="5" height="2.5"
          rx="1"
          fill={i % 2 === 0 ? '#D9A441' : '#3A4F3F'}
          transform={`rotate(${i * 15} ${8 + (i % 5) * 7} ${14 + Math.floor(i / 5) * 10})`}
        />
      ))}
    </svg>
  )
}

export function PeanutIcon(props) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      <path d="M20 12c4-2 8 0 8 4 0 2-1 3-1 5 2 1 3 3 3 6 0 5-4 9-9 9s-9-4-9-9c0-3 1-5 3-6 0-2-1-3-1-5 0-4 2-6 6-4z" fill="#B9863A" stroke="#3A4F3F" strokeWidth="1.5" />
    </svg>
  )
}

export function KachoriIcon(props) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      <circle cx="24" cy="26" r="14" fill="#D9A441" stroke="#8C2F39" strokeWidth="1.5" />
      <path d="M14 22c3-6 17-6 20 0" fill="none" stroke="#8C2F39" strokeWidth="1.2" opacity="0.6" />
      <circle cx="19" cy="24" r="1.4" fill="#8C2F39" opacity="0.5" />
      <circle cx="27" cy="22" r="1.4" fill="#8C2F39" opacity="0.5" />
      <circle cx="24" cy="30" r="1.4" fill="#8C2F39" opacity="0.5" />
      <circle cx="30" cy="28" r="1.4" fill="#8C2F39" opacity="0.5" />
    </svg>
  )
}

export function SnackMixIcon(props) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      <rect x="10" y="14" width="28" height="22" rx="3" fill="#FFFBF2" stroke="#B9863A" strokeWidth="1.5" />
      <path d="M10 20h28M10 26h28M10 32h28" stroke="#B9863A" strokeWidth="1" opacity="0.4" />
      <circle cx="16" cy="17" r="2" fill="#8C2F39" />
      <circle cx="24" cy="17" r="2" fill="#D9A441" />
      <circle cx="32" cy="17" r="2" fill="#3A4F3F" />
    </svg>
  )
}
