import { useEffect, useState } from 'react'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { cafe } from '../config/cafe'
import { useCart } from '../state/CartContext'

const LINKS = [
  ['Home', '#/', ''],
  ['Menu', '#/menu', 'menu'],
  ['Our vibe', '#/vibe', 'vibe'],
  ['Visit', '#/visit', 'visit'],
  ['Your order', '#/order', 'order'],
]

export function Logo({ light = false, className = '' }) {
  return (
    <a href="#/" className={`font-display text-xl font-black whitespace-nowrap sm:text-2xl ${className}`}>
      {cafe.name}
      <span className={light ? 'text-citrus' : 'text-berry'}>.</span>
    </a>
  )
}

export default function Header({ route }) {
  const { count } = useCart()
  const [open, setOpen] = useState(false)

  // close the phone menu whenever the page changes or Esc is pressed
  useEffect(() => setOpen(false), [route.name, route.param])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-7 text-[15px] font-extrabold md:flex">
          {LINKS.map(([label, href, name]) => (
            <a key={label} href={href} aria-current={route.name === name ? 'page' : undefined} className="underline-offset-8 hover:text-berry-deep aria-[current=page]:underline aria-[current=page]:decoration-berry aria-[current=page]:decoration-4">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#/order" aria-label={`View order, ${count} items`} className="btn btn-dark h-10 px-4 text-sm">
            <ShoppingBag size={17} /> <span className="hidden min-[380px]:inline">Cart</span>
            <span className="grid size-5 place-items-center rounded-full bg-citrus text-xs font-black text-ink">{count}</span>
          </a>
          <button type="button" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)} className="btn size-10 bg-cream md:hidden">
            {open ? <X size={18} strokeWidth={3} /> : <Menu size={18} strokeWidth={3} />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="fixed inset-x-0 bottom-0 top-[61px] z-40 animate-rise overflow-y-auto bg-ink px-6 pb-10 pt-8 text-cream md:hidden">
          <ul className="space-y-2">
            {LINKS.map(([label, href], i) => (
              <li key={label}>
                <a href={href} className="block border-b-2 border-cream/15 py-3 font-display text-4xl font-black hover:text-citrus">
                  <span className="mr-3 align-middle font-body text-sm font-extrabold text-berry">0{i + 1}</span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm font-bold text-cream/60">{cafe.tagline}</p>
        </nav>
      )}
    </header>
  )
}
