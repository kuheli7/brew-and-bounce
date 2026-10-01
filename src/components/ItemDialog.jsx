import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { cafe } from '../config/cafe'
import { formatPrice, percentOff } from '../utils'
import { AddButton, DietMark } from './Brand'

const DIET_TEXT = { veg: 'Vegetarian', egg: 'Contains egg', nonveg: 'Non-vegetarian' }

// Bottom sheet on phones, centred card on larger screens
export default function ItemDialog({ item, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!item) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={item.name}>
      <button type="button" aria-label="Close" tabIndex={-1} onClick={onClose} className="absolute inset-0 cursor-default bg-ink/60 backdrop-blur-[2px]" />
      <div className="relative max-h-[92dvh] w-full max-w-lg animate-rise overflow-y-auto rounded-t-[2rem] border-2 border-ink bg-cream shadow-pop-lg sm:rounded-[2rem]">
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close details" className="btn absolute right-3 top-3 z-10 size-10 bg-cream text-ink">
          <X size={18} strokeWidth={3} />
        </button>
        <img src={item.image} alt={item.name} className="aspect-[4/3] w-full rounded-t-[1.9rem] object-cover sm:rounded-t-[1.9rem]" />
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2 text-sm font-extrabold text-ink/70">
            <DietMark diet={item.diet} /> {DIET_TEXT[item.diet]} · {item.category} · ready in {item.time}
          </div>
          <div className="mt-2 flex items-start justify-between gap-4">
            <h2 className="font-display text-3xl font-black leading-tight">{item.name}</h2>
            <p className="text-right text-2xl font-black text-berry-deep">
              {formatPrice(cafe.currency, item.price)}
              {item.was && (
                <span className="block text-sm font-bold text-ink/40">
                  <s>{formatPrice(cafe.currency, item.was)}</s> · {percentOff(item.was, item.price)}% off
                </span>
              )}
            </p>
          </div>
          <p className="mt-3 text-lg font-semibold text-ink/70">{item.desc}</p>
          <p className="mt-1 text-sm font-semibold text-ink/50">Price before {cafe.taxLabel}.</p>
          <AddButton item={item} className="mt-5 h-12 w-full text-base" />
        </div>
      </div>
    </div>
  )
}
