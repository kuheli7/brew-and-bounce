import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Clock, Ban, ShoppingBag, Ticket, Trash2, X } from 'lucide-react'
import { cafe } from '../config/cafe'
import { allItems } from '../data/menu'
import { useCart } from '../state/CartContext'
import { tableFromUrl } from '../lib/router'
import { submitOrder, whatsappOrderUrl } from '../lib/orders'
import { formatPrice } from '../utils'
import { AddButton, DietMark, Stepper, WhatsAppIcon } from './Brand'

const money = (n) => formatPrice(cafe.currency, n)

export default function OrderPage() {
  const cart = useCart()
  const [placed, setPlaced] = useState(null)
  const [mode, setMode] = useState('dine')
  const [table, setTable] = useState(() => tableFromUrl(cafe.tables))
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const [code, setCode] = useState('')
  const [couponMsg, setCouponMsg] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (placed) return <Confirmation order={placed} />

  const suggestions = allItems.filter((i) => i.light && !cart.qtyOf(i.id)).slice(0, 4)

  function applyCoupon(e) {
    e.preventDefault()
    const c = code.trim().toUpperCase()
    const coupon = cafe.coupons[c]
    if (!coupon) return setCouponMsg({ ok: false, text: 'That code is not valid.' })
    cart.setCouponCode(c)
    setCouponMsg(
      cart.subtotal >= coupon.min
        ? { ok: true, text: `${c} applied: ${coupon.label}` }
        : { ok: false, text: `Add ${money(coupon.min - cart.subtotal)} more to use ${c}.` },
    )
    setCode('')
  }

  async function placeOrder(e) {
    e.preventDefault()
    if (!name.trim()) return setError('Please tell us your name so we can call it out.')
    if (mode === 'dine' && !table) return setError('Pick your table number, or switch to Takeaway.')
    setError('')
    setBusy(true)

    // Open the tab now, while the tap still counts as a user action. Browsers block pop-ups opened after an await.
    const waTab = cafe.whatsappOrders ? window.open('', '_blank') : null

    const order = await submitOrder({
      mode,
      table: mode === 'dine' ? table : null,
      name: name.trim(),
      phone: phone.trim(),
      note: note.trim(),
      subtotal: cart.subtotal,
      discount: cart.discount,
      couponCode: cart.couponCode,
      tax: cart.tax,
      total: cart.total,
      items: cart.lines.map((l) => ({ name: l.item.name, qty: l.qty, price: l.item.price })),
    })
    if (waTab) waTab.location.href = whatsappOrderUrl(order)
    cart.clear()
    setBusy(false)
    setPlaced(order)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 pt-8">
      <a href="#/menu" className="inline-flex items-center gap-2 font-extrabold text-ink/70 hover:text-berry-deep">
        <ArrowLeft size={18} strokeWidth={3} /> Back to the menu
      </a>
      <span className="chip mt-5 block w-fit rotate-1 bg-grape">Your cup</span>
      <h1 className="mt-3 font-display text-[clamp(2.5rem,9vw,4.25rem)] font-black leading-none">What’s in the bag</h1>

      {cart.lines.length === 0 ? (
        <div className="mt-8 rounded-3xl border-2 border-dashed border-ink/30 bg-paper p-10 text-center">
          <ShoppingBag className="mx-auto mb-3 size-10 text-berry" />
          <p className="font-display text-2xl font-black">Your bag is feeling light.</p>
          <p className="mt-1 font-semibold text-ink/60">Pick something delicious from the menu.</p>
          <a href="#/menu" className="btn btn-pop btn-dark mt-6 h-12 px-6">Explore the menu</a>
        </div>
      ) : (
        <form onSubmit={placeOrder} noValidate className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="min-w-0 space-y-6 lg:col-span-7">
            {/* dine-in or takeaway */}
            <fieldset className="rounded-3xl border-2 border-ink bg-paper p-5">
              <legend className="sr-only">How would you like it?</legend>
              <div className="grid grid-cols-2 gap-2 rounded-full border-2 border-ink bg-cream p-1">
                {[['dine', 'Dine-in'], ['takeaway', 'Takeaway']].map(([id, label]) => (
                  <button key={id} type="button" aria-pressed={mode === id} onClick={() => setMode(id)} className={`h-10 rounded-full text-sm font-black ${mode === id ? 'bg-ink text-cream' : ''}`}>
                    {label}
                  </button>
                ))}
              </div>
              {mode === 'dine' && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-extrabold text-ink/70">Your table</p>
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: cafe.tables }, (_, i) => i + 1).map((n) => (
                      <button key={n} type="button" aria-pressed={table === n} aria-label={`Table ${n}`} onClick={() => setTable(n)} className={`btn size-11 text-base ${table === n ? 'bg-citrus' : 'bg-cream'}`}>
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </fieldset>

            {/* items */}
            <ul className="space-y-3">
              {cart.lines.map(({ item, qty }) => (
                <li key={item.id} className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-ink bg-paper p-3 sm:flex-nowrap sm:gap-4">
                  <img src={item.image} alt="" width="64" height="64" className="size-16 shrink-0 rounded-xl object-cover" />
                  <div className="min-w-0 basis-[calc(100%-4.75rem)] sm:flex-1 sm:basis-0">
                    <p className="flex items-center gap-2 font-display text-lg font-black leading-tight"><DietMark diet={item.diet} /> {item.name}</p>
                    <p className="text-sm font-bold text-ink/55">{money(item.price)} each</p>
                  </div>
                  <Stepper item={item} size="sm" />
                  <span className="ml-auto w-16 text-right font-black sm:ml-0">{money(item.price * qty)}</span>
                  <button type="button" aria-label={`Remove ${item.name}`} onClick={() => cart.setQty(item.id, 0)} className="grid size-8 place-items-center rounded-full text-ink/50 hover:bg-berry/15 hover:text-berry-deep">
                    <Trash2 size={17} />
                  </button>
                </li>
              ))}
            </ul>

            <label className="block">
              <span className="mb-2 block font-extrabold">Anything we should know?</span>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} maxLength={200} placeholder="Less sugar, oat milk, extra napkins…" className="field resize-none" />
            </label>

            {suggestions.length > 0 && (
              <div>
                <h2 className="mb-3 font-display text-2xl font-black">You might also like</h2>
                <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-2">
                  {suggestions.map((item) => (
                    <div key={item.id} className="w-40 shrink-0 rounded-2xl border-2 border-ink bg-paper p-2.5 shadow-pop-sm">
                      <img src={item.image} alt="" loading="lazy" width="150" height="150" className="aspect-square w-full rounded-xl object-cover" />
                      <p className="mt-2 text-sm font-black leading-tight">{item.name}</p>
                      <p className="text-sm font-black text-berry-deep">{money(item.price)}</p>
                      <AddButton item={item} className="mt-2 w-full !h-9" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* who is ordering */}
            <div className="grid gap-4 rounded-3xl border-2 border-ink bg-paper p-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-extrabold">Your name</span>
                <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="So we can call it out" className="field" />
              </label>
              <label className="block">
                <span className="mb-2 block font-extrabold">Phone <span className="font-semibold text-ink/50">(optional)</span></span>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" className="field" />
              </label>
            </div>

            <div className="rounded-3xl border-2 border-ink bg-paper p-5">
              <h2 className="font-display text-xl font-black">Store cancellation policy</h2>
              <p className="mt-2 flex items-center gap-2 font-semibold text-ink/70"><Ban size={18} /> No cancellation fee.</p>
              <p className="mt-1 flex items-center gap-2 font-semibold text-ink/70"><Clock size={18} /> Once the order is accepted it cannot be cancelled.</p>
            </div>
          </div>

          {/* summary */}
          <aside className="min-w-0 lg:col-span-5">
            <div className="space-y-5 rounded-3xl border-2 border-ink bg-citrus p-6 shadow-pop-lg lg:sticky lg:top-24">
              <div>
                <h2 className="flex items-center gap-2 font-display text-2xl font-black"><Ticket size={22} /> Offers &amp; coupons</h2>
                <div className="mt-3 flex gap-2">
                  <input value={code} onChange={(e) => setCode(e.target.value)} aria-label="Coupon code" placeholder="Try BOUNCE10" className="field !py-2.5 uppercase" />
                  <button type="button" onClick={applyCoupon} disabled={!code.trim()} className="btn btn-dark h-12 shrink-0 px-5">Apply</button>
                </div>
                {cart.couponCode && (
                  <p className="mt-2 flex items-center justify-between rounded-xl bg-cream/70 px-3 py-2 text-sm font-black">
                    <span className="flex items-center gap-2"><Check size={16} /> {cart.couponCode} applied</span>
                    <button type="button" aria-label="Remove coupon" onClick={() => { cart.setCouponCode(null); setCouponMsg(null) }}><X size={16} /></button>
                  </p>
                )}
                {(cart.couponShortfall > 0 || (couponMsg && !couponMsg.ok)) && (
                  <p role="status" className="mt-2 text-sm font-extrabold text-berry-deep">
                    {cart.couponShortfall > 0 ? `Add ${money(cart.couponShortfall)} more to use this code.` : couponMsg.text}
                  </p>
                )}
              </div>

              <div className="border-t-2 border-dashed border-ink/30 pt-5">
                <h2 className="font-display text-2xl font-black">Order summary</h2>
                <dl className="mt-4 space-y-2 font-bold">
                  <div className="flex justify-between"><dt>Items ({cart.count})</dt><dd>{money(cart.subtotal)}</dd></div>
                  {cart.discount > 0 && <div className="flex justify-between"><dt>Discount ({cart.couponCode})</dt><dd>−{money(cart.discount)}</dd></div>}
                  <div className="flex justify-between"><dt>{cafe.taxLabel} ({Math.round(cafe.taxRate * 100)}%)</dt><dd>{money(cart.tax)}</dd></div>
                </dl>
                <div className="my-4 border-t-2 border-dashed border-ink/30" />
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-black">Total</span>
                  <span className="font-display text-3xl font-black">{money(cart.total)}</span>
                </div>
              </div>

              {error && <p role="alert" className="rounded-xl border-2 border-ink bg-cream px-3 py-2 text-sm font-extrabold text-berry-deep">{error}</p>}

              <button type="submit" disabled={busy} className="btn btn-pop btn-dark h-14 w-full text-lg">
                {busy ? 'Placing…' : cafe.whatsappOrders ? <>Place order <WhatsAppIcon size={20} /></> : <>Place order <ArrowRight size={20} strokeWidth={3} /></>}
              </button>
              <p className="text-center text-sm font-bold text-ink/65">
                {cafe.whatsappOrders ? 'This opens WhatsApp with your order typed out. Just press Send. ' : ''}
                Pay at the counter.
                {cafe.demoMode && ' Demo only: no real order is sent.'}
              </p>
            </div>
          </aside>
        </form>
      )}
    </div>
  )
}

const STEPS = ['Order received', 'Brewing', 'Ready at the counter']

function Confirmation({ order }) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (step >= STEPS.length - 1) return
    const t = setTimeout(() => setStep((s) => s + 1), 5000)
    return () => clearTimeout(t)
  }, [step])

  return (
    <div className="mx-auto max-w-2xl px-5 pb-20 pt-10 text-center">
      <span className="mx-auto grid size-20 animate-pop place-items-center rounded-full border-2 border-ink bg-teal shadow-pop-sm"><Check size={40} strokeWidth={3.5} /></span>
      <h1 className="mt-6 font-display text-[clamp(2.5rem,9vw,4rem)] font-black leading-none">Looking delicious!</h1>
      <p className="mt-3 text-lg font-bold text-ink/70">
        Thanks, {order.name}. Order <span className="text-berry-deep">#{order.id}</span> · {order.mode === 'dine' ? `Table ${order.table}` : 'Takeaway'}
      </p>

      <ol className="mx-auto mt-8 flex max-w-md items-start justify-between gap-2 text-left">
        {STEPS.map((s, i) => (
          <li key={s} className="flex-1 text-center">
            <span className={`mx-auto mb-2 grid size-10 place-items-center rounded-full border-2 border-ink font-black transition-colors ${i <= step ? 'bg-citrus' : 'bg-paper text-ink/40'}`}>
              {i < step ? <Check size={18} strokeWidth={3.5} /> : i + 1}
            </span>
            <span className={`text-sm font-extrabold ${i <= step ? '' : 'text-ink/40'}`}>{s}</span>
          </li>
        ))}
      </ol>
      {cafe.demoMode && <p className="mt-3 text-xs font-bold text-ink/50">Demo: progress is simulated.</p>}

      <div className="mt-8 rounded-3xl border-2 border-ink bg-paper p-5 text-left shadow-pop">
        <ul className="divide-y-2 divide-dashed divide-ink/15">
          {order.items.map((i) => (
            <li key={i.name} className="flex justify-between py-2 font-bold"><span>{i.qty} × {i.name}</span><span>{money(i.qty * i.price)}</span></li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t-2 border-ink pt-3 font-display text-xl font-black"><span>Total (incl. {cafe.taxLabel})</span><span>{money(order.total)}</span></div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {cafe.whatsappOrders && (
          <a href={whatsappOrderUrl(order)} target="_blank" rel="noreferrer" className="btn btn-pop btn-citrus h-14 px-7 text-lg">
            <WhatsAppIcon size={20} /> Send on WhatsApp again
          </a>
        )}
        <a href="#/menu" className="btn btn-pop btn-dark h-14 px-7 text-lg">Order something else</a>
      </div>
      <p className="mt-4 text-sm font-bold text-ink/60">
        {cafe.whatsappOrders ? 'Didn’t see WhatsApp open? Use the button above, then press Send. ' : ''}
        Please pay at the counter.
      </p>
    </div>
  )
}
