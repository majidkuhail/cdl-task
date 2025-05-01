import { FC, useEffect, useState } from 'react';
import { useBasketStore } from '../../stores/basket';
import { ComputedLineItemType } from '../../types/basket.ts';
import { useProductsStore } from '../../stores/products.ts';
import { formatPrice } from '../../utils/price.ts';
import QuantityInput from '../ui/QuantityInput.tsx';
import { Trash } from 'lucide-react';
import Button from '../ui/Button.tsx';

type BasketItemProps = {
  item: ComputedLineItemType;
};

const BasketItem: FC<BasketItemProps> = (props) => {
  const { item } = props;
  const [qty, setQty] = useState(item.qty);
  const productsStore = useProductsStore();
  const basketStore = useBasketStore();

  const product = item.product ?? productsStore.products.find((p) => p.sku === item.sku);

  const handleRemove = () => {
    basketStore.removeItem(item.sku);
  };

  useEffect(() => {
    setQty(item.qty);
  }, [item]);

  useEffect(() => {
    if (qty !== item.qty) {
      basketStore.updateItem(item.sku, qty);
    }
  }, [qty]);

  return (
    <div className="flex gap-4">
      <div className="flex-none">
        <div className="bg-accent relative aspect-square w-24 overflow-hidden rounded-lg">
          {product?.image && (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          )}
        </div>
      </div>
      <div className="flex-auto pt-2">
        <p className="mb-2 text-base font-medium">{product?.name}</p>
        <div className="flex items-end gap-2">
          <div className="block flex-none">
            <label className="text-muted-foreground mb-0.5 block text-xs font-bold">
              Quantity:
            </label>
            <QuantityInput value={qty} onChange={setQty} />
          </div>
          <div className="flex-none">
            <Button size="icon" variant="destructive" onClick={handleRemove}>
              <Trash className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-none pt-2 text-end">
        {item.subtotal_price !== item.original_subtotal_price && (
          <span className="text-muted-foreground block text-xs font-medium line-through">
            {formatPrice(item.original_subtotal_price)}
          </span>
        )}
        {item.subtotal_price && (
          <span className="block text-sm font-medium">{formatPrice(item.subtotal_price)}</span>
        )}
      </div>
    </div>
  );
};

export default BasketItem;
