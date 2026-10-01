import { useEffect, useState } from 'react'

// Tiny hash router so the site hosts on any free static host with no server rules.
//   #/            home          #/menu          full menu       #/menu/coffee   menu, scrolled to Coffee
//   #/order       your order    #/vibe, #/visit home, scrolled to that section
const parse = () => {
  const [path] = window.location.hash.replace(/^#\/?/, '').split('?')
  const [name = '', param = ''] = path.split('/')
  return { name, param }
}

export function useRoute() {
  const [route, setRoute] = useState(parse)
  useEffect(() => {
    const onChange = () => setRoute(parse())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

// QR codes on tables can link to /?table=4 (or /#/?table=4). Returns that number, or null.
export function tableFromUrl(max) {
  const fromSearch = new URLSearchParams(window.location.search).get('table')
  const fromHash = new URLSearchParams(window.location.hash.split('?')[1] ?? '').get('table')
  const n = Number(fromSearch ?? fromHash)
  return Number.isInteger(n) && n >= 1 && n <= max ? n : null
}
