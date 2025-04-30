export interface ProductInterface {
  sku: string;
  name: string;
  image?: string;
  price: number;
  volume_pricing?: VolumePricingType | null;
}

export type VolumePricingType = {
  amount: number;
  total_price: number;
};
