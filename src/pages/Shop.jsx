import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import { PRODUCTS } from '../data/products.js'
import { api } from '../api/client.js'

export default function Shop() {
  const [tab, setTab] = useState('NAMKIN')
  const [products, setProducts] = useState(PRODUCTS)

  useEffect(() => {
    // Once the backend is running, this swaps the placeholder catalog for the
    // live one. Falls back to local data if the API isn't reachable yet.
    api.getProducts().then(setProducts).catch(() => {})
  }, [])

  const filtered = products.filter(p => p.category === tab)

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-display text-4xl font-700 mb-8">Shop</h1>

      <div className="flex gap-4 mb-10">
        <button
          onClick={() => setTab('NAMKIN')}
          className={`jar-tab px-6 py-3 font-display text-lg ${tab === 'NAMKIN' ? 'active' : ''}`}
        >
          Namkin
        </button>
        <button
          onClick={() => setTab('ACHAR')}
          className={`jar-tab px-6 py-3 font-display text-lg ${tab === 'ACHAR' ? 'active' : ''}`}
        >
          Achar
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
