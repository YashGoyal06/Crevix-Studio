import { useCallback, useEffect, useMemo, useState } from 'react';
import { CartContext } from './cartStore';
import { useAuth } from './authStore';
import { supabase } from '../lib/supabaseClient';

const STORAGE_KEY_PREFIX = 'crevix-cart';
const EMPTY_ITEMS = [];

const readInitialCart = (userId) => {
  if (typeof window === 'undefined') return [];
  if (!userId) return [];

  try {
    const stored = window.localStorage.getItem(`${STORAGE_KEY_PREFIX}-${userId}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const userId = user?.id || null;
  const [cartByUser, setCartByUser] = useState({});
  const [syncing, setSyncing] = useState(false);
  const items = useMemo(
    () => (userId ? cartByUser[userId] || EMPTY_ITEMS : EMPTY_ITEMS),
    [cartByUser, userId],
  );

  useEffect(() => {
    if (!userId) return;

    let active = true;
    const localItems = readInitialCart(userId);
    Promise.resolve().then(() => {
      if (!active) return;
      setCartByUser((current) => ({ ...current, [userId]: localItems }));
    });

    const loadRemoteCart = async () => {
      setSyncing(true);
      const { data, error } = await supabase
        .from('cart_items')
        .select('id, product_id, name, type, price, amount, features')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

      if (!active) return;

      if (error || !data) {
        setSyncing(false);
        return;
      }

      const normalized = data.map((item) => ({
        cartId: item.id,
        id: item.product_id,
        name: item.name,
        type: item.type,
        price: item.price,
        amount: item.amount,
        features: item.features || [],
      }));
      setCartByUser((current) => ({ ...current, [userId]: normalized }));
      setSyncing(false);
    };

    loadRemoteCart();
    return () => {
      active = false;
    };
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    window.localStorage.setItem(`${STORAGE_KEY_PREFIX}-${userId}`, JSON.stringify(items));
  }, [items, userId]);

  const addItem = useCallback((item) => {
    if (!userId) return;
    const cartId = `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setCartByUser((current) => {
      const currentItems = current[userId] || [];
      return {
        ...current,
        [userId]: [...currentItems, { ...item, cartId }],
      };
    });

    (async () => {
      await supabase.from('cart_items').insert({
        id: cartId,
        user_id: userId,
        product_id: item.id,
        name: item.name,
        type: item.type,
        price: item.price,
        amount: item.amount || 0,
        features: item.features || [],
      });
    })();
  }, [userId]);

  const removeItem = useCallback((cartId) => {
    if (!userId) return;
    setCartByUser((current) => {
      const currentItems = current[userId] || [];
      return {
        ...current,
        [userId]: currentItems.filter((item) => item.cartId !== cartId),
      };
    });
    (async () => {
      await supabase.from('cart_items').delete().eq('user_id', userId).eq('id', cartId);
    })();
  }, [userId]);

  const clearCart = useCallback(() => {
    if (!userId) return;
    setCartByUser((current) => ({ ...current, [userId]: [] }));
    (async () => {
      await supabase.from('cart_items').delete().eq('user_id', userId);
    })();
  }, [userId]);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + (item.amount || 0), 0),
    [items],
  );

  const value = useMemo(
    () => ({ items, addItem, removeItem, clearCart, total, syncing, requiresAuth: !userId }),
    [items, addItem, removeItem, clearCart, total, syncing, userId],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
