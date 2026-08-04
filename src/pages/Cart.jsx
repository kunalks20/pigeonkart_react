import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Cart() {
  const { items, updateQty, removeItem, totalAmount } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="font-display text-3xl font-700 mb-4">Your cart is empty</h1>
        <Link to="/shop" className="text-pickle font-semibold hover:underline">
          Go pick some namkin or achar
        </Link>
      </section>
    )
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-700 mb-8">Your Cart</h1>
      <div className="space-y-4">
        {items.map(({ product, qty }) => (
          <div key={product.id} className="flex items-center justify-between border-2 border-ink/10 rounded-lg p-4 bg-cream">
            <div>
              <p className="font-display text-lg">{product.name}</p>
              <p className="text-sm text-ink/60">₹{product.price} × {qty}</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                max={product.stock}
                value={qty}
                onChange={e => updateQty(product.id, Number(e.target.value))}
                className="w-16 border border-ink/20 rounded px-2 py-1 text-sm"
              />
              <button
                onClick={() => removeItem(product.id)}
                className="text-sm text-pickle hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t-2 border-ink/10 pt-6">
        <span className="font-display text-2xl">Total: ₹{totalAmount}</span>
        <button
          onClick={() => navigate('/checkout')}
          className="bg-pickle text-cream font-semibold px-6 py-3 rounded-md hover:bg-pickle/90 transition-colors"
        >
          Buy all items
        </button>
      </div>
    </section>
  )
}
