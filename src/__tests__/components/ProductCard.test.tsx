import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../../components/ProductCard';
import { ProductInterface } from '../../types/product';

// Mock the basket store
const mockStore = {
  addItem: vi.fn(),
  toggleBasket: vi.fn()
};

vi.mock('../../stores/basket', () => ({
  useBasketStore: () => mockStore
}));

const mockProduct: ProductInterface = {
  sku: 'test-1',
  name: 'Test Product',
  price: 10,
  image: 'test-image.jpg'
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('£10.00')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test-image.jpg');
  });

  it('handles adding product to basket', () => {
    const addItem = vi.fn();
    const toggleBasket = vi.fn();
    mockStore.addItem = addItem;
    mockStore.toggleBasket = toggleBasket;

    render(<ProductCard product={mockProduct} />);

    const addButton = screen.getByRole('button', { name: /add to basket/i });
    fireEvent.click(addButton);

    expect(addItem).toHaveBeenCalledWith(mockProduct.sku, 1, mockProduct);
    expect(toggleBasket).toHaveBeenCalledWith(true);
  });

  it('shows volume pricing when available', () => {
    const productWithVolumePricing = {
      ...mockProduct,
      volume_pricing: {
        amount: 3,
        total_price: 25
      }
    };

    render(<ProductCard product={productWithVolumePricing} />);

    expect(screen.getByTitle('Buy 3 for £25.00')).toBeInTheDocument();
  });
});
