import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client.js'

const STATUS_OPTIONS = ['PENDING_PAYMENT', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'FAILED']
const CATEGORY_OPTIONS = ['NAMKIN', 'ACHAR']

function OrderRow({ order, onSaved }) {
  const [status, setStatus] = useState(order.status)
  const [remarks, setRemarks] = useState(order.remarks || '')
  const [saving, setSaving] = useState(false)

  async function save() {
    setSaving(true)
    try {
      const updated = await api.adminUpdateOrder(order.id, { status, remarks })
      onSaved(updated)
    } finally {
      setSaving(false)
    }
  }

  return (
    <tr className="border-b border-ink/10 align-top">
      <td className="py-3 pr-4 text-xs text-ink/60">{order.id}</td>
      <td className="py-3 pr-4">
        <p className="font-semibold">{order.customerName}</p>
        <p className="text-xs text-ink/60">{order.customerPhone}</p>
        <p className="text-xs text-ink/60 max-w-[16rem]">{order.customerAddress}</p>
      </td>
      <td className="py-3 pr-4 text-sm">
        {order.items.map((item, i) => (
          <div key={i}>{item.productName} × {item.qty}</div>
        ))}
      </td>
      <td className="py-3 pr-4 font-semibold">₹{order.totalAmount}</td>
      <td className="py-3 pr-4">
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="border border-ink/20 rounded px-2 py-1 text-sm bg-cream"
        >
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </td>
      <td className="py-3 pr-4">
        <input
          value={remarks}
          onChange={e => setRemarks(e.target.value)}
          placeholder="Tracking note…"
          className="border border-ink/20 rounded px-2 py-1 text-sm bg-cream w-40"
        />
      </td>
      <td className="py-3">
        <button
          onClick={save}
          disabled={saving}
          className="bg-pickle text-cream text-sm font-semibold px-3 py-1.5 rounded hover:bg-pickle/90 disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </td>
    </tr>
  )
}

function OrdersTab() {
  const [orders, setOrders] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api.adminGetOrders()
      .then(setOrders)
      .catch(() => setError('Could not load orders — your session may have expired.'))
  }, [])

  function handleSaved(updated) {
    setOrders(prev => prev.map(o => (o.id === updated.id ? updated : o)))
  }

  if (error) return <p className="text-pickle text-sm">{error}</p>
  if (!orders) return <p className="text-ink/60">Loading…</p>
  if (orders.length === 0) return <p className="text-ink/60">No orders yet.</p>

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b-2 border-ink/15 text-xs uppercase tracking-wide text-ink/50">
            <th className="py-2 pr-4">Order</th>
            <th className="py-2 pr-4">Customer</th>
            <th className="py-2 pr-4">Items</th>
            <th className="py-2 pr-4">Total</th>
            <th className="py-2 pr-4">Status</th>
            <th className="py-2 pr-4">Remarks</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <OrderRow key={order.id} order={order} onSaved={handleSaved} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function FeedbackTab() {
  const [feedback, setFeedback] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api.adminGetFeedback()
      .then(setFeedback)
      .catch(() => setError('Could not load feedback — your session may have expired.'))
  }, [])

  if (error) return <p className="text-pickle text-sm">{error}</p>
  if (!feedback) return <p className="text-ink/60">Loading…</p>
  if (feedback.length === 0) return <p className="text-ink/60">No feedback submitted yet.</p>

  return (
    <div className="space-y-4">
      {feedback.map(f => (
        <div key={f.id} className="border-2 border-ink/10 rounded-lg bg-cream p-4">
          <div className="flex items-center justify-between mb-1">
            <p className="font-semibold">{f.name} <span className="text-ink/50 font-normal">— {f.email}</span></p>
            <p className="text-xs text-ink/50">{new Date(f.createdAt).toLocaleString()}</p>
          </div>
          <p className="text-sm text-ink/70 whitespace-pre-line">{f.message}</p>
        </div>
      ))}
    </div>
  )
}

const EMPTY_PRODUCT = { id: '', name: '', category: 'NAMKIN', price: 0, stock: 0, unit: '', description: '' }

function ProductCardRow({ product, onChange, onDeleted }) {
  const [deleting, setDeleting] = useState(false)
  const [confirmingDelete, setConfirmingDelete] = useState(false)

  function set(field, value) {
    onChange({ ...product, [field]: value })
  }

  function adjustStock(delta) {
    onChange({ ...product, stock: Math.max(0, product.stock + delta) })
  }

  async function handleDelete() {
    if (!confirmingDelete) {
      setConfirmingDelete(true)
      return
    }
    setDeleting(true)
    try {
      await api.adminDeleteProduct(product.id)
      onDeleted(product.id)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="border-2 border-ink/15 rounded-lg bg-cream p-4">
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="text-xs text-ink/50">{product.id}</span>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className={`text-xs font-semibold px-3 py-1 rounded border shrink-0 ${
            confirmingDelete
              ? 'bg-pickle text-cream border-pickle'
              : 'text-pickle border-pickle/40 hover:bg-pickle/10'
          } disabled:opacity-60`}
        >
          {deleting ? 'Removing…' : confirmingDelete ? 'Confirm delete?' : 'Delete'}
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-ink/60 mb-1">Name</label>
          <input value={product.name} onChange={e => set('name', e.target.value)}
            className="w-full border border-ink/20 rounded px-2 py-1.5 text-sm bg-paper" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-ink/60 mb-1">Description</label>
          <textarea value={product.description || ''} onChange={e => set('description', e.target.value)}
            rows={2} className="w-full border border-ink/20 rounded px-2 py-1.5 text-sm bg-paper" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-ink/60 mb-1">Category</label>
            <select value={product.category} onChange={e => set('category', e.target.value)}
              className="w-full border border-ink/20 rounded px-2 py-1.5 text-sm bg-paper">
              {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink/60 mb-1">Unit</label>
            <input value={product.unit || ''} onChange={e => set('unit', e.target.value)}
              className="w-full border border-ink/20 rounded px-2 py-1.5 text-sm bg-paper" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-ink/60 mb-1">Price (₹)</label>
            <input type="number" min={0} value={product.price}
              onChange={e => set('price', Number(e.target.value))}
              className="w-full border border-ink/20 rounded px-2 py-1.5 text-sm bg-paper" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink/60 mb-1">Stock</label>
            <div className="flex items-center border border-ink/20 rounded overflow-hidden">
              <button type="button" onClick={() => adjustStock(-1)} aria-label="Decrease stock"
                className="w-8 h-8 flex items-center justify-center text-ink hover:bg-ink/10 shrink-0">
                −
              </button>
              <input
                type="number"
                min={0}
                value={product.stock}
                onChange={e => set('stock', Math.max(0, Number(e.target.value)))}
                className="w-full min-w-0 text-center text-sm border-x border-ink/20 py-1.5 bg-paper"
              />
              <button type="button" onClick={() => adjustStock(1)} aria-label="Increase stock"
                className="w-8 h-8 flex items-center justify-center text-ink hover:bg-ink/10 shrink-0">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InventoryTab() {
  const [products, setProducts] = useState(null)
  const [error, setError] = useState('')
  const [newProduct, setNewProduct] = useState(EMPTY_PRODUCT)
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState('')
  const [savingAll, setSavingAll] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  function load() {
    api.adminGetProducts()
      .then(setProducts)
      .catch(() => setError('Could not load inventory — your session may have expired.'))
  }

  useEffect(load, [])

  function handleChange(updatedProduct) {
    setSaveMessage('')
    setProducts(prev => prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p)))
  }

  function handleDeleted(id) {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  async function handleSaveAll() {
    if (!products || products.length === 0) return
    const confirmed = window.confirm(`Save changes to all ${products.length} product(s)?`)
    if (!confirmed) return

    setSavingAll(true)
    setSaveMessage('')
    try {
      const updated = await api.adminBulkUpdateProducts(products)
      setProducts(updated)
      setSaveMessage('All changes saved.')
    } catch (err) {
      setSaveMessage('Could not save changes — please try again.')
    } finally {
      setSavingAll(false)
    }
  }

  async function handleCreate(e) {
    e.preventDefault()
    setCreateError('')
    setCreating(true)
    try {
      await api.adminCreateProduct(newProduct)
      setNewProduct(EMPTY_PRODUCT)
      load()
    } catch (err) {
      setCreateError('Could not add product — check the id is unique and all fields are valid.')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div>
      <div className="border-2 border-ink/10 rounded-lg bg-cream p-4 mb-8">
        <h3 className="font-display text-lg mb-3">Add a new product</h3>
        <form onSubmit={handleCreate} className="grid sm:grid-cols-3 gap-3">
          <input required placeholder="id (e.g. ac-6)" value={newProduct.id}
            onChange={e => setNewProduct({ ...newProduct, id: e.target.value })}
            className="border border-ink/20 rounded px-2 py-1.5 text-sm bg-paper" />
          <input required placeholder="Name" value={newProduct.name}
            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
            className="border border-ink/20 rounded px-2 py-1.5 text-sm bg-paper" />
          <select value={newProduct.category}
            onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
            className="border border-ink/20 rounded px-2 py-1.5 text-sm bg-paper">
            {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input required type="number" min={0} placeholder="Price (₹)" value={newProduct.price}
            onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
            className="border border-ink/20 rounded px-2 py-1.5 text-sm bg-paper" />
          <input required type="number" min={0} placeholder="Stock" value={newProduct.stock}
            onChange={e => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
            className="border border-ink/20 rounded px-2 py-1.5 text-sm bg-paper" />
          <input placeholder="Unit (e.g. 200g pack)" value={newProduct.unit}
            onChange={e => setNewProduct({ ...newProduct, unit: e.target.value })}
            className="border border-ink/20 rounded px-2 py-1.5 text-sm bg-paper" />
          <textarea placeholder="Description" value={newProduct.description}
            onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
            className="border border-ink/20 rounded px-2 py-1.5 text-sm bg-paper sm:col-span-3" rows={2} />
          {createError && <p className="text-pickle text-sm sm:col-span-3">{createError}</p>}
          <button
            disabled={creating}
            className="bg-ink text-cream text-sm font-semibold px-4 py-2 rounded hover:bg-ink/90 disabled:opacity-60 sm:col-span-3 w-fit"
          >
            {creating ? 'Adding…' : 'Add product'}
          </button>
        </form>
      </div>

      {error && <p className="text-pickle text-sm">{error}</p>}
      {!error && !products && <p className="text-ink/60">Loading…</p>}

      {products && (
        <>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg">Existing products</h3>
            <div className="flex items-center gap-3">
              {saveMessage && (
                <span className={`text-sm ${saveMessage.startsWith('Could not') ? 'text-pickle' : 'text-ink/60'}`}>
                  {saveMessage}
                </span>
              )}
              <button
                onClick={handleSaveAll}
                disabled={savingAll}
                className="bg-pickle text-cream text-sm font-semibold px-4 py-2 rounded hover:bg-pickle/90 disabled:opacity-60"
              >
                {savingAll ? 'Saving…' : 'Save All'}
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(p => (
              <ProductCardRow key={p.id} product={p} onChange={handleChange} onDeleted={handleDeleted} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function AdminDashboard() {
  const [tab, setTab] = useState('orders')
  const [checkingSession, setCheckingSession] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Runs every time this page is landed on (fresh navigation, refresh, or
    // coming back to /admin later) — not just once per app load.
    async function checkSession() {
      if (!api.adminIsLoggedIn()) {
        navigate('/login')
        return
      }
      try {
        await api.adminValidateSession()
        setCheckingSession(false)
      } catch (err) {
        // Token exists locally but the backend rejects it (expired, backend
        // restarted, tampered, etc.) — clear it and send them to log in again.
        api.adminLogout()
        navigate('/login')
      }
    }
    checkSession()
  }, [navigate])

  function handleLogout() {
    api.adminLogout()
    navigate('/login')
  }

  if (checkingSession) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-ink/60">Checking session…</p>
      </section>
    )
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-700">Admin</h1>
        <button onClick={handleLogout} className="text-sm text-pickle hover:underline">
          Log out
        </button>
      </div>

      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setTab('orders')}
          className={`jar-tab px-5 py-2 text-sm ${tab === 'orders' ? 'active' : ''}`}
        >
          Orders
        </button>
        <button
          onClick={() => setTab('feedback')}
          className={`jar-tab px-5 py-2 text-sm ${tab === 'feedback' ? 'active' : ''}`}
        >
          Feedback
        </button>
        <button
          onClick={() => setTab('inventory')}
          className={`jar-tab px-5 py-2 text-sm ${tab === 'inventory' ? 'active' : ''}`}
        >
          Inventory
        </button>
      </div>

      {tab === 'orders' && <OrdersTab />}
      {tab === 'feedback' && <FeedbackTab />}
      {tab === 'inventory' && <InventoryTab />}
    </section>
  )
}
