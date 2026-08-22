import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const linkClass = ({ isActive }) =>
  `px-3 py-1 font-body text-sm tracking-wide transition-colors ${
    isActive ? 'text-pickle font-semibold' : 'text-ink/80 hover:text-pickle'
  }`

export default function Navbar() {
  const { totalItems } = useCart()

  return (
    <header className="border-b-2 border-ink/10 bg-cream/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-700 text-pickle">🌶️ MARWARI MUNCHIES</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/shop" className={linkClass}>Shop</NavLink>
          <NavLink to="/about" className={linkClass}>About Us</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact Us</NavLink>
          <NavLink to="/feedback" className={linkClass}>Feedback</NavLink>
        </nav>
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
      </div>
    </header>
  )
}
