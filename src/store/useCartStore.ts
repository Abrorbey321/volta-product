import { create } from 'zustand';
import type { Product, CartItem } from '../data/mockData';

interface CartStore {
  items: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  wishlist: [],

  addToCart: (product, quantity = 1) => set((state) => {
    const existing = state.items.find(i => i.product.id === product.id);
    if (existing) {
      return {
        items: state.items.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) }
            : i
        )
      };
    }
    return { items: [...state.items, { product, quantity }] };
  }),

  removeFromCart: (productId) => set((state) => ({
    items: state.items.filter(i => i.product.id !== productId)
  })),

  updateQuantity: (productId, quantity) => set((state) => {
    if (quantity <= 0) {
      return { items: state.items.filter(i => i.product.id !== productId) };
    }
    return {
      items: state.items.map(i =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    };
  }),

  clearCart: () => set({ items: [] }),

  toggleWishlist: (product) => set((state) => {
    const inWishlist = state.wishlist.some(p => p.id === product.id);
    return {
      wishlist: inWishlist
        ? state.wishlist.filter(p => p.id !== product.id)
        : [...state.wishlist, product]
    };
  }),

  isInWishlist: (productId) => get().wishlist.some(p => p.id === productId),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  totalPrice: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
}));
