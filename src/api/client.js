// In dev, this stays '/api' and Vite's proxy (see vite.config.js) forwards it to
// localhost:8080. In production there's no such proxy, so set VITE_API_BASE_URL
// (e.g. in Vercel's project env vars) to your deployed backend's full URL,
const BASE = import.meta.env.VITE_API_BASE_URL || '/api'

const ADMIN_TOKEN_KEY = 'pigeonkart_admin_token'
let activeRequests = 0
const requestListeners = new Set()

function notifyRequestListeners() {
  requestListeners.forEach(listener => listener(activeRequests > 0))
}

export function subscribeToApiLoading(listener) {
  requestListeners.add(listener)
  listener(activeRequests > 0)
  return () => {
    requestListeners.delete(listener)
  }
}

async function request(path, options = {}) {
  const { headers: customHeaders, ...restOptions } = options
  activeRequests += 1
  notifyRequestListeners()
  try {
    const res = await fetch(`${BASE}${path}`, {
      ...restOptions,
      headers: { 'Content-Type': 'application/json', ...(customHeaders || {}) }
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      const error = new Error(`API ${path} failed: ${res.status} ${text}`)
      error.status = res.status
      throw error
    }
    // Some endpoints (e.g. POST /payments/razorpay/verify) return 200/204 with no
    // body. Calling res.json() on an empty body throws, so check for content first.
    const text = await res.text()
    return text ? JSON.parse(text) : null
  } finally {
    activeRequests -= 1
    notifyRequestListeners()
  }
}

// Same as request(), but attaches the stored admin token — used for every
// /admin/* call except login itself.
async function adminRequest(path, options = {}) {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY)
  try {
    return await request(path, {
      ...options,
      headers: { 'X-Admin-Token': token || '', ...(options.headers || {}) }
    })
  } catch (error) {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem(ADMIN_TOKEN_KEY)
      if (window.location.pathname !== '/login') {
        window.location.replace('/login')
      }
    }
    throw error
  }
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
    request('/payments/razorpay/verify', { method: 'POST', body: JSON.stringify(payload) }),

  submitFeedback: (payload) =>
    request('/feedback', { method: 'POST', body: JSON.stringify(payload) }),

  // --- Admin ---
  adminLogin: async (username, password) => {
    const { token } = await request('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    })
    localStorage.setItem(ADMIN_TOKEN_KEY, token)
    return token
  },
  adminLogout: () => localStorage.removeItem(ADMIN_TOKEN_KEY),
  adminIsLoggedIn: () => !!localStorage.getItem(ADMIN_TOKEN_KEY),
  // Actually asks the backend whether the stored token is still valid, rather
  // than just checking that something is present in localStorage.
  adminValidateSession: () => adminRequest('/admin/session'),
  adminGetOrders: () => adminRequest('/admin/orders'),
  adminUpdateOrder: (orderId, payload) =>
    adminRequest(`/admin/orders/${orderId}`, { method: 'PUT', body: JSON.stringify(payload) }),
  adminGetFeedback: () => adminRequest('/admin/feedback'),

  // --- Admin: inventory ---
  adminGetProducts: () => adminRequest('/admin/products'),
  adminCreateProduct: (payload) =>
    adminRequest('/admin/products/add-product', { method: 'POST', body: JSON.stringify(payload) }),
  adminUpdateProduct: (id, payload) =>
    adminRequest(`/admin/products/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  adminBulkUpdateProducts: (products) =>
    adminRequest('/admin/products/bulk', { method: 'PUT', body: JSON.stringify({ products }) }),
  adminDeleteProduct: (id) =>
    adminRequest(`/admin/products/${id}`, { method: 'DELETE' }),

  // --- Coupons ---
  applyCoupon: (code) =>
    request('/orders/coupons/apply', { method: 'POST', body: JSON.stringify({ code }) }),

  // --- Admin: coupons ---
  adminGetCoupons: () => adminRequest('/admin/coupons'),
  adminCreateCoupon: (payload) =>
    adminRequest('/admin/coupons', { method: 'POST', body: JSON.stringify(payload) }),
  adminUpdateCoupon: (code, payload) =>
    adminRequest(`/admin/coupons/${code}`, { method: 'PUT', body: JSON.stringify(payload) }),
  adminDeleteCoupon: (code) =>
    adminRequest(`/admin/coupons/${code}`, { method: 'DELETE' })
}