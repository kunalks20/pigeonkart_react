import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const linkClass = ({ isActive }) =>
  `px-3 py-1 font-body text-sm tracking-wide transition-colors ${
    isActive ? 'text-pickle font-semibold' : 'text-ink/80 hover:text-pickle'
  }`

export default function Navbar() {
  const { totalItems } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="border-b-2 border-ink/10 bg-cream/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-3">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="font-display text-sm sm:text-xl lg:text-2xl font-700 text-pickle">🌶️ MARWARI MUNCHIES</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink to="/" end className={linkClass}>Home</NavLink>
            <NavLink to="/shop" className={linkClass}>Shop</NavLink>
            <NavLink to="/about" className={linkClass}>About Us</NavLink>
            <NavLink to="/contact" className={linkClass}>Contact Us</NavLink>
            <NavLink to="/feedback" className={linkClass}>Feedback</NavLink>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/cart"
              className="relative inline-flex items-center gap-2 border-2 border-ink rounded-md px-3 py-1.5 text-sm font-semibold hover:bg-ink hover:text-cream transition-colors"
            >
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-pickle text-cream text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              type="button"
              className={`lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border-2 border-ink transition-colors ${
                menuOpen ? 'bg-ink text-cream' : 'text-ink hover:bg-ink hover:text-cream'
              }`}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(true)}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      {menuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-ink/40 lg:hidden"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
          />
          <aside id="mobile-navigation" className="fixed inset-y-0 right-0 z-50 w-64 max-w-[85vw] border-l-2 border-ink/10 bg-cream p-4 shadow-xl lg:hidden">
            <div className="mb-6 flex items-center justify-between border-b border-ink/10 pb-4">
              <span className="font-display text-lg font-700 text-pickle">Navigation</span>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border-2 border-ink text-ink hover:bg-ink hover:text-cream transition-colors"
                aria-label="Close navigation menu"
                onClick={() => setMenuOpen(false)}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
              <NavLink to="/" end className={linkClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
              <NavLink to="/shop" className={linkClass} onClick={() => setMenuOpen(false)}>Shop</NavLink>
              <NavLink to="/about" className={linkClass} onClick={() => setMenuOpen(false)}>About Us</NavLink>
              <NavLink to="/contact" className={linkClass} onClick={() => setMenuOpen(false)}>Contact Us</NavLink>
              <NavLink to="/feedback" className={linkClass} onClick={() => setMenuOpen(false)}>Feedback</NavLink>
            </nav>
          </aside>
        </>
      )}
    </>
  )
}
