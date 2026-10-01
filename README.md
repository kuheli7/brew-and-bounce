# Brew & Bounce: café website + ordering demo

A mobile-first café site (works on desktop too): hero, menu with filters and search, cart, order page, WhatsApp order hand-off,
vibe, reviews, opening hours with a live "Open now", and a map. React 19 + Vite + Tailwind CSS 4. No backend, so it hosts for free.

Look and feel come from the Brew & Bounce mock (cream / espresso / berry / citrus / teal / grape, Fraunces + Nunito, hard offset shadows).
The order page borrows its structure from a delivery-style menu: floating cart bar, veg / egg / non-veg marks, offers, coupon, tax breakdown.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs /dist
```

## How an order reaches the shop (free, no backend)

Tapping **Place order** saves the order on the guest's device and opens WhatsApp to the shop's number with the whole order typed out.
The guest only presses Send. This uses a free `wa.me` link: no account, API or fees. A text message cannot carry an attached PDF or image.

Want it automatic? Later options, all free to start: a Telegram bot through a Netlify function, a Google Sheet through Apps Script,
or a live kitchen screen with Supabase / Firebase. Only `submitOrder()` in `src/lib/orders.js` needs to change.

## Reuse for another shop (about an hour)

1. `src/config/cafe.js`: name, phone, WhatsApp number, address, map, hours, tables, tax, coupons, demo banner
2. `src/data/menu.js`: categories, items, prices (₹), veg / egg / non-veg, tags, old prices
3. `public/images`: swap the photos (keep names or edit the `image` paths)
4. `src/index.css`: colours and fonts live in the `@theme` block at the top
5. `src/components/Sections.jsx`: the vibe and reviews copy (**sample text, replace with the real shop's**)

Set `demoMode: false` and `whatsappOrders: true/false` in `cafe.js` to hide the demo banner or switch the WhatsApp step off.

## Table QR codes

Link each table's QR code to `https://your-site/?table=4`; the order page will pre-select that table.

## Deploy

Netlify or Vercel, both free. Build command `npm run build`, publish directory `dist`.

## Notes

- Prices are shown before GST; 5% is added at checkout.
- Demo coupons: `BOUNCE10` (10% off), `FIRSTSIP` (₹50 off above ₹300).
- Photos: Unsplash (free to use) and the mock's artwork. Use the shop's own photos for a real client.
- Phone numbers, address, reviews and the 4.8 rating are placeholders.
