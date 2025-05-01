import { FC, useCallback } from 'react';
import { useBasketComputedItems, useBasketStore } from '../../stores/basket';
import Drawer from '../ui/Drawer';
import Button from '../ui/Button.tsx';
import { X as CloseIcon } from 'lucide-react';
import BasketItem from './BasketItem.tsx';
import { formatPrice } from '../../utils/price.ts';

const Basket: FC = () => {
  const basketStore = useBasketStore();
  const computedItems = useBasketComputedItems();

  const handleClose = useCallback(() => {
    basketStore.toggleBasket(false);
  }, [basketStore]);

  const subtotal = computedItems.reduce((acc, item) => {
    return acc + item.original_subtotal_price;
  }, 0);

  const total = computedItems.reduce((acc, item) => {
    return acc + item.subtotal_price;
  }, 0);
  const discount = subtotal - total;

  return (
    <Drawer open={basketStore.open} onClose={handleClose} innerClassName="flex flex-col gap-2">
      <div className="border-b-border mb-4 flex w-full shrink-0 grow-0 items-start border-b pb-4">
        <h2 className="flex-auto text-2xl font-bold">Basket</h2>
        <Button size="icon" variant="ghost" onClick={handleClose}>
          <CloseIcon />
        </Button>
      </div>
      {computedItems.length === 0 ? (
        <div className="text-muted-foreground flex h-full flex-auto flex-col items-center justify-center py-4 text-center">
          <p className="text-lg">Nothing in your basket</p>
        </div>
      ) : (
        <>
          <div className="divide-muted w-full flex-auto divide-y-1 overflow-auto">
            {computedItems.map((item) => (
              <div key={item.sku} className="py-4">
                <BasketItem item={item} />
              </div>
            ))}
          </div>
          {discount > 0 && (
            <>
              <div className="w-full flex-none">
                <dl className="flex items-start gap-2 text-sm">
                  <dt className="flex-auto text-start">Subtotal</dt>
                  <dd className="flex-none text-end">{formatPrice(subtotal)}</dd>
                </dl>
              </div>
              <div className="w-full flex-none">
                <dl className="flex items-start gap-2 text-sm">
                  <dt className="flex-auto text-start">Volume discount</dt>
                  <dd className="flex-none text-end">-{formatPrice(discount)}</dd>
                </dl>
              </div>
            </>
          )}
          <div className="w-full flex-none">
            <dl className="flex items-start gap-2 text-lg font-bold">
              <dt className="flex-auto text-start">Total</dt>
              <dd className="flex-none text-end">{formatPrice(total)}</dd>
            </dl>
          </div>
          <div className="mt-4 w-full flex-none">
            <Button className="w-full" size="lg">
              Checkout
            </Button>
          </div>
        </>
      )}
    </Drawer>
  );
};

export default Basket;
