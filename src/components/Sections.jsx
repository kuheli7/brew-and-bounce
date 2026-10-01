import { useEffect, useState } from 'react'
import { BookOpen, Dices, Laptop, MapPin, Music, Phone, Star } from 'lucide-react'
import { cafe } from '../config/cafe'
import { DAYS, formatTime, getOpenStatus } from '../utils'
import { chatUrl } from '../lib/orders'
import { InstagramIcon, WhatsAppIcon } from './Brand'

const VIBES = [
  { icon: Laptop, title: 'Work-friendly', text: 'Fast Wi-Fi and a plug at every other seat. Stay as long as your laptop does.', bg: 'bg-grape' },
  { icon: Dices, title: 'Games shelf', text: 'Uno, Jenga, chess. Ask at the counter, no deposit needed.', bg: 'bg-teal' },
  { icon: Music, title: 'Saturday jams', text: 'Open mic from 6 pm. Sign up on a napkin, we are not strict.', bg: 'bg-citrus' },
  { icon: BookOpen, title: 'Quiet corner', text: 'A shelf of paperbacks and the comfiest chair in the building.', bg: 'bg-berry' },
]

export function Vibe() {
  return (
    <section id="vibe" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14 md:py-20">
      <div className="grid items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <span className="chip -rotate-1 bg-grape">Our vibe</span>
          <h2 className="mt-3 font-display text-[clamp(2.25rem,7vw,3.75rem)] font-black leading-none">
            Bounce in. <span className="text-berry">Stay a while.</span>
          </h2>
          <p className="mt-4 text-lg font-semibold text-ink/70">
            We started Brew &amp; Bounce for people who want a good cup and a good mood in the same place. Come alone, come loud, come with a deadline.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {VIBES.map(({ icon: Icon, title, text, bg }) => (
              <div key={title} className="rounded-2xl border-2 border-ink bg-paper p-4 shadow-pop-sm">
                <span className={`mb-3 grid size-10 place-items-center rounded-xl border-2 border-ink ${bg} ${bg === 'bg-berry' ? 'text-cream' : 'text-ink'}`}>
                  <Icon size={20} strokeWidth={2.5} />
                </span>
                <h3 className="font-display text-lg font-black leading-tight">{title}</h3>
                <p className="mt-1 text-sm font-semibold text-ink/65">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative md:col-span-7">
          <img src="/images/interior-1.jpg" alt="Inside the café, warm light and wooden tables" loading="lazy" width="900" height="700" className="aspect-[5/4] w-[78%] -rotate-2 rounded-3xl border-2 border-ink object-cover shadow-pop" />
          <img src="/images/interior-2.jpg" alt="A cosy seat by the café window" loading="lazy" width="700" height="800" className="absolute -bottom-6 right-0 aspect-[4/5] w-[44%] rotate-3 rounded-3xl border-2 border-ink object-cover shadow-pop" />
          <span className="chip absolute -top-3 right-[18%] rotate-3 border-2 border-ink bg-citrus">Open late on weekends</span>
        </div>
      </div>
    </section>
  )
}

const REVIEWS = [
  { name: 'Ananya R.', role: 'Regular', text: 'The hazelnut flat white is dangerous. I came for one and stayed for four hours and a croissant.', bg: 'bg-cream' },
  { name: 'Rohan M.', role: 'Works from here', text: 'Wi-Fi is quick, staff never rush you, and the cheesecake is unreal. My new office.', bg: 'bg-cream' },
  { name: 'Meera S.', role: 'Weekend brunch', text: 'Happiest-looking café in the area. The strawberry shake tastes like actual strawberries.', bg: 'bg-cream' },
]

export function Reviews() {
  return (
    <section className="border-y-2 border-ink bg-citrus py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-[clamp(2.25rem,7vw,3.75rem)] font-black leading-none">Kind words</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <figure key={r.name} className={`rounded-3xl border-2 border-ink ${r.bg} p-6 shadow-pop ${i === 1 ? 'md:-rotate-1' : i === 2 ? 'md:rotate-1' : ''}`}>
              <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, k) => (
                  <Star key={k} size={18} className="fill-berry text-berry" />
                ))}
              </div>
              <blockquote className="mt-3 text-lg font-bold leading-snug">“{r.text}”</blockquote>
              <figcaption className="mt-4 text-sm font-extrabold text-ink/60">{r.name} · {r.role}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-sm font-bold text-ink/60">Sample reviews for this demo.</p>
      </div>
    </section>
  )
}

export function Visit() {
  const [status, setStatus] = useState(() => getOpenStatus(cafe.hours))
  useEffect(() => {
    const t = setInterval(() => setStatus(getOpenStatus(cafe.hours)), 60_000)
    return () => clearInterval(t)
  }, [])
  const today = new Date().getDay()
  const order = [1, 2, 3, 4, 5, 6, 0]

  return (
    <section id="visit" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14 md:py-20">
      <span className="chip rotate-1 bg-teal">Come say hi</span>
      <h2 className="mt-3 font-display text-[clamp(2.25rem,7vw,3.75rem)] font-black leading-none">Find us</h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <div className="rounded-3xl border-2 border-ink bg-paper p-6 shadow-pop">
            <p className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-black ${status.open ? 'bg-teal/30' : 'bg-berry/20'}`}>
              <span className={`size-2.5 rounded-full ${status.open ? 'bg-teal' : 'bg-berry'}`} /> {status.label}
            </p>
            <ul className="mt-4 divide-y-2 divide-dashed divide-ink/15">
              {order.map((d) => (
                <li key={d} className={`flex justify-between py-2 font-bold ${d === today ? 'font-black text-berry-deep' : ''}`}>
                  <span>{DAYS[d]}{d === today && ' (today)'}</span>
                  <span>{cafe.hours[d] ? `${formatTime(cafe.hours[d][0])} – ${formatTime(cafe.hours[d][1])}` : 'Closed'}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border-2 border-ink bg-paper p-6 shadow-pop">
            <p className="flex gap-3 text-lg font-bold"><MapPin className="mt-1 shrink-0 text-berry" /> {cafe.address}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={`tel:${cafe.phone}`} className="btn btn-pop btn-dark h-11 px-5 text-sm"><Phone size={16} /> Call</a>
              {cafe.whatsappOrders && <a href={chatUrl()} target="_blank" rel="noreferrer" className="btn btn-pop btn-citrus h-11 px-5 text-sm"><WhatsAppIcon size={16} /> WhatsApp</a>}
              <a href={`https://instagram.com/${cafe.instagram}`} target="_blank" rel="noreferrer" className="btn btn-pop btn-light h-11 px-5 text-sm"><InstagramIcon size={16} /> Instagram</a>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border-2 border-ink bg-sand shadow-pop">
          <iframe
            title={`Map showing ${cafe.name}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(cafe.mapQuery)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-72 w-full"
          />
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="bg-berry py-10 text-cream">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5">
        <p className="font-display text-2xl font-black">
          {cafe.name}
          <span className="text-citrus">.</span>
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-5 text-sm font-extrabold">
          <a href="#/menu" className="hover:underline">Menu</a>
          <a href="#/vibe" className="hover:underline">Our vibe</a>
          <a href="#/visit" className="hover:underline">Visit</a>
          <a href="#/order" className="hover:underline">Your order</a>
        </nav>
        <p className="w-full text-sm font-semibold text-cream/85 md:w-auto">A happy little café concept{cafe.demoMode ? ' · Demo website' : ''}</p>
      </div>
    </footer>
  )
}
