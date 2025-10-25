import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('cart_items') || '[]');
      setItems(saved);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
  const clear = () => setItems([]);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const value = useMemo(() => ({ items, addItem, removeItem, clear, total }), [items, total]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
