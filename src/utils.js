export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export const formatTime = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  const hour = h % 12 || 12
  return m ? `${hour}:${String(m).padStart(2, '0')} ${suffix}` : `${hour} ${suffix}`
}

// { open: boolean, label: string } for the café's current status
export function getOpenStatus(hours, now = new Date()) {
  const today = hours[now.getDay()]
  const minutes = now.getHours() * 60 + now.getMinutes()

  if (today) {
    const [open, close] = today.map(toMinutes)
    if (minutes >= open && minutes < close) return { open: true, label: `Open now · until ${formatTime(today[1])}` }
    if (minutes < open) return { open: false, label: `Closed · opens ${formatTime(today[0])}` }
  }

  for (let i = 1; i <= 7; i++) {
    const next = hours[(now.getDay() + i) % 7]
    if (next) {
      const when = i === 1 ? formatTime(next[0]) : `${DAYS[(now.getDay() + i) % 7].slice(0, 3)} ${formatTime(next[0])}`
      return { open: false, label: `Closed · opens ${when}` }
    }
  }
  return { open: false, label: 'Closed' }
}

export const roundMoney = (n) => Math.round(n * 100) / 100

// ₹170 for whole rupees, ₹273.50 once tax makes it fractional
export const formatPrice = (currency, n) => `${currency}${Number.isInteger(n) ? n : n.toFixed(2)}`

export const percentOff = (was, price) => Math.round(((was - price) / was) * 100)
