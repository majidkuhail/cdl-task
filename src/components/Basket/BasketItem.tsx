import { FC } from 'react';
import { useBasketStore } from '../../stores/basket';
import { LineItemType } from '../../types/basket.ts';
import { useProductsStore } from '../../stores/products.ts';
import { formatPrice } from '../../utils/price.ts';

type BasketItemProps = {
  item: LineItemType;
};
const BasketItem: FC<BasketItemProps> = (props) => {
  const { item } = props;
  const productsStore = useProductsStore();
  const basketStore = useBasketStore();

  const product = item.product ?? productsStore.products.find((p) => p.sku === item.sku);
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
        <p className="text-base font-medium">{product?.name}</p>
        <p className="text-muted-foreground text-sm">Quantity: {item.qty}</p>
      </div>
      <div className="flex-none pt-2">
        {product?.price && (
          <span className="text-sm font-medium">{formatPrice(item.qty * product?.price)}</span>
        )}
      </div>
    </div>
  );
};

export default BasketItem;
