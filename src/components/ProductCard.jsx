import React, { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { PRODUCT_ICONS } from '../data/productIcons.js'

export default function ProductCard({ product }) {
  const { addItem, maxQtyPerItem } = useCart()
  const outOfStock = product.stock <= 0
  const maxQty = Math.min(product.stock, maxQtyPerItem)
  const [qty, setQty] = useState(1)
  const Icon = PRODUCT_ICONS[product.id]

  function dec() {
    setQty(q => Math.max(1, q - 1))
  }
  function inc() {
    setQty(q => Math.min(maxQty, q + 1))
  }

  return (
    <div className="border-2 border-ink/15 rounded-lg bg-cream p-4 flex flex-col">
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="w-12 h-12 rounded-full bg-turmeric/15 border border-brass/40 flex items-center justify-center shrink-0">
                <Icon className="w-7 h-7" />
              </div>
            )}
            <h3 className="font-display text-lg font-600">{product.name}</h3>
          </div>
          {outOfStock && (
            <span className="text-xs uppercase tracking-wide bg-ink/10 text-ink/60 px-2 py-1 rounded shrink-0">
              Out of stock
            </span>
          )}
        </div>
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
  )
}
