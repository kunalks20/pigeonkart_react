import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const AUTO_SCROLL_MS = 4000

export default function ProductCarousel({ featuredProducts }) {
  const [index, setIndex] = useState(0)
  const [imageFailed, setImageFailed] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-advance. Re-running this effect on every index change (including
  // manual prev/next/dot clicks) means the countdown restarts after any
  // interaction, instead of jumping right after someone just clicked.
  useEffect(() => {
    if (!featuredProducts || featuredProducts.length <= 1 || isPaused) return
    const timer = setInterval(() => {
      setImageFailed(false)
      setIndex(i => (i + 1) % featuredProducts.length)
    }, AUTO_SCROLL_MS)
    return () => clearInterval(timer)
  }, [index, featuredProducts, isPaused])

  if (!featuredProducts || featuredProducts.length === 0) return null

  const current = featuredProducts[index]
  

  function prev() {
    setImageFailed(false)
    setIndex(i => (i - 1 + featuredProducts.length) % featuredProducts.length)
  }
  function next() {
    setImageFailed(false)
    setIndex(i => (i + 1) % featuredProducts.length)
  }
  return (
    <section className="w-full py-6">
      <p className="font-display font-display-bold text-center uppercase tracking-[0.2em] text-sm text-brass font-semibold mb-6">
        !! Our Featured Pick !!
      </p>
      <div
        className="relative bg-ink"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative h-[420px] sm:h-[560px]">
          {current.image && !imageFailed ? (
            <>
              <img
                src={current.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-60"
              />
              <img
                key={current.image}
                src={current.image}
                alt={current.productName}
                onError={() => setImageFailed(true)}
                className="relative z-10 w-full h-full object-contain carousel-slide-enter"
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-turmeric/10 text-brass/60 text-sm uppercase tracking-wide">
              Add photo: {current.productName}
            </div>
          )}
          {/* Dark gradient so the centered caption stays readable over any photo */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />

          <div key={current.image} className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-10 carousel-caption-enter">
            <h3 className="font-display text-4xl text-cream drop-shadow-md">{current.productName}</h3>
            <p className="text-cream/80 text-sm mt-2 max-w-md">{current.description}</p>
          </div>
        </div>

        {/* Left / right arrows */}
        {featuredProducts.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous product"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-cream/90 text-ink flex items-center justify-center text-2xl font-bold hover:bg-cream transition-colors"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next product"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-cream/90 text-ink flex items-center justify-center text-2xl font-bold hover:bg-cream transition-colors"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Dot indicators for quick jump */}
      {featuredProducts.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {featuredProducts.map((p, i) => (
            <button
              key={p.productName}
              onClick={() => { setImageFailed(false); setIndex(i) }}
              aria-label={`Go to ${p.productName}`}
              className={`w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-pickle' : 'bg-ink/20'}`}
            />
          ))}
        </div>
      )}

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