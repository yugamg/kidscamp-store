import { create } from 'zustand';
import { CartItem, CartItemKey, CartState } from '@/types/product';

const keyOf = ({ productId, color, size }: CartItemKey): string =>
  `${productId}__${color}__${size}`;

const recalc = (items: CartItem[]) => {
  const itemCount = items.reduce((sum, it) => sum + it.quantity, 0);
  const subtotal = items.reduce(
    (sum, it) => sum + it.unitPrice * it.quantity,
    0,
  );
  return { itemCount, subtotal };
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  itemCount: 0,
  subtotal: 0,

  open: () => set({ isOpen: true }),

  close: () => set({ isOpen: false }),

  toggle: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (item) => {
    const { items } = get();
    const existingIndex = items.findIndex((it) => keyOf(it) === keyOf(item));

    const updatedItems =
      existingIndex === -1
        ? [...items, item]
        : items.map((it, index) =>
            index === existingIndex
              ? { ...it, quantity: it.quantity + item.quantity }
              : it,
          );

    const { itemCount, subtotal } = recalc(updatedItems);
    set({ items: updatedItems, itemCount, subtotal, isOpen: true });
  },

  // Remove item from cart
  removeItem: (key) => {
    const { items } = get();
    const updatedItems = items.filter((it) => keyOf(it) !== keyOf(key));
    const { itemCount, subtotal } = recalc(updatedItems);
    set({ items: updatedItems, itemCount, subtotal });
  },

  setQuantity: (key, quantity) => {
    const { items } = get();
    const updatedItems = items
      .map((it) => (keyOf(it) === keyOf(key) ? { ...it, quantity } : it))
      .filter((it) => it.quantity > 0);

    const { itemCount, subtotal } = recalc(updatedItems);
    set({ items: updatedItems, itemCount, subtotal });
  },

  increment: (key) => {
    const { items } = get();
    const updatedItems = items.map((it) =>
      keyOf(it) === keyOf(key) ? { ...it, quantity: it.quantity + 1 } : it,
    );

    const { itemCount, subtotal } = recalc(updatedItems);
    set({ items: updatedItems, itemCount, subtotal });
  },

  decrement: (key) => {
    const { items } = get();
    const updatedItems = items
      .map((it) =>
        keyOf(it) === keyOf(key) ? { ...it, quantity: it.quantity - 1 } : it,
      )
      .filter((it) => it.quantity > 0);

    const { itemCount, subtotal } = recalc(updatedItems);
    set({ items: updatedItems, itemCount, subtotal });
  },

  clear: () => set({ items: [], itemCount: 0, subtotal: 0 }),
}));
