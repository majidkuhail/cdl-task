import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Header from '../../components/Header';
import { useBasketStore } from '../../stores/basket';

describe('Header', () => {
  it('renders the header with navigation links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Manage Pricing')).toBeInTheDocument();
  });

  it('shows basket item count when items are present', () => {
    useBasketStore.setState({
      items: [{ sku: 'test-1', qty: 2 }]
    });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
