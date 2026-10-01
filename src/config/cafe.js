// Everything that is specific to ONE café lives here (plus src/data/menu.js and public/images).
// To reuse this site for another shop: edit this file, the menu, the photos, and the colours in src/index.css.
// The numbers, address and reviews below are PLACEHOLDERS for the demo.

export const cafe = {
  name: 'Brew & Bounce',
  tagline: 'Big coffee. Bigger moods.',
  currency: '₹',

  taxRate: 0.05, // 5% GST, added at checkout. Menu prices are before tax.
  taxLabel: 'GST',
  tables: 8,

  // Demo mode: orders are saved on the guest's device only. Nothing is sent to the shop automatically.
  demoMode: true,
  demoBanner: 'Demo website · menu, prices and orders are for show',

  phone: '+919999999999', // Call button
  whatsapp: '919999999999', // country code + number, no "+" or spaces
  whatsappOrders: true, // "Send on WhatsApp" button: opens the guest's WhatsApp with the order typed out
  instagram: 'brewandbounce.demo',

  address: '24, Garden Street, Indiranagar, Bengaluru 560038',
  mapQuery: 'Indiranagar, Bengaluru',

  // 0 = Sunday … 6 = Saturday. 24h "HH:MM". null = closed.
  hours: {
    0: ['09:00', '22:00'],
    1: ['08:00', '22:00'],
    2: ['08:00', '22:00'],
    3: ['08:00', '22:00'],
    4: ['08:00', '22:00'],
    5: ['08:00', '23:00'],
    6: ['08:00', '23:00'],
  },

  // Demo coupon codes. type: 'percent' | 'flat'. min = minimum subtotal.
  coupons: {
    BOUNCE10: { type: 'percent', value: 10, min: 0, label: '10% off your order' },
    FIRSTSIP: { type: 'flat', value: 50, min: 300, label: '₹50 off orders above ₹300' },
  },
}
