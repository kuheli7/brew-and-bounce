import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { menu, allItems } from '../data/menu'
import ItemCard from './ItemCard'

// Take the first item from each category, then the second, and so on, so "All" feels varied
const mixed = (() => {
  const out = []
  const max = Math.max(...menu.map((c) => c.items.length))
  for (let i = 0; i < max; i++) menu.forEach((c) => c.items[i] && out.push(c.items[i]))
  return out
})()

// The dark "Pick your category" band from the mock. A taste of the menu on the home page.
export default function MenuBand({ onOpen }) {
  const [cat, setCat] = useState('all')
  const items = (cat === 'all' ? mixed.slice(0, 8) : allItems.filter((i) => i.categoryId === cat)).slice(0, 8)

  return (
    <section id="menu-preview" className="bg-ink py-14 text-cream md:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="chip rotate-1 bg-teal">The good stuff</span>
            <h2 className="mt-3 font-display text-[clamp(2.25rem,7vw,3.75rem)] font-black leading-none">Pick your category</h2>
          </div>
          <p className="max-w-xs font-semibold text-cream/60">A little of this, a little of that. Tap a card for the details.</p>
        </div>

        <div role="group" aria-label="Menu categories" className="no-scrollbar -mx-5 mb-8 flex gap-3 overflow-x-auto px-5 pb-1">
          {[{ id: 'all', name: 'All' }, ...menu].map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={cat === c.id}
              onClick={() => setCat(c.id)}
              className={`btn h-11 shrink-0 border-cream/25 px-5 text-base ${cat === c.id ? 'border-citrus bg-citrus text-ink' : 'bg-cream/10 text-cream hover:bg-cream/20'}`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} onOpen={onOpen} tone="dark" />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href={cat === 'all' ? '#/menu' : `#/menu/${cat}`} className="btn btn-pop btn-citrus h-14 px-8 text-lg">
            See the full menu <ArrowRight size={20} strokeWidth={3} />
          </a>
        </div>
      </div>
    </section>
  )
}
