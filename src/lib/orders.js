// The one place an order "leaves" the app.
//
// Demo mode: the order is only saved on this device, and the guest can tap "Send on WhatsApp"
// to message the café themselves (free, no backend). To connect a real kitchen later (Telegram bot,
// Google Sheet, Supabase…), replace the body of submitOrder(). Nothing else needs to change.

import { cafe } from '../config/cafe'
import { formatPrice } from '../utils'

const KEY = 'bb:orders'

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? []
  } catch {
    return []
  }
}

/**
 * @param {{ mode: 'dine'|'takeaway', table: number|null, name: string, phone: string, note: string,
 *           subtotal: number, discount: number, couponCode: string|null, tax: number, total: number,
 *           items: { name: string, qty: number, price: number }[] }} draft
 */
export async function submitOrder(draft) {
  await new Promise((resolve) => setTimeout(resolve, 700)) // stands in for the network round-trip
  const orders = read()
  const order = { ...draft, id: 1001 + orders.length, createdAt: new Date().toISOString() }
  try {
    localStorage.setItem(KEY, JSON.stringify([...orders, order]))
  } catch {
    /* storage can be blocked (private mode): the order still succeeds on screen */
  }
  return order
}

// The text the guest's own WhatsApp opens with. wa.me links are free and need no account or API.
export function whatsappOrderUrl(order) {
  const money = (n) => formatPrice(cafe.currency, n)
  const lines = [
    `*New order #${order.id} · ${cafe.name}*`,
    order.mode === 'dine' ? `Dine-in · Table ${order.table}` : 'Takeaway',
    `Name: ${order.name}${order.phone ? ` (${order.phone})` : ''}`,
    '',
    ...order.items.map((i) => `${i.qty} × ${i.name} — ${money(i.qty * i.price)}`),
    '',
    order.note ? `Note: ${order.note}\n` : '',
    `Subtotal: ${money(order.subtotal)}`,
    order.discount ? `Discount (${order.couponCode}): −${money(order.discount)}` : '',
    `${cafe.taxLabel}: ${money(order.tax)}`,
    `*Total: ${money(order.total)}*`,
    'Paying at the counter.',
  ]
  const text = lines.filter((l, i) => l !== '' || lines[i - 1] !== '').join('\n')
  return `https://wa.me/${cafe.whatsapp}?text=${encodeURIComponent(text)}`
}

export const chatUrl = (text = 'Hi! I have a question.') => `https://wa.me/${cafe.whatsapp}?text=${encodeURIComponent(text)}`
