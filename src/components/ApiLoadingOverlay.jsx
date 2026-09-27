import React, { useEffect, useState } from 'react'
import { subscribeToApiLoading } from '../api/client.js'

export default function ApiLoadingOverlay() {
  const [loading, setLoading] = useState(false)

  useEffect(() => subscribeToApiLoading(setLoading), [])

  if (!loading) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/35 backdrop-blur-[2px]"
      role="status"
      aria-live="polite"
      aria-label="Waiting for the server"
    >
      <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-ink/10 bg-cream/95 px-8 py-6 shadow-xl">
        <div
          aria-hidden="true"
          className="h-12 w-12 animate-spin rounded-full border-4 border-turmeric border-r-pickle border-b-ink/15 border-l-ink/15"
        />
        <span className="font-display text-lg text-ink">Getting things ready…</span>
      </div>
    </div>
  )
}