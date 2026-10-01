import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { api } from '../api/client.js'

function loadRazorpayScript() {
  return new Promise(resolve => {
    if (window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function Checkout() {
  const { items, pricing, coupon, clearCart } = useCart()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handlePay(e) {
    e.preventDefault()
    setError('')

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError('Enter a valid 10-digit Indian mobile number.')
      return
    }

    setLoading(true)
    try {
      // 1. Create the order on the backend (reserves stock, computes total
      //    server-side — including re-validating the coupon and recomputing
      //    the discount from scratch, never trusting the discount shown here).
      const order = await api.createOrder({
        customer: { name, phone, address },
        items: items.map(i => ({ productId: i.product.id, qty: i.qty })),
        couponCode: coupon?.code || null
      })

      // 2. Ask the backend to open a Razorpay order for that order id.
      const payment = await api.createPaymentOrder(order.id)

      // Backend mock mode (razorpay.mock-mode: true in application.yml) returns a
      // fake order id prefixed "order_mock_" instead of a real Razorpay order.
      if (payment.razorpayOrderId.startsWith('order_mock_')) {
        await api.verifyPayment({
          orderId: order.id,
          razorpay_payment_id: 'pay_mock_' + Date.now(),
          razorpay_order_id: payment.razorpayOrderId,
          razorpay_signature: 'mock_signature'
        })
        clearCart()
        navigate('/order-success', { state: { orderId: order.id } })
        return
      }

      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) throw new Error('Could not load Razorpay checkout script')

      const rzp = new window.Razorpay({
        key: payment.keyId,
        amount: payment.amount,
        currency: payment.currency || 'INR',
        name: 'Marwari Munchies',
        description: `Order #${order.id}`,
        order_id: payment.razorpayOrderId,
        method: { upi: true, card: false, netbanking: false, wallet: false },
        prefill: { name, contact: phone },
        theme: { color: '#8C2F39' },
        handler: async function (response) {
          try {
            await api.verifyPayment({
              orderId: order.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            })
            clearCart()
            navigate('/order-success', { state: { orderId: order.id } })
          } catch (err) {
            setError(err.message || 'Payment verification failed. Please contact support before retrying.')
            setLoading(false)
          }
        },
        modal: {
          ondismiss: () => {
            setError('Payment was cancelled. You can try again.')
            setLoading(false)
          }
        }
      })
      rzp.on('payment.failed', response => {
        setError(response.error?.description || 'Payment failed. Please try again.')
        setLoading(false)
      })
      rzp.open()
    } catch (err) {
      setError(err.message || 'Something went wrong starting payment.')
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <section className="max-w-xl mx-auto px-4 py-16 text-center">
        <p className="text-ink/70">Your cart is empty — add items before checking out.</p>
      </section>
    )
  }

  return (
    <section className="max-w-xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-700 mb-6">Checkout</h1>

      <div className="border-2 border-ink/10 rounded-lg p-4 bg-cream mb-6">
        {pricing.lines.map(({ product, qty, lineTotal }) => (
          <div key={product.id} className="flex justify-between text-sm py-1">
            <span>{product.name} × {qty}</span>
            <span>₹{lineTotal}</span>
          </div>
        ))}
        {pricing.discount > 0 && (
          <div className="flex justify-between text-sm py-1 text-pickle">
            <span>Discount {coupon ? `(${coupon.code})` : ''}</span>
            <span>−₹{pricing.discount}</span>
          </div>
        )}
        <div className="flex justify-between font-semibold pt-2 mt-2 border-t border-ink/10">
          <span>Total</span>
          <span>₹{pricing.total}</span>
        </div>
      </div>

      <form onSubmit={handlePay} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Full name</label>
          <input required value={name} onChange={e => setName(e.target.value)}
            className="w-full border-2 border-ink/15 rounded-md px-3 py-2 bg-cream" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Phone</label>
          <input
            required
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit mobile number"
            value={phone}
            onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            className="w-full border-2 border-ink/15 rounded-md px-3 py-2 bg-cream"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Delivery address</label>
          <textarea required rows={3} value={address} onChange={e => setAddress(e.target.value)}
            className="w-full border-2 border-ink/15 rounded-md px-3 py-2 bg-cream" />
        </div>

        {error && <p className="text-sm text-pickle">{error}</p>}

        <button
          disabled={loading}
          className="w-full bg-pickle text-cream font-semibold px-6 py-3 rounded-md hover:bg-pickle/90 transition-colors disabled:opacity-60"
        >
          {loading ? 'Opening UPI payment…' : `Pay ₹${pricing.total} with UPI`}
        </button>
      </form>
    </section>
  )
}
