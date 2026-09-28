import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MangoIcon, GarlicIcon, LemonIcon, ChilliIcon, SevIcon, DalIcon, ChivdaIcon, PeanutIcon } from '../components/icons.jsx'
import ProductCarousel from '../components/ProductCarousel.jsx'
import { api } from '../api/client.js'

const CATEGORIES = [
  {
    key: 'namkin',
    title: 'Namkin',
    tagline: 'Crisp, roasted, home-fried',
    description:
      'Sev, bhujia, chivda and roasted dal — the tin your grandmother always kept ' +
      'topped up. Made in small batches and shipped the same week, so it never sits ' +
      'around losing its crunch.',
    icons: [SevIcon, DalIcon, ChivdaIcon, PeanutIcon]
  },
  {
    key: 'achar',
    title: 'Achar',
    tagline: 'Sun-cured, slow-fermented',
    description:
      'Keri, lehsun, nimbu and mirch — pickled the old way, in mustard oil, with ' +
      'weeks of sun-curing and no shortcuts. Every jar tastes like it came from ' +
      'someone\'s actual kitchen, because it did.',
    icons: [MangoIcon, GarlicIcon, LemonIcon, ChilliIcon]
  }
]

const FEATURED_PRODUCTS = [
  { productCode: 'ALOO_BHUJIYA_500G', image: '/images/ALOO_BHUJIYA.jpeg' }
]

export default function Home() {
  const [products, setProducts] = useState([])
  const featuredProducts = FEATURED_PRODUCTS
    .map(({ productCode, image }) => {
      const product = products.find(item => item.productCode === productCode)
      return product && product.stock > 0 ? { ...product, image } : null
    })
    .filter(Boolean)

  useEffect(() => {
      api.getProducts().then(setProducts).catch(() => {})
    }, [])

  return (
    <div>
      <ProductCarousel products={featuredProducts} />

      {/* CATEGORIES — real categories, with description and a direct link
          into the Shop page pre-selected to that tab */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="font-display text-3xl font-700 text-center mb-2">Our Categories</h2>
        <p className="text-center text-ink/60 mb-10">Two shelves. Everything on them is stocked in real time.</p>

        <div className="grid sm:grid-cols-2 gap-6">
          {CATEGORIES.map(cat => (
            <div key={cat.key} className="category-card border-2 border-ink/15 rounded-lg bg-cream p-6">
              <div className="flex items-center gap-3 mb-3">
                {cat.icons.map((Icon, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-turmeric/15 border border-brass/40 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                ))}
              </div>
              <h3 className="font-display text-2xl font-700">{cat.title}</h3>
              <p className="text-xs uppercase tracking-wide text-brass font-semibold mt-1 mb-3">{cat.tagline}</p>
              <p className="text-ink/70 text-sm mb-5">{cat.description}</p>
              <Link
                to={`/shop?tab=${cat.key}`}
                className="inline-block text-pickle font-semibold text-sm hover:underline"
              >
                Shop {cat.title} →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
