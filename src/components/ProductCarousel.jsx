import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const AUTO_SCROLL_MS = 4000

export default function ProductCarousel({ products }) {
  const [index, setIndex] = useState(0)
  const [imageFailed, setImageFailed] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-advance. Re-running this effect on every index change (including
  // manual prev/next/dot clicks) means the countdown restarts after any
  // interaction, instead of jumping right after someone just clicked.
  useEffect(() => {
    if (!products || products.length <= 1 || isPaused) return
    const timer = setInterval(() => {
      setImageFailed(false)
      setIndex(i => (i + 1) % products.length)
    }, AUTO_SCROLL_MS)
    return () => clearInterval(timer)
  }, [index, products, isPaused])

  if (!products || products.length === 0) return null

  const current = products[index]

  function prev() {
    setImageFailed(false)
    setIndex(i => (i - 1 + products.length) % products.length)
  }
  function next() {
    setImageFailed(false)
    setIndex(i => (i + 1) % products.length)
  }
  return (
    <section className="w-full py-6">
      <p className="font-display font-display-bold text-center uppercase tracking-[0.2em] text-sm text-brass font-semibold mb-6">
        Home-style namkin & achar, delivered fresh
      </p>
      <div
        className="relative bg-ink"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative h-[420px] sm:h-[560px]">
          {current.productCode && !imageFailed ? (
            <img
              src={`/images/${current.productCode}.jpeg`}
              alt={current.name}
              onError={() => setImageFailed(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-turmeric/10 text-brass/60 text-sm uppercase tracking-wide">
              Add photo: {current.id}
            </div>
          )}
          {/* Dark gradient so the centered caption stays readable over any photo */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />

          <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-10">
            <h3 className="font-display text-4xl text-cream drop-shadow-md">{current.name}</h3>
            <p className="text-cream/80 text-sm mt-2 max-w-md">{current.description}</p>
            <span className="font-display text-2xl text-turmeric mt-2">₹{current.price}</span>
          </div>
        </div>

        {/* Left / right arrows */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous product"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-cream/90 text-ink flex items-center justify-center text-2xl font-bold hover:bg-cream transition-colors"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next product"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-cream/90 text-ink flex items-center justify-center text-2xl font-bold hover:bg-cream transition-colors"
        >
          ›
        </button>
      </div>

      {/* Dot indicators for quick jump */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {products.map((p, i) => (
          <button
            key={p.id}
            onClick={() => { setImageFailed(false); setIndex(i) }}
            aria-label={`Go to ${p.name}`}
            className={`w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-pickle' : 'bg-ink/20'}`}
          />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/shop"
          className="inline-block bg-pickle text-cream font-semibold px-8 py-3 rounded-md hover:bg-pickle/90 transition-colors"
        >
          Explore more in the Shop
        </Link>
      </div>
    </section>
  )
}