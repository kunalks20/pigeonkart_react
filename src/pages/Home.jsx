import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCarousel from '../components/ProductCarousel.jsx'

const CATEGORIES = [
  {
    key: 'namkin',
    title: 'Namkin',
    tagline: 'Crisp, roasted, home-fried',
    description:
      'Sev, bhujia, Mini Kachori, Gathiya and lot more — the tin your grandmother always kept ' +
      'topped up. Made in small batches and shipped the same week, so it never sits ' +
      'around losing its crunch.',
  },
  {
    key: 'achar',
    title: 'Achar',
    tagline: 'Sun-cured, slow-fermented',
    description:
      'A tangy, spicy, sweet and savory collection, from aam, nimbu and mirchi to ' +
      'lahsun, amla, ker and ker sangri. Made in small batches for a bold, homestyle ' +
      'touch at every meal.',
  }
]

const FEATURED_PRODUCTS = [
  { productName: 'Ker Sangri Achar', 
    description: 'The quintessential taste of Rajasthan—authentic, rich in heritage, and crafted with wild desert botanicals for an unforgettable spicy punch.',
    image: '/images/ker_sangri_pickle.jpeg' 
  },
  { productName: 'Masaala Munch', 
    description: 'From classic Bikaneri spice and zesty Aloo crunch to fiery Ratlami clove and fresh Pudina mint, our signature Bhujia range delivers the ultimate crunch in every authentic Rajasthani flavor.', 
    image: '/images/all_bhujiya.jpeg'
  },
  { productName: 'Mini Kachori', 
    description: 'A delightful twist on the classic street snack, filled with spiced potatoes and served with a side of mint chutney.', 
    image: '/images/MINI_KACHORI.png'
  },
  { productName: 'Aam Hing Achar', 
    description: 'A refreshing and tangy pickle made from unripe mangoes, perfect for adding a zesty kick to any meal.', 
    image: '/images/aam_hing_achar.jpeg'
  }

]

export default function Home() {

  return (
    <div>
      <ProductCarousel featuredProducts={FEATURED_PRODUCTS} />

      {/* CATEGORIES — real categories, with description and a direct link
          into the Shop page pre-selected to that tab */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="font-display text-3xl font-700 text-center mb-2">Our Categories</h2>
        <p className="text-center text-ink/60 mb-10">Two shelves. Everything on them is stocked in real time.</p>

        <div className="grid sm:grid-cols-2 gap-6">
          {CATEGORIES.map(cat => (
            <div key={cat.key} className="category-card border-2 border-ink/15 rounded-lg bg-cream p-6">
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
