import React, { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const outOfStock = product.stock <= 0

  return (
    <div className="border-2 border-ink/15 rounded-lg bg-cream p-4 flex flex-col">
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-600">{product.name}</h3>
          {outOfStock && (
            <span className="text-xs uppercase tracking-wide bg-ink/10 text-ink/60 px-2 py-1 rounded">
              Out of stock
            </span>
          )}
        </div>
        <p className="text-sm text-ink/60 mt-1">{product.description}</p>
        <p className="text-xs text-ink/50 mt-1">{product.unit}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="font-display text-xl text-pickle">₹{product.price}</span>
        {!outOfStock && (
          <div className="flex items-center gap-2">
            <select
              value={qty}
              onChange={e => setQty(Number(e.target.value))}
              className="border border-ink/20 rounded px-1 py-1 text-sm bg-cream"
            >
              {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => i + 1).map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <button
              onClick={() => addItem(product, qty)}
              className="bg-pickle text-cream text-sm font-semibold px-3 py-1.5 rounded hover:bg-pickle/90 transition-colors"
            >
              Add to cart
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
