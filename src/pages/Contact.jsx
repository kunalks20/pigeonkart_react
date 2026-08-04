import React, { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // Wire this up to POST /api/contact on the backend once that endpoint exists.
    setSent(true)
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
            <input required className="w-full border-2 border-ink/15 rounded-md px-3 py-2 bg-cream" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input required type="email" className="w-full border-2 border-ink/15 rounded-md px-3 py-2 bg-cream" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Message</label>
            <textarea required rows={4} className="w-full border-2 border-ink/15 rounded-md px-3 py-2 bg-cream" />
          </div>
          <button className="bg-pickle text-cream font-semibold px-5 py-2.5 rounded-md hover:bg-pickle/90 transition-colors">
            Send message
          </button>
        </form>
      )}
    </section>
  )
}
