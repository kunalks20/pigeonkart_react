import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// Text shown under the tabs, keyed the same way as the tab state below.
const TAB_CONTENT = {
  namkin: 'Crisp, roasted, and lightly spiced — our namkin is made in small batches ' +
    'the same week it ships, so it never sits around losing its crunch.',
  achar: 'Sun-cured and slow-fermented in mustard oil, the way pickle is supposed to ' +
    'be made — no shortcuts, no preservative shelf-life tricks.'
}

export default function Home() {
  const [tab, setTab] = useState('namkin')

  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-20 grid sm:grid-cols-2 gap-10 items-center">
        <div>
          <p className="uppercase tracking-[0.2em] text-sm text-brass font-semibold mb-3">
            Small-batch • Home-style
          </p>
          <h1 className="font-display text-5xl leading-tight font-700 text-ink">
            Namkin and achar,
            <br /> the way your kitchen makes it.
          </h1>
          <p className="mt-5 text-ink/70 max-w-md">
            PigeonKart brings two shelves from every Indian kitchen — the snack tin and the
            pickle jar — online. Pick a tab, fill your cart, pay by UPI.
          </p>
          <Link
            to="/shop"
            className="inline-block mt-8 bg-pickle text-cream font-semibold px-6 py-3 rounded-md hover:bg-pickle/90 transition-colors"
          >
            Start shopping
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setTab('namkin')}
            className={`jar-tab rounded-lg p-6 text-center font-display text-lg ${tab === 'namkin' ? 'active' : ''}`}
          >
            Namkin
          </button>
          <button
            onClick={() => setTab('achar')}
            className={`jar-tab rounded-lg p-6 text-center font-display text-lg ${tab === 'achar' ? 'active' : ''}`}
          >
            Achar
          </button>
          <div className="col-span-2 border-2 border-dashed border-brass rounded-lg p-6 text-sm text-ink/60">
            {TAB_CONTENT[tab]}
          </div>
        </div>
      </section>
    </div>
  )
}