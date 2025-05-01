import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import App from '../App';

describe('App', () => {
  it('renders the header and footer', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Check if header and footer are present
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders the home page by default', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });
});
