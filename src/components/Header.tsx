import { FC } from 'react';
import { Link, NavLink } from 'react-router';
import { ShoppingBag, Menu } from 'lucide-react';
import Button from './ui/Button.tsx';
import { useBasketStore } from '../stores/basket.ts';

const Header: FC = () => {
  const basketStore = useBasketStore();
  return (
    <header className="sticky top-0 z-50 bg-white/90 py-4 backdrop-blur-xs" data-testid="header">
      <div className="container flex flex-row items-center gap-4">
        <Link to="/" className="-mt-0.5 inline-block text-xl font-bold whitespace-nowrap">
          CDL Task
        </Link>
        <div className="hidden w-auto max-w-full flex-auto items-center justify-end gap-1 overflow-auto md:flex">
          <Button as={NavLink} to="/" variant="ghost" className="[&.active]:bg-accent">
            Home
          </Button>
          <Button
            as={NavLink}
            to="/manage-pricing"
            variant="ghost"
            className="[&.active]:bg-accent">
            Manage Pricing
          </Button>
        </div>
        <div className="bg-border hidden h-4 w-px md:block"></div>
        <div className="flex w-auto grow items-center justify-end gap-2 md:shrink-0 md:grow-0">
          <span className="relative inline-block">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => basketStore.toggleBasket(true)}
              data-testid="basket-btn">
              <ShoppingBag className="h-5 w-5" />
              {basketStore.items?.length > 0 && (
                <span className="text-primary-foreground bg-primary absolute -end-0.5 -bottom-0.5 inline-flex h-4 min-w-4 justify-center rounded-full px-1 text-center text-xs font-bold">
                  {basketStore.items.reduce((acc, item) => {
                    return acc + item.qty;
                  }, 0)}
                </span>
              )}
            </Button>
          </span>
          <Button size="icon" variant="ghost" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
