import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProductInterface } from '../types/product.ts';
import { ComputedLineItemType, LineItemType } from '../types/basket.ts';

interface BasketStoreState {
  open: boolean;
  toggleBasket: (open?: boolean) => void;
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
      open: false,
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
              items = items.filter((i) => i.sku !== sku);
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
            items: state.items.filter((i) => i.sku !== sku)
          };
        }),

      toggleBasket: (open?: boolean) =>
        set((state) => {
          return {
            open: open === undefined ? !state.open : open
          };
        })
    }),
    {
      name: 'basket-storage'
    }
  )
);

export const useBasketComputedItems = (): ComputedLineItemType[] => {
  const store = useBasketStore();
  return store.items.map((item) => {
    const product = item.product;
    if (!product) {
      return {
        ...item,
        original_subtotal_price: 0,
        subtotal_price: 0
      };
    }
    const original_subtotal_price = product.price * item.qty;
    let subtotal_price = original_subtotal_price;
    if (product.volume_pricing?.amount && item.qty >= product.volume_pricing?.amount) {
      const groupCount = Math.floor(item.qty / product.volume_pricing.amount);
      const remaining = item.qty % product.volume_pricing.amount;
      if (groupCount > 0) {
        subtotal_price =
          groupCount * product.volume_pricing.total_price + remaining * product.price;
      }
    }
    return {
      ...item,
      original_subtotal_price,
      subtotal_price
    };
  });
};
