import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { couponEligibilityMessage } from '../utils/coupon.js'

function CouponBox() {
  const { coupon, couponError, applyCoupon, removeCoupon, pricing } = useCart()
  const [code, setCode] = useState('')
  const [applying, setApplying] = useState(false)
  const hasEligibleItems = pricing.lines.some(line => line.applies)

  async function handleApply(e) {
    e.preventDefault()
    setApplying(true)
    try {
      await applyCoupon(code)
      setCode('')
    } catch {
      // couponError is already set inside applyCoupon
    } finally {
      setApplying(false)
    }
  }

  if (coupon && hasEligibleItems) {
    return (
      <div className="flex items-center justify-between border-2 border-pickle/30 bg-pickle/5 rounded-lg px-4 py-3 mb-6">
        <div>
          <p className="text-sm font-semibold text-pickle">Coupon "{coupon.code}" applied</p>
          {coupon.description && <p className="text-xs text-ink/60">{coupon.description}</p>}
        </div>
        <button onClick={removeCoupon} className="text-xs text-ink/60 hover:underline shrink-0">
          Remove
        </button>
      </div>
    )
  }

  if (coupon) {
    return (
      <div className="flex items-center justify-between border-2 border-red-700/20 bg-red-700/5 rounded-lg px-4 py-3 mb-6">
        <p className="text-sm text-red-800">{couponEligibilityMessage(coupon)}</p>
        <button onClick={removeCoupon} className="text-xs text-ink/60 hover:underline shrink-0 ml-4">
          Remove
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleApply} className="flex items-start gap-2 mb-6">
      <div className="flex-1">
        <input
          value={code}
          onChange={e => setCode(e.target.value.toUpperCase())}
          placeholder="Have a coupon code?"
          className="w-full border-2 border-ink/15 rounded-md px-3 py-2 bg-cream text-sm"
        />
        {couponError && <p className="text-xs text-red-700 mt-1">{couponError}</p>}
      </div>
      <button
        disabled={applying || !code}
        className="bg-ink text-cream text-sm font-semibold px-4 py-2 rounded-md hover:bg-ink/90 disabled:opacity-60"
      >
        {applying ? 'Applying…' : 'Apply'}
      </button>
    </form>
  )
}

export default function Cart() {
  const { items, updateQty, removeItem, maxQtyPerItem, pricing } = useCart()
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
      <h1 className="font-display text-3xl font-700 mb-6">Your Cart</h1>

      <CouponBox />

      <div className="space-y-4">
        {pricing.lines.map(({ product, qty, unitPrice, discountedUnitPrice, applies, discountedLineTotal }) => {
          const maxQty = Math.min(product.stock, maxQtyPerItem)
          return (
            <div key={product.id} className="flex items-center justify-between border-2 border-ink/10 rounded-lg p-4 bg-cream">
              <div>
                <p className="font-display text-lg">{product.name}</p>
                <div className="text-sm text-ink/60 flex items-center gap-2">
                  {applies ? (
                    <>
                      <span className="line-through text-ink/40">₹{unitPrice}</span>
                      <span className="text-pickle font-semibold">₹{discountedUnitPrice}</span>
                    </>
                  ) : (
                    <span>₹{unitPrice}</span>
                  )}
                  <span>× {qty}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-ink/20 rounded overflow-hidden">
                  <button
                    type="button"
                    onClick={() => updateQty(product.id, qty - 1)}
                    aria-label="Decrease quantity"
                    className="w-7 h-7 flex items-center justify-center text-ink hover:bg-ink/10"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm select-none">{qty}</span>
                  <button
                    type="button"
                    onClick={() => updateQty(product.id, qty + 1)}
                    disabled={qty >= maxQty}
                    aria-label="Increase quantity"
                    className="w-7 h-7 flex items-center justify-center text-ink hover:bg-ink/10 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
                <div className="text-right w-16">
                  <p className="font-semibold">₹{discountedLineTotal}</p>
                </div>
                <button
                  onClick={() => removeItem(product.id)}
                  className="text-sm text-pickle hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 border-t-2 border-ink/10 pt-6 space-y-1">
        <div className="flex items-center justify-between text-sm text-ink/60">
          <span>Subtotal</span>
          <span>₹{pricing.subtotal}</span>
        </div>
        {pricing.discount > 0 && (
          <div className="flex items-center justify-between text-sm text-pickle font-semibold">
            <span>Discount</span>
            <span>−₹{pricing.discount}</span>
          </div>
        )}
        <div className="flex items-center justify-between pt-2">
          <span className="font-display text-2xl">Total: ₹{pricing.total}</span>
          <button
            onClick={() => navigate('/checkout')}
            className="bg-pickle text-cream font-semibold px-6 py-3 rounded-md hover:bg-pickle/90 transition-colors"
          >
            Buy all items
          </button>
        </div>
      </div>
    </section>
  )
}
