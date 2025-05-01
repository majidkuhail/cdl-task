import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import { getBaseURL } from './utils/url.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={getBaseURL() ?? undefined}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
