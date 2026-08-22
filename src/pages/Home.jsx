import React from 'react'
import { Link } from 'react-router-dom'
import { MangoIcon, GarlicIcon, LemonIcon, ChilliIcon, SevIcon, DalIcon, ChivdaIcon, PeanutIcon } from '../components/icons.jsx'

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

export default function Home() {
  return (
    <div>
      {/* HERO — real photo background (jars of achar + bowls of namkin),
          with a warm dark overlay so the text stays readable on top of it. */}
      <section
        className="relative bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
      >
        {/* Overlay: darker at the bottom where text sits, warm ink tone to
            match the brand palette rather than a flat black scrim. */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/60 to-ink/30" />

        <div className="relative max-w-3xl mx-auto px-4 pt-24 pb-20 text-center">
          <p className="uppercase tracking-[0.25em] text-sm text-turmeric font-semibold mb-3">
            Small-batch • Home-style
          </p>
          <h1 className="font-display text-5xl leading-tight font-700 text-cream drop-shadow-md">
            Namkin, achar, and everything
            <br /> your kitchen tin is missing.
          </h1>
          <p className="mt-5 text-cream/85 max-w-xl mx-auto">
            Marwari Munchies brings the snack tin and the pickle jar online — crisp namkin,
            slow-cured achar, made the way home kitchens make it. Pick a category, fill
            your cart, pay by UPI.
          </p>
          <Link
            to="/shop"
            className="inline-block mt-8 bg-pickle text-cream font-semibold px-8 py-3 rounded-md hover:bg-pickle/90 transition-colors"
          >
            Go to Shop
          </Link>
        </div>
      </section>

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
