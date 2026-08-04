import React, { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  // items: { [productId]: { product, qty } }
  const [items, setItems] = useState({})

  function addItem(product, qty = 1) {
    setItems(prev => {
      const existingQty = prev[product.id]?.qty || 0
      const nextQty = Math.min(existingQty + qty, product.stock)
      if (nextQty <= 0) return prev
      return { ...prev, [product.id]: { product, qty: nextQty } }
    })
  }

  function updateQty(productId, qty) {
    setItems(prev => {
      if (qty <= 0) {
        const next = { ...prev }
        delete next[productId]
        return next
      }
      const entry = prev[productId]
      if (!entry) return prev
      const clamped = Math.min(qty, entry.product.stock)
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
    totalAmount
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
