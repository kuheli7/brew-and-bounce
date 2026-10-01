import { useEffect, useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { menu } from '../data/menu'
import ItemCard from './ItemCard'

const DIETS = [
  ['all', 'All'],
  ['veg', 'Veg'],
  ['egg', 'Egg'],
  ['nonveg', 'Non-veg'],
]

export default function MenuPage({ onOpen }) {
  const [diet, setDiet] = useState('all')
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(menu[0].id)

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase()
    return menu
      .map((c) => ({
        ...c,
        items: c.items.filter((i) => (diet === 'all' || i.diet === diet) && (!q || `${i.name} ${i.desc}`.toLowerCase().includes(q))),
      }))
      .filter((c) => c.items.length)
  }, [diet, query])

  // highlight the pill for whichever section is under the reader's eye
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.dataset.cat)), {
      rootMargin: '-30% 0px -60% 0px',
    })
    document.querySelectorAll('[data-cat]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sections])

  const jump = (id) => document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-6 pt-10">
        <span className="chip -rotate-1 bg-teal">The whole menu</span>
        <h1 className="mt-3 font-display text-[clamp(2.75rem,10vw,5rem)] font-black leading-[0.95]">
          Pick your <span className="text-berry">poison.</span>
        </h1>
        <p className="mt-3 max-w-lg text-lg font-semibold text-ink/70">Prices are before GST, which is added when you order. Tap a card for details.</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
            <label className="relative min-w-0 flex-1 basis-48">
              <span className="sr-only">Search the menu</span>
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/50" />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search cappuccino, cake…" className="field !rounded-full !py-2 pl-11" />
            </label>
            <div role="group" aria-label="Diet filter" className="flex gap-1.5">
              {DIETS.map(([id, label]) => (
                <button key={id} type="button" aria-pressed={diet === id} onClick={() => setDiet(id)} className={`btn h-10 px-3.5 text-sm ${diet === id ? 'bg-ink text-cream' : 'bg-paper'}`}>
                  {label}
                </button>
              ))}
            </div>
        </div>
      </section>

      {sections.length > 0 && <div className="sticky top-[61px] z-30 border-y-2 border-ink bg-cream/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-5 py-3">
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
            {sections.map((c) => (
              <button key={c.id} type="button" onClick={() => jump(c.id)} aria-current={active === c.id} className={`btn h-10 shrink-0 px-4 text-sm ${active === c.id ? 'bg-citrus' : 'bg-paper'}`}>
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>}

      <div className="mx-auto max-w-6xl px-5 pb-10">
        {sections.length === 0 && (
          <div className="mt-10 rounded-3xl border-2 border-dashed border-ink/30 bg-paper p-10 text-center">
            <p className="font-display text-2xl font-black">Nothing matches that.</p>
            <p className="mt-1 font-semibold text-ink/60">Try a different word or filter.</p>
            <button type="button" onClick={() => { setQuery(''); setDiet('all') }} className="btn btn-dark mt-5 h-11 px-5 text-sm">
              <X size={16} /> Clear filters
            </button>
          </div>
        )}
        {sections.map((c) => (
          <section key={c.id} id={`cat-${c.id}`} data-cat={c.id} className="scroll-mt-32 pt-10">
            <div className="mb-5 flex flex-wrap items-baseline gap-x-4">
              <h2 className="font-display text-4xl font-black">{c.name}</h2>
              <p className="font-semibold text-ink/60">{c.blurb}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {c.items.map((item) => (
                <ItemCard key={item.id} item={item} onOpen={onOpen} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
