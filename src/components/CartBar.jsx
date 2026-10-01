import { ShoppingBag } from 'lucide-react'
import { cafe } from '../config/cafe'
import { useCart } from '../state/CartContext'
import { formatPrice } from '../utils'

// Floating "view order" bar, like a delivery app. Hidden while the cart is empty.
export default function CartBar() {
  const { count, subtotal } = useCart()
  if (!count) return null
  return (
    <div className="fixed inset-x-3 bottom-3 z-30 mx-auto max-w-xl animate-rise">
      <a href="#/order" className="flex items-center justify-between gap-3 rounded-full border-2 border-ink bg-ink p-2 pl-5 text-cream shadow-pop">
        <span className="flex items-center gap-3">
          <ShoppingBag size={20} />
          <span className="font-extrabold">
            {count} {count === 1 ? 'item' : 'items'}
            <span className="mx-2 text-cream/40">·</span>
            {formatPrice(cafe.currency, subtotal)}
          </span>
        </span>
        <span className="rounded-full bg-berry px-5 py-2.5 font-black">View order →</span>
      </a>
    </div>
  )
}
