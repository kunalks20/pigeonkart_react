import React, { useState } from 'react'
import { api } from '../api/client.js'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.submitFeedback({ name, email, message })
      setSent(true)
    } catch (err) {
      setError('Could not send your message — please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-xl mx-auto px-4 py-16">
      <h1 className="font-display text-4xl font-700 mb-6">Contact Us</h1>
      {sent ? (
        <p className="text-ink/70">Thanks — we'll get back to you shortly.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input required value={name} onChange={e => setName(e.target.value)}
              className="w-full border-2 border-ink/15 rounded-md px-3 py-2 bg-cream" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full border-2 border-ink/15 rounded-md px-3 py-2 bg-cream" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Message</label>
            <textarea required rows={4} value={message} onChange={e => setMessage(e.target.value)}
              className="w-full border-2 border-ink/15 rounded-md px-3 py-2 bg-cream" />
          </div>
          {error && <p className="text-sm text-pickle">{error}</p>}
          <button
            disabled={loading}
            className="bg-pickle text-cream font-semibold px-5 py-2.5 rounded-md hover:bg-pickle/90 transition-colors disabled:opacity-60"
          >
            {loading ? 'Sending…' : 'Send message'}
          </button>
        </form>
      )}
    </section>
  )
}
