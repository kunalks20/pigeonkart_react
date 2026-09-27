import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../api/client.js'

const RATINGS = ['Excellent', 'Good', 'Okay', 'Not great']

function BackgroundWrapper({ children }) {
  // Same two-level pattern as About.jsx: an outer, full-width section owns
  // the background image (so it can stretch across the whole page instead of
  // being squeezed into the same narrow column as the content), and this
  // inner wrapper is `relative` so its content paints above the overlay
  // instead of being hidden underneath it.
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed scale-110"
        style={{ backgroundImage: "url('/images/feedback-bg.png')" }}
      />
      <div className="absolute inset-0 bg-ink/70" />
      <div className="relative max-w-xl mx-auto px-4 py-16">
        {children}
      </div>
    </section>
  )
}

export default function Feedback() {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('order')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [rating, setRating] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const composed = [
        rating && `Rating: ${rating}`,
        orderId && `Order: #${orderId}`,
        message
      ].filter(Boolean).join('\n')

      await api.submitFeedback({ name, email, message: composed })
      setSent(true)
    } catch (err) {
      setError('Could not submit your feedback — please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <BackgroundWrapper>
        <div className="text-center py-4">
          <h1 className="font-display text-3xl font-700 mb-4 text-cream drop-shadow-md">
            Thanks for the feedback!
          </h1>
          <p className="text-cream/80">It genuinely helps us get the namkin and achar right.</p>
        </div>
      </BackgroundWrapper>
    )
  }

  return (
    <BackgroundWrapper>
      <h1 className="font-display text-4xl font-700 mb-2 text-cream drop-shadow-md">Feedback</h1>
      <p className="text-cream/80 mb-6">
        {orderId
          ? `Tell us how order #${orderId} went.`
          : 'Tell us what\'s working and what isn\'t — good or bad, we read all of it.'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1 text-cream/90">Name</label>
          <input required value={name} onChange={e => setName(e.target.value)}
            className="w-full border-2 border-ink/15 rounded-md px-3 py-2 bg-cream" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-cream/90">Email</label>
          <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full border-2 border-ink/15 rounded-md px-3 py-2 bg-cream" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-cream/90">How was your experience?</label>
          <div className="flex flex-wrap gap-2">
            {RATINGS.map(r => (
              <button
                type="button"
                key={r}
                onClick={() => setRating(r)}
                className={`jar-tab px-4 py-2 text-sm ${
                  rating === r ? 'active' : 'bg-cream/90 text-ink'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-cream/90">Your feedback</label>
          <textarea required rows={4} value={message} onChange={e => setMessage(e.target.value)}
            className="w-full border-2 border-ink/15 rounded-md px-3 py-2 bg-cream" />
        </div>
        {error && <p className="text-sm text-pickle bg-cream/90 rounded px-2 py-1 inline-block">{error}</p>}
        <button
          disabled={loading}
          className="bg-pickle text-cream font-semibold px-5 py-2.5 rounded-md hover:bg-pickle/90 transition-colors disabled:opacity-60"
        >
          {loading ? 'Submitting…' : 'Submit feedback'}
        </button>
      </form>
    </BackgroundWrapper>
  )
}
