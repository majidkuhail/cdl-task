import { ProductInterface } from './product.ts';

export type LineItemType = {
  sku: string;
  qty: number;
  product?: ProductInterface;
};

export interface ComputedLineItemType extends LineItemType {
  original_subtotal_price: number;
  subtotal_price: number;
}
