import { useEffect, useState } from 'react'
import { ArrowRight, Star } from 'lucide-react'
import { cafe } from '../config/cafe'
import { getOpenStatus } from '../utils'

export default function Hero() {
  const [status, setStatus] = useState(() => getOpenStatus(cafe.hours))
  useEffect(() => {
    const t = setInterval(() => setStatus(getOpenStatus(cafe.hours)), 60_000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-10 md:grid-cols-12 md:pb-20 md:pt-14">
      <div className="md:col-span-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="chip -rotate-2 bg-citrus">A little joy in every cup</span>
          <span className="inline-flex items-center gap-2 text-sm font-extrabold text-ink/70">
            <span className={`size-2.5 rounded-full ${status.open ? 'bg-teal' : 'bg-berry'}`} /> {status.label}
          </span>
        </div>
        <h1 className="mt-5 font-display text-[clamp(3.4rem,13vw,6.25rem)] font-black leading-[0.9]">
          Big coffee.
          <br />
          <span className="text-berry">Bigger moods.</span>
        </h1>
        <p className="mt-5 max-w-md text-lg font-semibold text-ink/70">
          Small-batch roasts, loud pastries, and a corner that feels like a hug. Find your happy little something.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#/menu" className="btn btn-pop btn-berry h-14 px-7 text-lg">Browse the menu <ArrowRight size={20} strokeWidth={3} /></a>
          <a href="#/order" className="btn btn-pop btn-light h-14 px-7 text-lg">See your cart</a>
        </div>
      </div>

      <div className="relative md:col-span-6">
        <img
          src="/images/bb-cafe-hero.jpg"
          alt="Colourful lattes, iced drinks and croissants on a pink café table"
          width="1200"
          height="1008"
          fetchPriority="high"
          className="aspect-[6/5] w-full rounded-[2rem] border-2 border-ink object-cover shadow-pop-lg"
        />
        <div className="absolute -left-3 -top-5 hidden size-24 animate-wiggle place-items-center rounded-full border-2 border-ink bg-citrus text-center font-display text-sm font-black leading-tight shadow-pop-sm sm:grid">
          Baked
          <br />
          fresh
          <br />
          daily
        </div>
        <div className="absolute -bottom-5 right-3 flex items-center gap-2 rounded-2xl border-2 border-ink bg-cream px-3 py-2 shadow-pop-sm sm:right-6">
          <Star size={18} className="fill-citrus text-ink" />
          <span className="text-sm font-black">4.8 <span className="font-bold text-ink/60">· loved by regulars</span></span>
        </div>
      </div>
    </section>
  )
}

const WORDS = ['Coffee', 'Croissants', 'Shakes', 'Good vibes', 'Matcha', 'Lazy afternoons', 'Cheesecake', 'Board games']

export function Marquee() {
  const row = [...WORDS, ...WORDS]
  return (
    <div className="overflow-hidden border-y-2 border-ink bg-berry py-3 text-cream" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap font-display text-2xl font-black">
        {row.concat(row).map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            {w} <span className="text-citrus">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
