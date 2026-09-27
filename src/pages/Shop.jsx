import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { TAB_BANNER_ICONS } from '../data/productIcons.js'
import { api } from '../api/client.js'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialTab = searchParams.get('tab') === 'achar' ? 'achar' : 'namkeen'
  const [tab, setTab] = useState(initialTab)
  const [products, setProducts] = useState([])

  useEffect(() => {
    api.getProducts().then(setProducts).catch(() => {})
  }, [])

  function selectTab(next) {
    setTab(next)
    setSearchParams({ tab: next })
  }

  const filtered = products.filter(p => p?.category?.toLowerCase() === tab)
  const bannerIcons = TAB_BANNER_ICONS[tab]

  return (
    <section
      className={`transition-colors duration-300 ${
        tab === 'achar' ? 'bg-pickle/5' : 'bg-turmeric/5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="font-display text-4xl font-700 mb-8">Shop</h1>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => selectTab('namkeen')}
            className={`jar-tab px-6 py-3 font-display text-lg ${tab === 'namkeen' ? 'active' : ''}`}
          >
            Namkeen
          </button>
          <button
            onClick={() => selectTab('achar')}
            className={`jar-tab px-6 py-3 font-display text-lg ${tab === 'achar' ? 'active' : ''}`}
          >
            Achar
          </button>
        </div>

        {/* Decorative ingredient strip — swaps with the active tab */}
        <div className="flex items-center gap-6 mb-10 opacity-70">
          {bannerIcons.map((Icon, i) => (
            <Icon key={i} className="w-9 h-9" />
          ))}
          <span className="text-xs uppercase tracking-widest text-ink/50 ml-2">
            {tab === 'achar' ? 'Keri · Lehsun · Nimbu · Mirch' : 'Sev · Dal · Chivda · Moongphali'}
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
