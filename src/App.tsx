import './App.css';
import { Route, Routes } from 'react-router';
import HomePage from './pages/home';
import ManagePricingPage from './pages/manage-pricing';
import Header from './components/Header';
import NotFoundPage from './pages/404';
import { Basket } from './components/Basket';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/manage-pricing" element={<ManagePricingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Basket />
      <Footer />
    </>
  );
}

export default App;
