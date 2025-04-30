import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProductInterface } from '../types/product.ts';
import { LineItemType } from '../types/basket.ts';

interface BasketStoreState {
  items: LineItemType[];
  addItem: (sku: string, qty: number, product?: ProductInterface) => void;
  updateItem: (sku: string, qty: number, product?: ProductInterface) => void;
  removeItem: (sku: string) => void;
}

/**
 * Store to hold products added to basket
 */
export const useBasketStore = create<BasketStoreState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (sku, qty, product) =>
        set((state) => {
          const items = [...state.items];
          // Check if already added
          const existingIndex = items.findIndex((i) => i.sku === sku);
          if (existingIndex >= 0) {
            // Already added, append qty
            items[existingIndex].qty += qty;
          } else {
            // Not there, add new item
            items.push({
              sku: sku,
              qty: qty,
              product: product
            });
          }
          return {
            items
          };
        }),

      updateItem: (sku, qty, product) =>
        set((state) => {
          let items = [...state.items];
          // Check if it already exists
          const existingIndex = items.findIndex((i) => i.sku === sku);
          if (existingIndex >= 0) {
            // Exists, adjust qty
            if (qty !== 0) {
              items[existingIndex].qty = qty;
            } else {
              // Qty is zero so remove item
              items = items.filter((i) => i.sku === sku);
            }
          } else {
            // Not there, add new item
            items.push({
              sku: sku,
              qty: qty,
              product: product
            });
          }
          return {
            items
          };
        }),

      removeItem: (sku) =>
        set((state) => {
          return {
            items: state.items.filter((i) => i.sku === sku)
          };
        })
    }),
    {
      name: 'products-storage'
    }
  )
);
