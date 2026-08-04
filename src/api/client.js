const BASE = import.meta.env.VITE_API_BASE_URL || '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`API ${path} failed: ${res.status} ${text}`)
  }
  // Some endpoints (e.g. POST /payments/razorpay/verify) return 200/204 with no
  // body. Calling res.json() on an empty body throws, so check for content first.
  const text = await res.text()
  return text ? JSON.parse(text) : null
}

export const api = {
  getProducts: () => request('/products'),
  createOrder: (payload) =>
    request('/orders', { method: 'POST', body: JSON.stringify(payload) }),
  // Kicks off a Razorpay order on the backend; returns { razorpayOrderId, amount, currency, keyId }
  createPaymentOrder: (orderId) =>
    request(`/payments/razorpay/order/${orderId}`, { method: 'POST' }),
  // Called after Razorpay checkout returns a signature, so the backend can verify it
  verifyPayment: (payload) =>
    request('/payments/razorpay/verify', { method: 'POST', body: JSON.stringify(payload) })
}