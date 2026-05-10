import { expect, test } from 'vitest'

// Tasavvur qilamiz, sizda savatdagi summani hisoblaydigan funksiya bor
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0)
}

test('Savatchadagi umumiy summa to‘g‘ri hisoblanishi kerak', () => {
  const cartItems = [
    { id: 1, name: 'Headphone', price: 100, quantity: 2 }, // 200
    { id: 2, name: 'Mouse', price: 50, quantity: 1 }      // 50
  ]
  
  const total = calculateTotal(cartItems)
  
  expect(total).toBe(250) // Natija 250 chiqishini kutamiz
})
