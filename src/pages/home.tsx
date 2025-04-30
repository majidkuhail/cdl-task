import { FC } from 'react';
import { useProductsStore } from '../stores/products.ts';
import ProductCard from '../components/ProductCard.tsx';

const HomePage: FC = () => {
  const productsStore = useProductsStore();
  return (
    <main className="container pt-4 pb-24">
      <h2 className="text-xl font-bold">Products list</h2>
      <p>Add products to your basket</p>
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
        {productsStore.products.map((product) => (
          <ProductCard key={product.sku} product={product} />
        ))}
      </div>
    </main>
  );
};

export default HomePage;
