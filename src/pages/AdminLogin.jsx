import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client.js'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.adminLogin(username, password)
      navigate('/admin')
    } catch (err) {
      setError('Invalid username or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-sm mx-auto px-4 py-20">
      <h1 className="font-display text-3xl font-700 mb-6 text-center">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Username</label>
          <input
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full border-2 border-ink/15 rounded-md px-3 py-2 bg-cream"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input
            required
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border-2 border-ink/15 rounded-md px-3 py-2 bg-cream"
          />
        </div>
        {error && <p className="text-sm text-pickle">{error}</p>}
        <button
          disabled={loading}
          className="w-full bg-ink text-cream font-semibold px-6 py-3 rounded-md hover:bg-ink/90 transition-colors disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </section>
  )
}
