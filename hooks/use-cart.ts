import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Size } from "@/types";
import { DELIVERY_CHARGE } from "@/lib/config";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (productCode: string, size: Size) => void;
  updateQuantity: (productCode: string, size: Size, quantity: number) => void;
  clearCart: () => void;
  subtotal: () => number;
  itemCount: () => number;
  total: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productCode === item.productCode && i.size === item.size
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productCode === item.productCode && i.size === item.size
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
              isOpen: true,
            };
          }
          return { items: [...state.items, item], isOpen: true };
        }),
      removeItem: (productCode, size) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productCode === productCode && i.size === size)
          ),
        })),
      updateQuantity: (productCode, size, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter(
                  (i) => !(i.productCode === productCode && i.size === size)
                )
              : state.items.map((i) =>
                  i.productCode === productCode && i.size === size
                    ? { ...i, quantity }
                    : i
                ),
        })),
      clearCart: () => set({ items: [] }),
      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      itemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
      total: () => get().subtotal() + (get().items.length > 0 ? DELIVERY_CHARGE : 0),
    }),
    { name: "revine-cart" }
  )
);
