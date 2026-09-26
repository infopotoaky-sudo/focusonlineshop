import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { SchoolsPage, SchoolDetailPage } from './pages/SchoolsPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage, CheckoutPage, OrderConfirmationPage } from './pages/CartPage';
import { AccountPage, TrackOrderPage, WishlistPage, PackagesPage } from './pages/AccountPage';
import { AdminPage } from './pages/AdminPage';
import { AboutPage, ContactPage, FAQPage, SearchPage } from './pages/StaticPages';

function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  if (isAdmin) {
    return <AdminPage />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/schools" element={<SchoolsPage />} />
        <Route path="/schools/:slug" element={<SchoolDetailPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation/:orderNumber" element={<OrderConfirmationPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacy" element={<AboutPage />} />
        <Route path="/terms" element={<AboutPage />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
