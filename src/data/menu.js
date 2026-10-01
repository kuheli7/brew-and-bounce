// Menu data. Edit freely — the layout updates itself. Prices are in ₹, before GST.
//   diet:  'veg' | 'egg' | 'nonveg'
//   tag:   'Bestseller' | 'New' | "Chef's pick"           (optional)
//   was:   the old price, shown struck through with a "% OFF" chip   (optional)
//   light: true = small item suggested on the order page            (optional)
//   image: file in /public/images

const img = (name) => `/images/${name}.jpg`
const slug = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const raw = [
  {
    name: 'Coffee',
    blurb: 'Small-batch roasts, pulled slow.',
    time: '5–10 min',
    items: [
      { name: 'Hazelnut Flat White', desc: 'Velvety double shot, roasted hazelnut.', price: 190, diet: 'veg', tag: 'Bestseller', image: img('bb-flat-white') },
      { name: 'Cappuccino', desc: 'Equal parts espresso, milk and foam.', price: 170, diet: 'veg', image: img('cappuccino') },
      { name: 'Café Latte', desc: 'Silky steamed milk over a double shot, with latte art.', price: 180, diet: 'veg', image: img('cafe-latte') },
      { name: 'Pour Over', desc: 'Single-origin beans, brewed by hand. Clean and bright.', price: 210, diet: 'veg', image: img('pour') },
      { name: 'Iced Latte', desc: 'Cold milk, lots of ice, slow-pulled espresso.', price: 200, was: 230, diet: 'veg', light: true, image: img('iced-latte') },
      { name: 'Jaggery Cold Brew', desc: '18-hour cold brew with milk, sweetened with jaggery.', price: 220, diet: 'veg', tag: "Chef's pick", image: img('cold-brew') },
    ],
  },
  {
    name: 'Tea & Cold',
    blurb: 'Shakes, matcha and something fizzy.',
    time: '5–10 min',
    items: [
      { name: 'Strawberry Shake', desc: 'Real berries, cold vanilla, thick on top.', price: 220, was: 250, diet: 'veg', tag: 'Bestseller', image: img('bb-strawberry-shake') },
      { name: 'Iced Matcha', desc: 'Earthy matcha, silky milk, lots of ice.', price: 230, diet: 'veg', tag: 'New', light: true, image: img('bb-iced-matcha') },
      { name: 'Masala Chai', desc: 'Ginger, cardamom and strong tea, poured fresh.', price: 90, diet: 'veg', light: true, image: img('chai-a') },
      { name: 'Hot Chocolate', desc: 'Dark chocolate, steamed milk, marshmallows.', price: 200, diet: 'veg', image: img('hot-chocolate') },
      { name: 'Fresh Lime Soda', desc: 'Sweet, salted or mixed. Very cold.', price: 110, diet: 'veg', light: true, image: img('lime-soda') },
    ],
  },
  {
    name: 'Bakery',
    blurb: 'Baked this morning, gone by evening.',
    time: '5 min',
    items: [
      { name: 'Butter Croissant', desc: 'Flaky, glossy, baked fresh for you.', price: 140, diet: 'veg', tag: 'Bestseller', light: true, image: img('bb-croissant') },
      { name: 'Lemon Poppy Cake', desc: 'Soft lemon sponge, tangy frosting.', price: 180, diet: 'egg', image: img('bb-lemon-cake') },
      { name: 'Banana Walnut Loaf', desc: 'Moist and spiced. We toast it if you ask.', price: 150, diet: 'veg', light: true, image: img('banana-loaf') },
      { name: 'Biscoff Cheesecake', desc: 'Creamy cheesecake, biscuit base, caramel drizzle.', price: 250, diet: 'egg', tag: "Chef's pick", image: img('cheesecake') },
      { name: 'Brownie Sundae', desc: 'Warm brownie, vanilla ice cream, fudge sauce.', price: 220, was: 260, diet: 'egg', image: img('brownie') },
    ],
  },
  {
    name: 'Breakfast',
    blurb: 'Served until 12 noon.',
    time: '10–15 min',
    items: [
      { name: 'Avocado Toast', desc: 'Sourdough, chilli, lime, feta crumble.', price: 260, diet: 'veg', tag: 'Bestseller', image: img('bb-avocado-toast') },
      { name: 'Sunny-Side Egg Toast', desc: 'Fried egg on buttered sourdough with avocado.', price: 220, diet: 'egg', image: img('egg-toast') },
      { name: 'Granola Bowl', desc: 'Greek yoghurt, honey granola, blackberries.', price: 230, diet: 'veg', light: true, image: img('granola') },
      { name: 'Full Breakfast Plate', desc: 'Egg, baked beans, grilled tomato, mushrooms and toast.', price: 290, diet: 'egg', image: img('breakfast-plate') },
    ],
  },
  {
    name: 'Lunch & Bites',
    blurb: 'Comfort food for any hour.',
    time: '12–18 min',
    items: [
      { name: 'Grilled Cheese & Soup', desc: 'Golden sourdough, melty cheese, tomato soup.', price: 290, diet: 'veg', tag: 'Bestseller', image: img('bb-grilled-cheese') },
      { name: 'Pesto Farfalle', desc: 'Basil pesto, cherry tomato and parmesan.', price: 290, diet: 'veg', image: img('pasta') },
      { name: 'Grilled Veg Ciabatta', desc: 'Roasted peppers, zucchini and aubergine, pesto spread.', price: 250, diet: 'veg', image: img('paneer-sandwich') },
      { name: 'Chicken Club Sandwich', desc: 'Herb chicken, greens, tomato and garlic mayo.', price: 280, diet: 'nonveg', image: img('chicken-sandwich') },
      { name: 'Crispy Chicken Burger', desc: 'Buttermilk fried chicken, cheddar, pickled onion, brioche bun.', price: 320, diet: 'nonveg', tag: 'New', image: img('crispy-chicken') },
      { name: 'Peri-Peri Fries', desc: 'Crisp fries, peri-peri dust, dip of your choice.', price: 150, was: 180, diet: 'veg', light: true, image: img('fries') },
      { name: 'Buffalo Chicken Wings', desc: 'Six sticky wings in buffalo sauce, cool ranch dip.', price: 310, diet: 'nonveg', image: img('wings') },
      { name: 'Chicken Pepperoni Pizza', desc: 'Stone-baked, mozzarella, spicy chicken pepperoni.', price: 380, diet: 'nonveg', image: img('pizza') },
    ],
  },
]

export const menu = raw.map((c) => ({
  ...c,
  id: slug(c.name),
  items: c.items.map((i) => ({ ...i, id: slug(i.name), category: c.name, categoryId: slug(c.name), time: c.time })),
}))

export const allItems = menu.flatMap((c) => c.items)
export const itemById = new Map(allItems.map((i) => [i.id, i]))

// Photos are from Unsplash (free to use) or AI-generated mock art. Swap them for the shop's own photos for a real client.
