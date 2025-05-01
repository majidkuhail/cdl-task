import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProductInterface } from '../types/product.ts';
import { getBaseURL } from '../utils/url.ts';

// Sample data
const initialData: ProductInterface[] = [
  {
    name: 'Product A',
    sku: 'A',
    image: (getBaseURL() ?? '/') + 'images/products/product-a.jpeg',
    price: 50,
    volume_pricing: {
      amount: 3,
      total_price: 130
    }
  },
  {
    name: 'Product B',
    sku: 'B',
    image: (getBaseURL() ?? '/') + 'images/products/product-b.jpeg',
    price: 30,
    volume_pricing: {
      amount: 2,
      total_price: 45
    }
  },
  {
    name: 'Product C',
    sku: 'C',
    image: (getBaseURL() ?? '/') + 'images/products/product-c.jpeg',
    price: 20,
    volume_pricing: null
  },
  {
    name: 'Product D',
    sku: 'D',
    image: (getBaseURL() ?? '/') + 'images/products/product-d.jpeg',
    price: 15,
    volume_pricing: null
  }
];

interface ProductsStoreState {
  products: ProductInterface[];
  updateProduct: (sku: string, data: ProductInterface) => void;
  addProduct: (data: ProductInterface) => void;
}

/**
 * Store for products and their pricing
 */
export const useProductsStore = create<ProductsStoreState>()(
  persist(
    (set) => ({
      products: initialData,
      updateProduct: (sku, data) =>
        set((state) => ({
          products: state.products.map((product) => {
            if (product.sku === sku) {
              return data;
            }
            return product;
          })
        })),
      addProduct: (data) =>
        set((state) => {
          const products = [...state.products];
          // Check if already added
          if (!products.find((p) => p.sku === data.sku)) {
            products.push(data);
          }
          return {
            products
          };
        })
    }),
    {
      name: 'products-storage'
    }
  )
);
