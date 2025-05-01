import { FC, useEffect, useReducer } from 'react';
import { ProductInterface } from '../types/product.ts';
import Input from './ui/Input.tsx';
import Toggle from './ui/Toggle.tsx';
import Button from './ui/Button.tsx';
import { useProductsStore } from '../stores/products.ts';

type ManageProductProps = {
  product: ProductInterface;
};

type FormType = {
  name: string;
  sku: string;
  price: string;
  volume_pricing_enabled: boolean;
  volume_pricing_amount: string;
  volume_pricing_price: string;
};

const ManageProduct: FC<ManageProductProps> = (props) => {
  const { product } = props;
  const productsStore = useProductsStore();

  const productToForm = (product: ProductInterface): FormType => {
    return {
      name: product.name,
      sku: product.sku,
      price: `${product.price}`,
      volume_pricing_enabled: product.volume_pricing !== null,
      volume_pricing_amount: `${product.volume_pricing?.amount ?? ''}`,
      volume_pricing_price: `${product.volume_pricing?.total_price ?? ''}`
    };
  };

  // Fields state
  const [fields, updateFields] = useReducer((prev: FormType, next: Partial<FormType>) => {
    return { ...prev, ...next };
  }, productToForm(product));

  const handleInputChange = (name: string) => (value: unknown) => {
    const newFields: Record<string, unknown> = { ...fields };
    newFields[name] = value;
    updateFields(newFields);
  };

  useEffect(() => {
    updateFields(productToForm(product));
  }, [product]);

  const isDirty = JSON.stringify(productToForm(product)) !== JSON.stringify(fields);

  const handleSave = () => {
    // TODO: add validation
    productsStore.updateProduct(product.sku, {
      ...product,
      price: Number(fields.price),
      volume_pricing: fields.volume_pricing_enabled
        ? {
            amount: Number(fields.volume_pricing_amount),
            total_price: Number(fields.volume_pricing_price)
          }
        : null
    });
  };

  return (
    <div className="gap-5 sm:flex">
      <div className="mb-3 flex-none sm:mb-0">
        <div className="bg-muted relative aspect-square overflow-hidden rounded-lg sm:w-48">
          <img alt={product.image} src={product.image} className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="flex-auto">
        <div className="flex grid-cols-1 flex-col gap-2 sm:grid-cols-3 sm:gap-4 md:grid">
          <div>
            <label className="text-sm font-medium">Product name</label>
            <Input value={fields.name} readOnly className="bg-muted shadow-none" />
          </div>
          <div>
            <label className="text-sm font-medium">Product sku</label>
            <Input value={fields.sku} readOnly className="bg-muted shadow-none" />
          </div>
          <div></div>
          <div>
            <label className="text-sm font-medium">Unit price</label>
            <Input type="number" value={fields.price} onChange={handleInputChange('price')} />
          </div>
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex-none pt-7">
                <Toggle
                  label="Volume pricing: "
                  checked={fields.volume_pricing_enabled}
                  onChange={handleInputChange('volume_pricing_enabled')}
                />
              </div>
              <div className="w-24 flex-none">
                <label className="text-sm font-medium">Amount</label>
                <Input
                  type="number"
                  disabled={!fields.volume_pricing_enabled}
                  value={fields.volume_pricing_amount}
                  onChange={handleInputChange('volume_pricing_amount')}
                />
              </div>
              <div className="flex-auto">
                <label className="text-sm font-medium">Volume price</label>
                <Input
                  type="number"
                  disabled={!fields.volume_pricing_enabled}
                  value={fields.volume_pricing_price}
                  onChange={handleInputChange('volume_pricing_price')}
                />
              </div>
            </div>
          </div>
          <div className="col-span-3 pt-1 sm:pt-0">
            <Button disabled={!isDirty} onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
