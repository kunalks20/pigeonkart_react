import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink/10 bg-ink text-cream">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <p className="font-display text-xl mb-2">MARWARI MUNCHIES</p>
          <p className="text-sm text-cream/70">
            Home-style namkin and achar, made in small batches and shipped fresh.
          </p>
        </div>
        <div>
          <p className="font-semibold text-sm mb-2 text-turmeric">Company</p>
          <ul className="text-sm space-y-1 text-cream/80">
            <li><a href="/about" className="hover:text-turmeric">About Us</a></li>
            <li><a href="/contact" className="hover:text-turmeric">Contact Us</a></li>
            <li><a href="/feedback" className="hover:text-turmeric">Feedback</a></li>
            <li><a href="/shop" className="hover:text-turmeric">Shop</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-sm mb-2 text-turmeric">Reach us</p>
          <p className="text-sm text-cream/80">hello@marwarimunchies.in</p>
          <p className="text-sm text-cream/80">Pune, Maharashtra</p>
        </div>
      </div>
      <div className="text-center text-xs text-cream/50 pb-6">
        © {new Date().getFullYear()} Marwari Munchies. All rights reserved.
      </div>
    </footer>
  )
}
