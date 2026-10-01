import { Clock } from 'lucide-react'
import { cafe } from '../config/cafe'
import { formatPrice, percentOff } from '../utils'
import { AddButton, DietMark } from './Brand'

const TAG_STYLE = {
  Bestseller: 'bg-berry text-cream',
  New: 'bg-teal text-ink',
  "Chef's pick": 'bg-grape text-ink',
}

// tone: 'dark' when the card sits on the espresso band, 'light' on cream
export default function ItemCard({ item, onOpen, tone = 'light' }) {
  return (
    <article
      className={`flex flex-col rounded-3xl p-3 text-ink sm:p-4 ${
        tone === 'dark' ? 'bg-cream' : 'border-2 border-ink bg-paper shadow-pop-sm'
      }`}
    >
      <button type="button" onClick={() => onOpen(item)} aria-label={`${item.name}, view details`} className="group relative block overflow-hidden rounded-2xl text-left">
        <img
          src={item.image}
          alt=""
          loading="lazy"
          width="480"
          height="480"
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <DietMark diet={item.diet} className="absolute left-2 top-2" />
        <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-cream/95 px-2 py-1 text-[11px] font-extrabold">
          <Clock size={12} strokeWidth={3} /> {item.time}
        </span>
        <div className="absolute inset-x-2 bottom-2 flex flex-wrap items-end gap-1">
          {item.tag && <span className={`-rotate-2 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-black uppercase tracking-wide ${TAG_STYLE[item.tag]}`}>{item.tag}</span>}
          {item.was && <span className="whitespace-nowrap rounded-md bg-teal px-1.5 py-0.5 text-[11px] font-black">{percentOff(item.was, item.price)}% OFF</span>}
        </div>
      </button>

      <div className="mt-3 flex items-start justify-between gap-2">
        <h3 className="font-display text-base font-black leading-tight sm:text-lg">{item.name}</h3>
        <p className="shrink-0 text-right font-black text-berry-deep">
          {formatPrice(cafe.currency, item.price)}
          {item.was && <span className="block text-xs font-bold text-ink/40 line-through">{formatPrice(cafe.currency, item.was)}</span>}
        </p>
      </div>
      <p className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold text-ink/65">{item.desc}</p>
      <AddButton item={item} className="mt-3 w-full" />
    </article>
  )
}
