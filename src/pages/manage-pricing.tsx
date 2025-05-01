import { FC } from 'react';
import { useProductsStore } from '../stores/products';
import ManageProduct from '../components/ManageProduct';

const ManagePricingPage: FC = () => {
  const productsStore = useProductsStore();

  return (
    <main className="container min-h-[85vh] pt-4 pb-24">
      <h2 className="text-xl font-bold">Manage pricing</h2>
      <p>Adjust the pricing for the products</p>
      <div className="divide-y-muted mt-4 divide-y">
        {productsStore.products?.map((product, key) => (
          <div key={key} className="py-7">
            <ManageProduct product={product} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default ManagePricingPage;
