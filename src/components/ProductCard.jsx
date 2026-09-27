import React, { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ product }) {
  const { addItem, maxQtyPerItem } = useCart()
  const outOfStock = product.stock <= 0
  const maxQty = Math.min(product.stock, maxQtyPerItem)
  const [qty, setQty] = useState(1)
  const [imageFailed, setImageFailed] = useState(false)

  function dec() {
    setQty(q => Math.max(1, q - 1))
  }
  function inc() {
    setQty(q => Math.min(maxQty, q + 1))
  }

  return (
    <div className="border-2 border-ink/15 rounded-lg bg-cream overflow-hidden flex flex-col">
      {/* Product photo. Falls back to a labeled placeholder until a real image
          is set at product.image (see frontend/public/images/products/). */}
      <div className="relative w-full h-40 bg-turmeric/10">
        {product.image && !imageFailed ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageFailed(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brass/60 text-xs uppercase tracking-wide border-b-2 border-dashed border-brass/30">
            Add photo: {product.id}
          </div>
        )}
        {outOfStock && (
          <span className="absolute top-2 right-2 text-xs uppercase tracking-wide bg-ink/80 text-cream px-2 py-1 rounded">
            Out of stock
          </span>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="font-display text-lg font-600">{product.name}</h3>
          <p className="text-sm text-ink/60 mt-2">{product.description}</p>
          <p className="text-xs text-ink/50 mt-1">{product.unit}</p>
          {!outOfStock && product.stock <= maxQtyPerItem && (
            <p className="text-xs text-brass mt-1">Only {product.stock} left</p>
          )}
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="font-display text-xl text-pickle">₹{product.price}</span>
          {!outOfStock && (
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-ink/20 rounded overflow-hidden">
                <button
                  type="button"
                  onClick={dec}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                  className="w-7 h-7 flex items-center justify-center text-ink hover:bg-ink/10 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm select-none">{qty}</span>
                <button
                  type="button"
                  onClick={inc}
                  disabled={qty >= maxQty}
                  aria-label="Increase quantity"
                  className="w-7 h-7 flex items-center justify-center text-ink hover:bg-ink/10 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => { addItem(product, qty); setQty(1) }}
                className="bg-pickle text-cream text-sm font-semibold px-3 py-1.5 rounded hover:bg-pickle/90 transition-colors"
              >
                Add to cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
