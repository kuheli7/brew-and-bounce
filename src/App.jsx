import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { cafe } from './config/cafe'
import { CartProvider } from './state/CartContext'
import { useRoute } from './lib/router'
import Header from './components/Header'
import Hero, { Marquee } from './components/Hero'
import MenuBand from './components/MenuBand'
import MenuPage from './components/MenuPage'
import OrderPage from './components/OrderPage'
import ItemDialog from './components/ItemDialog'
import CartBar from './components/CartBar'
import { Footer, Reviews, Vibe, Visit } from './components/Sections'

function DemoBanner() {
  const [shown, setShown] = useState(true)
  if (!cafe.demoMode || !cafe.demoBanner || !shown) return null
  return (
    <div className="relative bg-ink px-10 py-2 text-center text-xs font-extrabold text-cream sm:text-sm">
      {cafe.demoBanner}
      <button type="button" aria-label="Dismiss banner" onClick={() => setShown(false)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-cream/70 hover:text-cream">
        <X size={16} />
      </button>
    </div>
  )
}

function Home({ onOpen }) {
  return (
    <>
      <Hero />
      <Marquee />
      <MenuBand onOpen={onOpen} />
      <Vibe />
      <Reviews />
      <Visit />
    </>
  )
}

export default function App() {
  const route = useRoute()
  const [selected, setSelected] = useState(null)

  // Scroll to the right place on every page change
  useEffect(() => {
    const id = route.name === 'menu' && route.param ? `cat-${route.param}` : ['vibe', 'visit'].includes(route.name) ? route.name : null
    const t = setTimeout(() => {
      const el = id && document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      else window.scrollTo({ top: 0, behavior: 'instant' })
    }, 30)
    return () => clearTimeout(t)
  }, [route.name, route.param])

  let page
  if (route.name === 'menu') page = <MenuPage onOpen={setSelected} />
  else if (route.name === 'order') page = <OrderPage />
  else page = <Home onOpen={setSelected} />

  return (
    <CartProvider>
      <DemoBanner />
      <Header route={route} />
      <main>{page}</main>
      {route.name !== 'order' && <div className="h-20" />}
      <Footer />
      <ItemDialog item={selected} onClose={() => setSelected(null)} />
      {route.name !== 'order' && <CartBar />}
    </CartProvider>
  )
}
