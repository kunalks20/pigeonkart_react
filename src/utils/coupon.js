// Mirrors the same matching/discount logic as the backend's Coupon.matches()
// and discountedUnitPrice() (see Coupon.java) — this is purely for instant
// UI display (strikethrough pricing, live totals) as the cart changes. The
// actual charge is always recomputed server-side at checkout; this never
// needs to be perfectly tamper-proof, just consistent with what the backend
// will compute.

function matches(coupon, product) {
  const categoryOk = !coupon.scopeCategory || coupon.scopeCategory === product.category?.toUpperCase()
  const unitOk = !coupon.scopeUnitContains ||
    (product.unit || '').toLowerCase().includes(coupon.scopeUnitContains.toLowerCase())
  return categoryOk && unitOk
}

export function couponEligibilityMessage(coupon) {
  const requirements = []
  if (coupon?.scopeCategory) requirements.push(`${coupon.scopeCategory} items`)
  if (coupon?.scopeUnitContains) {
    requirements.push(`products with a unit containing "${coupon.scopeUnitContains}"`)
  }

  if (requirements.length === 0) {
    return "Sorry, your cart doesn't have any items eligible for this coupon."
  }

  return `Sorry, your cart doesn't have any eligible items. This coupon is only applicable to ${requirements.join(' and ')}.`
}

function discountedUnitPrice(coupon, unitPrice) {
  const discounted = coupon.discountType === 'PERCENTAGE'
    ? unitPrice - Math.floor((unitPrice * coupon.discountValue) / 100)
    : unitPrice - coupon.discountValue
  return Math.max(discounted, 0)
}

/**
 * @param items  [{ product, qty }] — same shape as CartContext's items
 * @param coupon CouponResponse from the backend, or null
 * @returns {
 *   lines: [{ product, qty, unitPrice, discountedUnitPrice, applies, lineTotal, discountedLineTotal }],
 *   subtotal, discount, total
 * }
 */
export function computeCartWithCoupon(items, coupon) {
  let subtotal = 0
  let total = 0

  const lines = items.map(({ product, qty }) => {
    const applies = !!coupon && matches(coupon, product)
    const unitPrice = product.price
    const finalUnitPrice = applies ? discountedUnitPrice(coupon, unitPrice) : unitPrice
    const lineTotal = unitPrice * qty
    const discountedLineTotal = finalUnitPrice * qty

    subtotal += lineTotal
    total += discountedLineTotal

    return { product, qty, unitPrice, discountedUnitPrice: finalUnitPrice, applies, lineTotal, discountedLineTotal }
  })

  return { lines, subtotal, discount: subtotal - total, total }
}