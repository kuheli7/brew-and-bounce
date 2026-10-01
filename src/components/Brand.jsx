import { Minus, Plus } from 'lucide-react'
import { useCart } from '../state/CartContext'

// Brand icons that lucide no longer ships
export const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

export const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.13.56 4.2 1.62 6.03L4 29l8.1-1.58a12 12 0 0 0 3.94.66C22.68 28.08 28 22.68 28 16.04 28 9.4 22.68 3 16.04 3zm0 22.04c-1.2 0-2.37-.32-3.4-.93l-.24-.15-4.8.94.98-4.67-.16-.25a9.97 9.97 0 0 1-1.55-5.3c0-5.5 4.5-9.97 10.05-9.97 5.5 0 9.96 4.47 9.96 9.97 0 5.5-4.46 10.36-9.84 10.36zm5.47-7.46c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.68-1.64-.93-2.25-.24-.58-.5-.5-.68-.5h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.1 3.2 5.1 4.5.72.3 1.28.5 1.7.62.72.23 1.37.2 1.88.12.58-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
  </svg>
)

// The Indian food-labelling mark: a coloured dot inside a square outline
const DIET = {
  veg: { color: '#2e9e4f', label: 'Vegetarian' },
  egg: { color: '#e0a21a', label: 'Contains egg' },
  nonveg: { color: '#b3261e', label: 'Non-vegetarian' },
}

export function DietMark({ diet, className = '' }) {
  const d = DIET[diet]
  return (
    <span
      role="img"
      aria-label={d.label}
      title={d.label}
      className={`grid size-[18px] shrink-0 place-items-center rounded-[4px] border-2 bg-paper ${className}`}
      style={{ borderColor: d.color }}
    >
      <span className="size-2 rounded-full" style={{ background: d.color }} />
    </span>
  )
}

export function Stepper({ item, size = 'md' }) {
  const { qtyOf, setQty } = useCart()
  const qty = qtyOf(item.id)
  const dim = size === 'sm' ? 'size-8' : 'size-10'
  return (
    <div className="flex items-center gap-2">
      <button type="button" aria-label={`Remove one ${item.name}`} onClick={() => setQty(item.id, qty - 1)} className={`btn ${dim} bg-paper text-ink`}>
        <Minus size={16} strokeWidth={3} />
      </button>
      <span className="w-6 text-center text-lg font-black tabular-nums" aria-live="polite">{qty}</span>
      <button type="button" aria-label={`Add one ${item.name}`} onClick={() => setQty(item.id, qty + 1)} className={`btn ${dim} bg-ink text-cream`}>
        <Plus size={16} strokeWidth={3} />
      </button>
    </div>
  )
}

export function AddButton({ item, className = '' }) {
  const { qtyOf, setQty } = useCart()
  const qty = qtyOf(item.id)
  if (qty > 0) {
    return (
      <div className={`flex items-center justify-between rounded-full border-2 border-ink bg-citrus p-1 ${className}`}>
        <button type="button" aria-label={`Remove one ${item.name}`} onClick={() => setQty(item.id, qty - 1)} className="grid size-8 place-items-center rounded-full bg-ink text-cream">
          <Minus size={15} strokeWidth={3} />
        </button>
        <span className="font-black tabular-nums" aria-live="polite">{qty}</span>
        <button type="button" aria-label={`Add one ${item.name}`} onClick={() => setQty(item.id, qty + 1)} className="grid size-8 place-items-center rounded-full bg-ink text-cream">
          <Plus size={15} strokeWidth={3} />
        </button>
      </div>
    )
  }
  return (
    <button type="button" onClick={() => setQty(item.id, 1)} aria-label={`Add ${item.name}`} className={`btn h-10 bg-ink text-sm text-cream hover:bg-berry ${className}`}>
      Add <Plus size={16} strokeWidth={3} />
    </button>
  )
}
