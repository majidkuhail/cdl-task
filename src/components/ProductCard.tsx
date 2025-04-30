import { FC, FormEventHandler, useCallback, useState } from 'react';
import { ProductInterface } from '../types/product.ts';
import { formatPrice } from '../utils/price.ts';
import Button from './ui/Button.tsx';
import QuantityInput from './ui/QuantityInput.tsx';
import { useBasketStore } from '../stores/basket.ts';

type ProductCardProps = {
  product: ProductInterface;
};

const ProductCard: FC<ProductCardProps> = (props) => {
  const { product } = props;

  // States
  const basketStore = useBasketStore();
  const [qty, setQty] = useState(1);

  // Actions
  const handleAddToBasket = useCallback<FormEventHandler>(
    (event) => {
      event.preventDefault();
      basketStore.addItem(product.sku, qty, product);
      basketStore.toggleBasket(true);
      setQty(1);
    },
    [qty, basketStore, product]
  );

  return (
    <div>
      <div className="bg-accent relative aspect-square w-full overflow-hidden rounded-lg">
        {product.image && (
          <img
            className="z-10 w-full object-cover object-center"
            alt={product.name}
            src={product.image}
          />
        )}

        {product.volume_pricing && (
          <span className="absolute end-1 bottom-1 z-20 inline-flex w-auto items-center gap-1 rounded-md bg-emerald-500/20 px-2 py-0.5 text-sm backdrop-blur-lg">
            <span>Buy </span>
            <strong>{product.volume_pricing.amount}</strong>
            <span> for </span>
            <strong>{formatPrice(product.volume_pricing.total_price)}</strong>
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center gap-1">
        <h3 className="flex-auto text-base font-medium md:text-lg">{product.name}</h3>
        <p className="flex-none">{formatPrice(product.price)}</p>
      </div>
      <form className="mt-3 flex items-center gap-1" onSubmit={handleAddToBasket}>
        <div className="flex-none">
          <QuantityInput value={qty} onChange={setQty} />
        </div>
        <Button type="submit" className="flex-auto">
          Add to basket
        </Button>
      </form>
    </div>
  );
};

export default ProductCard;
