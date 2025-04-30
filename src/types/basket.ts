import { ProductInterface } from './product.ts';

export type LineItemType = {
  sku: string;
  qty: number;
  product?: ProductInterface;
};
