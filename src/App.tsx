import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/shop" element={<Layout><ShopPage /></Layout>} />
          <Route path="/schools" element={<Layout><SchoolsPage /></Layout>} />
          <Route path="/schools/:slug" element={<Layout><SchoolDetailPage /></Layout>} />
          <Route path="/packages" element={<Layout><PackagesPage /></Layout>} />
          <Route path="/product/:slug" element={<Layout><ProductPage /></Layout>} />
          <Route path="/cart" element={<Layout><CartPage /></Layout>} />
          <Route path="/checkout" element={<Layout><CheckoutPage /></Layout>} />
          <Route path="/order-confirmation/:orderNumber" element={<Layout><OrderConfirmationPage /></Layout>} />
          <Route path="/track-order" element={<Layout><TrackOrderPage /></Layout>} />
          <Route path="/account" element={<Layout><AccountPage /></Layout>} />
          <Route path="/wishlist" element={<Layout><WishlistPage /></Layout>} />
          <Route path="/search" element={<Layout><SearchPage /></Layout>} />
          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
          <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
          <Route path="/faq" element={<Layout><FAQPage /></Layout>} />
          <Route path="/privacy" element={<Layout><AboutPage /></Layout>} />
          <Route path="/terms" element={<Layout><AboutPage /></Layout>} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}

export default App;
