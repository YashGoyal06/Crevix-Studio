import { useEffect, useMemo, useState } from 'react';
import { CartContext } from './cartStore';
const STORAGE_KEY = 'crevix-cart';

const readInitialCart = () => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(readInitialCart);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    setItems((current) => [
      ...current,
      {
        ...item,
        cartId: `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      },
    ]);
  };

  const removeItem = (cartId) => {
    setItems((current) => current.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => setItems([]);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + (item.amount || 0), 0),
    [items],
  );

  const value = useMemo(
    () => ({ items, addItem, removeItem, clearCart, total }),
    [items, total],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
