import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Basket } from '../../components/Basket';
import { LineItemType } from '../../types/basket';
import { useBasketStore } from '../../stores/basket';

const mockItems: LineItemType[] = [
  {
    sku: 'test-1',
    qty: 2,
    product: {
      name: 'Test product 1',
      sku: 'test-1',
      price: 20,
      volume_pricing: null
    }
  },
  {
    sku: 'test-2',
    qty: 2,
    product: {
      name: 'Test product 2',
      sku: 'test-2',
      price: 30,
      volume_pricing: {
        amount: 2,
        total_price: 45
      }
    }
  },
  {
    sku: 'test-3',
    qty: 7,
    product: {
      name: 'Test product 3',
      sku: 'test-3',
      price: 50,
      volume_pricing: {
        amount: 3,
        total_price: 130
      }
    }
  }
];

describe('Basket', () => {
  it('renders empty basket message when no items', () => {
    useBasketStore.setState({
      open: true,
      items: []
    });

    render(<Basket />);

    expect(screen.getByText('Nothing in your basket')).toBeInTheDocument();
  });

  it('renders basket with no discount items and totals are correct', () => {
    useBasketStore.setState({
      open: true,
      items: [mockItems[0]]
    });

    render(<Basket />);

    // Check if items are rendered
    expect(screen.getByTestId('basket-heading')).toBeInTheDocument();
    expect(screen.getByTestId(`basket-item-${mockItems[0].sku}`)).toBeInTheDocument();

    // Check totals
    expect(screen.getByTestId('basket-total')).toHaveTextContent('£40.00');
  });

  it('renders basket with volume discount items and totals are correct', () => {
    useBasketStore.setState({
      open: true,
      items: [mockItems[1]]
    });

    render(<Basket />);

    // Check if items are rendered
    expect(screen.getByTestId('basket-heading')).toBeInTheDocument();
    expect(screen.getByTestId(`basket-item-${mockItems[1].sku}`)).toBeInTheDocument();

    // Check totals
    expect(screen.getByTestId('basket-subtotal')).toHaveTextContent('60.00');
    expect(screen.getByTestId('basket-discount')).toHaveTextContent('-£15');
    expect(screen.getByTestId('basket-total')).toHaveTextContent('£45.00');
  });

  it('renders basket with volume discount items with remainder full price items and totals are correct', () => {
    useBasketStore.setState({
      open: true,
      items: [mockItems[2]]
    });

    render(<Basket />);

    // Check if items are rendered
    expect(screen.getByTestId('basket-heading')).toBeInTheDocument();
    expect(screen.getByTestId(`basket-item-${mockItems[2].sku}`)).toBeInTheDocument();

    // Check totals
    expect(screen.getByTestId('basket-subtotal')).toHaveTextContent('£350.00');
    expect(screen.getByTestId('basket-discount')).toHaveTextContent('-£40');
    expect(screen.getByTestId('basket-total')).toHaveTextContent('£310.00');
  });

  it('renders basket with both no discount and volume discount items and totals are correct', () => {
    useBasketStore.setState({
      open: true,
      items: mockItems
    });

    render(<Basket />);

    // Check if items are rendered
    expect(screen.getByTestId('basket-heading')).toBeInTheDocument();
    expect(screen.getByTestId(`basket-item-${mockItems[0].sku}`)).toBeInTheDocument();
    expect(screen.getByTestId(`basket-item-${mockItems[1].sku}`)).toBeInTheDocument();
    expect(screen.getByTestId(`basket-item-${mockItems[2].sku}`)).toBeInTheDocument();

    // Check totals
    expect(screen.getByTestId('basket-subtotal')).toHaveTextContent('£450.00');
    expect(screen.getByTestId('basket-discount')).toHaveTextContent('-£55');
    expect(screen.getByTestId('basket-total')).toHaveTextContent('£395.00');
  });
});
