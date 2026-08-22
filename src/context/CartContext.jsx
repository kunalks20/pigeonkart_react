import React, { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

// Hard ceiling per line item, regardless of how much stock exists — prevents
// one customer from cart-hoarding the entire inventory of a product.
const MAX_QTY_PER_ITEM = 10

function clampQty(qty, stock) {
  const ceiling = Math.min(stock, MAX_QTY_PER_ITEM)
  return Math.max(0, Math.min(qty, ceiling))
}

export function CartProvider({ children }) {
  // items: { [productId]: { product, qty } }
  const [items, setItems] = useState({})

  function addItem(product, qty = 1) {
    setItems(prev => {
      const existingQty = prev[product.id]?.qty || 0
      const nextQty = clampQty(existingQty + qty, product.stock)
      if (nextQty <= 0) return prev
      return { ...prev, [product.id]: { product, qty: nextQty } }
    })
  }

  function updateQty(productId, qty) {
    setItems(prev => {
      const entry = prev[productId]
      if (!entry) return prev
      const clamped = clampQty(qty, entry.product.stock)
      if (clamped <= 0) {
        const next = { ...prev }
        delete next[productId]
        return next
      }
      return { ...prev, [productId]: { ...entry, qty: clamped } }
    })
  }

  function removeItem(productId) {
    setItems(prev => {
      const next = { ...prev }
      delete next[productId]
      return next
    })
  }

  function clearCart() {
    setItems({})
  }

  const cartList = useMemo(() => Object.values(items), [items])
  const totalItems = useMemo(() => cartList.reduce((s, i) => s + i.qty, 0), [cartList])
  const totalAmount = useMemo(
    () => cartList.reduce((s, i) => s + i.qty * i.product.price, 0),
    [cartList]
  )

  const value = {
    items: cartList,
    addItem,
    updateQty,
    removeItem,
    clearCart,
    totalItems,
    totalAmount,
    maxQtyPerItem: MAX_QTY_PER_ITEM
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}