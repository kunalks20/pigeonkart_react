import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function OrderSuccess() {
  const { state } = useLocation()
  const orderId = state?.orderId

  return (
    <section className="max-w-xl mx-auto px-4 py-20 text-center">
      <h1 className="font-display text-4xl font-700 mb-4 text-pickle">Order placed successfully!</h1>
      <p className="text-ink/70 mb-2">
        {orderId ? `Order #${orderId} is confirmed.` : 'Your order is confirmed.'}
      </p>
      <p className="text-ink/60 mb-8">You'll soon receive your shipment details on the phone number you provided.</p>
      <div className="flex items-center justify-center gap-6">
        <Link to="/shop" className="text-pickle font-semibold hover:underline">
          Continue shopping
        </Link>
        {orderId && (
          <Link to={`/feedback?order=${orderId}`} className="text-ink/60 font-semibold hover:underline">
            Leave feedback
          </Link>
        )}
      </div>
    </section>
  )
}
