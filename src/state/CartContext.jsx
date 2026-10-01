import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { itemById } from '../data/menu'
import { cafe } from '../config/cafe'
import { roundMoney } from '../utils'

const KEY = 'bb:cart'
const MAX_QTY = 20

const load = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY)) ?? {}
    return Object.fromEntries(Object.entries(saved).filter(([id]) => itemById.has(id)))
  } catch {
    return {}
  }
}

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [qtys, setQtys] = useState(load) // { [itemId]: quantity }
  const [couponCode, setCouponCode] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(qtys))
    } catch {
      /* ignore */
    }
  }, [qtys])

  const setQty = useCallback((id, qty) => {
    const q = Math.max(0, Math.min(MAX_QTY, qty))
    setQtys((prev) => {
      const next = { ...prev }
      if (q === 0) delete next[id]
      else next[id] = q
      return next
    })
  }, [])

  const clear = useCallback(() => {
    setQtys({})
    setCouponCode(null)
  }, [])

  const value = useMemo(() => {
    const lines = Object.entries(qtys).map(([id, qty]) => ({ item: itemById.get(id), qty }))
    const subtotal = lines.reduce((n, l) => n + l.qty * l.item.price, 0)

    // A coupon that no longer applies (cart shrank below its minimum) simply stops discounting.
    const coupon = couponCode ? cafe.coupons[couponCode] : null
    const eligible = coupon && subtotal >= coupon.min
    const discount = eligible
      ? Math.min(subtotal, coupon.type === 'percent' ? roundMoney((subtotal * coupon.value) / 100) : coupon.value)
      : 0
    const tax = roundMoney((subtotal - discount) * cafe.taxRate)

    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal,
      couponCode: eligible ? couponCode : null,
      couponShortfall: coupon && !eligible ? coupon.min - subtotal : 0,
      discount,
      tax,
      total: roundMoney(subtotal - discount + tax),
      qtyOf: (id) => qtys[id] ?? 0,
      setQty,
      setCouponCode,
      clear,
    }
  }, [qtys, couponCode, setQty, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
