import React, { createContext, useContext, useMemo, useState } from "react";
import { computeCartWithCoupon, couponEligibilityMessage } from '../utils/coupon.js'
import { api } from '../api/client.js'

const CartContext = createContext(null);

// Hard ceiling per line item, regardless of how much stock exists — prevents
// one customer from cart-hoarding the entire inventory of a product.
const MAX_QTY_PER_ITEM = 20;

function clampQty(qty, stock) {
  const ceiling = Math.min(stock, MAX_QTY_PER_ITEM);
  return Math.max(0, Math.min(qty, ceiling));
}

export function CartProvider({ children }) {
  // items: { [productId]: { product, qty } }
  const [items, setItems] = useState({});
  const [coupon, setCoupon] = useState(null)       // CouponResponse from backend, or null
  const [couponError, setCouponError] = useState('')
  

  function addItem(product, qty = 1) {
    setItems((prev) => {
      const existingQty = prev[product.id]?.qty || 0;
      const nextQty = clampQty(existingQty + qty, product.stock);
      if (nextQty <= 0) return prev;
      return { ...prev, [product.id]: { product, qty: nextQty } };
    });
  }

  function updateQty(productId, qty) {
    setItems((prev) => {
      const entry = prev[productId];
      if (!entry) return prev;
      const clamped = clampQty(qty, entry.product.stock);
      if (clamped <= 0) {
        const next = { ...prev };
        delete next[productId];
        return next;
      }
      return { ...prev, [productId]: { ...entry, qty: clamped } };
    });
  }

  function removeItem(productId) {
    setItems((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  }

  function clearCart() {
    setItems({});
    setCoupon(null);
    setCouponError("");
  }

  async function applyCoupon(code) {
    setCouponError("");
    let result
    try {
      result = await api.applyCoupon(code, cartList.map(({ product, qty }) => ({
        productId: product.id,
        qty
      })))
    } catch (err) {
      setCoupon(null);
      let message = "That coupon code is invalid or no longer active."
      if (err.status === 422 && err.body) {
        try {
          message = JSON.parse(err.body).message || message
        } catch {
          message = err.body
        }
      }
      setCouponError(message);
      throw err;
    }

    const hasEligibleItems = computeCartWithCoupon(cartList, result).lines.some(line => line.applies)
    if (!hasEligibleItems) {
      setCoupon(null)
      setCouponError(couponEligibilityMessage(result))
      throw new Error('Coupon is not applicable to the current cart')
    }

    setCoupon(result)
    return result
  }

  function removeCoupon() {
    setCoupon(null);
    setCouponError("");
  }

  const cartList = useMemo(() => Object.values(items), [items]);
  const totalItems = useMemo(
    () => cartList.reduce((s, i) => s + i.qty, 0),
    [cartList],
  );

  // Live discounted totals — recomputed from cart + coupon, matching the same
  // rules the backend uses. This is display-only; OrderService recomputes the
  // real charge from scratch at checkout.
  const pricing = useMemo(
    () => computeCartWithCoupon(cartList, coupon),
    [cartList, coupon],
  );

  const value = {
    items: cartList,
    addItem,
    updateQty,
    removeItem,
    clearCart,
    totalItems,
    totalAmount: pricing.total, // kept for backward compatibility with existing pages
    maxQtyPerItem: MAX_QTY_PER_ITEM,
    coupon,
    couponError,
    applyCoupon,
    removeCoupon,
    pricing, // { lines, subtotal, discount, total }
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
