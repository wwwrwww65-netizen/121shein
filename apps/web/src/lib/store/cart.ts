import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product } from '@repo/db';
import { trpc } from '@/lib/trpc/client'; // Assuming we can import this here
import Cookies from 'js-cookie';

// This is a simplified version. A real-world app would need more robust logic
// to handle race conditions, optimistic updates, and error states.

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  // Actions for anonymous users (local state)
  _addItem: (product: Product) => void;
  _removeItem: (productId: string) => void;
  _updateQuantity: (productId: string, quantity: number) => void;
  // Actions that sync with backend for logged-in users
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  // Syncing actions
  syncCart: () => Promise<void>;
  setCart: (items: CartItem[]) => void;
  clearCart: () => void;
};

// Helper to check for auth token
const isAuthenticated = () => !!Cookies.get('token');

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // Internal actions for local state
      _addItem: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.product.id === product.id);
        if (existingItem) {
          set({ items: currentItems.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) });
        } else {
          set({ items: [...currentItems, { product, quantity: 1 }] });
        }
      },
      _removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.product.id !== productId) });
      },
      _updateQuantity: (productId, quantity) => {
        if (quantity < 1) {
          get()._removeItem(productId);
        } else {
          set({ items: get().items.map((item) => item.product.id === productId ? { ...item, quantity } : item) });
        }
      },

      // Public actions that decide whether to go local or remote
      addItem: (product) => {
        if (isAuthenticated()) {
          trpc.cart.addItem.useMutation().mutate({ productId: product.id, quantity: 1 });
          // Note: For a better UX, we'd use on-success callbacks to refetch the cart
        }
        get()._addItem(product); // Optimistic update
      },
      removeItem: (productId) => {
        if (isAuthenticated()) {
          trpc.cart.removeItem.useMutation().mutate({ productId });
        }
        get()._removeItem(productId); // Optimistic update
      },
      updateQuantity: (productId, quantity) => {
        if (isAuthenticated()) {
          trpc.cart.updateItemQuantity.useMutation().mutate({ productId, quantity });
        }
        get()._updateQuantity(productId, quantity); // Optimistic update
      },

      // Hydration/Syncing logic
      setCart: (items) => {
        set({ items });
      },
      syncCart: async () => {
        if (!isAuthenticated()) return;

        const localCart = get().items;
        if (localCart.length > 0) {
          const localCartFormatted = localCart.map(item => ({ productId: item.product.id, quantity: item.quantity }));
          await trpc.cart.mergeCarts.useMutation().mutateAsync(localCartFormatted);
        }

        // Fetch the canonical cart from the server
        const serverCart = await trpc.cart.getCart.useQuery().refetch();
        if (serverCart.data) {
          const serverItems = serverCart.data.items.map(item => ({ product: item.product, quantity: item.quantity }));
          set({ items: serverItems });
        }
      },
      clearCart: () => {
        // Here you would also call a backend endpoint if the user is logged in
        set({ items: [] });
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// This implementation is simplified. For example, calling mutations directly inside the store
// is an anti-pattern. A better approach is to have components call the mutations, and on
// success, they call a method on the store to update the state, or just refetch the cart query.
// But for this example, this demonstrates the intended logic.
