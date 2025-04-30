import { FC, useCallback } from 'react';
import { useBasketStore } from '../../stores/basket';
import Drawer from '../ui/Drawer';
import Button from '../ui/Button.tsx';
import { X as CloseIcon } from 'lucide-react';
import BasketItem from './BasketItem.tsx';

const Basket: FC = () => {
  const basketStore = useBasketStore();

  const handleClose = useCallback(() => {
    basketStore.toggleBasket(false);
  }, [basketStore]);

  return (
    <Drawer open={basketStore.open} onClose={handleClose} innerClassName="flex flex-col gap-2">
      <div className="border-b-border mb-4 flex w-full shrink-0 grow-0 items-start border-b pb-4">
        <h2 className="flex-auto text-2xl font-bold">Basket</h2>
        <Button size="icon" variant="ghost" onClick={handleClose}>
          <CloseIcon />
        </Button>
      </div>
      <div className="divide-muted w-full flex-auto divide-y-1 overflow-auto">
        {basketStore.items.map((item) => (
          <div key={item.sku} className="py-4">
            <BasketItem item={item} />
          </div>
        ))}
      </div>
      <div className="w-full flex-none">
        <dl className="flex items-start gap-2 text-sm">
          <dt className="flex-auto text-start">Subtotal</dt>
          <dd className="flex-none text-end">-£15.00</dd>
        </dl>
      </div>
      <div className="w-full flex-none">
        <dl className="flex items-start gap-2 text-sm">
          <dt className="flex-auto text-start">Volume discount</dt>
          <dd className="flex-none text-end">-£15.00</dd>
        </dl>
      </div>
      <div className="w-full flex-none">
        <dl className="flex items-start gap-2 text-lg font-bold">
          <dt className="flex-auto text-start">Total</dt>
          <dd className="flex-none text-end">£15.00</dd>
        </dl>
      </div>
      <div className="mt-4 w-full flex-none">
        <Button className="w-full" size="lg">
          Checkout
        </Button>
      </div>
    </Drawer>
  );
};

export default Basket;
