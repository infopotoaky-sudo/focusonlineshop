import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, X, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories, searchProducts, formatPrice } from '../data/store';

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchProducts>>([]);
  const location = useLocation();
  const { cartCount, state } = useApp();

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q.length >= 2) {
      setSearchResults(searchProducts(q).slice(0, 6));
    } else {
      setSearchResults([]);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Schools', path: '/schools' },
    { name: 'Packages', path: '/packages' },
    { name: 'Textbooks', path: '/shop?cat=textbooks' },
    { name: 'Stationery', path: '/shop?cat=stationery' },
    { name: 'Deals', path: '/shop?deals=true' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Announcement Bar */}
      <div className="bg-[#1e3a5f] text-white text-center py-2 text-sm px-4">
        <p>📚 Quality Books & School Supplies — Delivered to You | Free pickup available</p>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#1e3a5f] rounded-lg flex items-center justify-center">
                <span className="text-[#f5a623] font-bold text-lg">F</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-[#1e3a5f] font-bold text-xl leading-tight">FOCUS</h1>
                <p className="text-[10px] text-gray-500 leading-tight">Books • School Supplies • More</p>
              </div>
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for books, authors, ISBN, schools..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setSearchOpen(true)}
                  onBlur={() => setSearchOpen(false)}
                />
                {searchOpen && searchResults.length > 0 && (
                  <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    {searchResults.map(p => (
                      <Link key={p.id} to={`/product/${p.slug}`} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50" onClick={() => { setSearchQuery(''); setSearchOpen(false); }}>
                        <span className="text-2xl">{p.images[0]}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{p.name}</p>
                          <p className="text-xs text-[#f5a623] font-semibold">{formatPrice(p.salePrice || p.price)}</p>
                        </div>
                      </Link>
                    ))}
                    <Link to={`/search?q=${searchQuery}`} className="block px-4 py-2 text-sm text-[#1e3a5f] font-medium hover:bg-gray-50" onClick={() => { setSearchQuery(''); setSearchOpen(false); }}>
                      View all results →
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button onClick={() => setSearchOpen(!searchOpen)} className="md:hidden p-2 text-gray-600 hover:text-[#1e3a5f]">
                <Search className="w-5 h-5" />
              </button>
              <Link to="/wishlist" className="hidden sm:flex p-2 text-gray-600 hover:text-[#1e3a5f] relative">
                <Heart className="w-5 h-5" />
                {state.wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">{state.wishlist.length}</span>
                )}
              </Link>
              <Link to="/account" className="hidden sm:flex p-2 text-gray-600 hover:text-[#1e3a5f]">
                <User className="w-5 h-5" />
              </Link>
              <Link to="/cart" className="p-2 text-gray-600 hover:text-[#1e3a5f] relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#f5a623] text-[#1e3a5f] text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>
                )}
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-600">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 pb-3 overflow-x-auto">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                  location.pathname === link.path ? 'bg-[#1e3a5f] text-white' : 'text-gray-600 hover:text-[#1e3a5f] hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                autoFocus
              />
              {searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border py-2 z-50">
                  {searchResults.map(p => (
                    <Link key={p.id} to={`/product/${p.slug}`} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50" onClick={() => { setSearchQuery(''); setSearchOpen(false); }}>
                      <span className="text-xl">{p.images[0]}</span>
                      <div>
                        <p className="text-sm font-medium">{p.name}</p>
                        <p className="text-xs text-[#f5a623] font-semibold">{formatPrice(p.salePrice || p.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                {link.name}
              </Link>
            ))}
            <hr className="my-2" />
            <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              ❤️ Wishlist ({state.wishlist.length})
            </Link>
            <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              👤 My Account
            </Link>
            <Link to="/track-order" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              📦 Track Order
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#1e3a5f] text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#f5a623] rounded-lg flex items-center justify-center">
                  <span className="text-[#1e3a5f] font-bold text-lg">F</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">FOCUS</h3>
                  <p className="text-xs text-gray-300">Books • School Supplies • More</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your one-stop shop for textbooks, stationery, school supplies and complete school packages. Quality educational products delivered to you.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-[#f5a623]">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
                <li><Link to="/schools" className="hover:text-white transition-colors">Find School Books</Link></li>
                <li><Link to="/packages" className="hover:text-white transition-colors">School Packages</Link></li>
                <li><Link to="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-semibold mb-4 text-[#f5a623]">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {categories.slice(0, 6).map(cat => (
                  <li key={cat.id}><Link to={`/shop?cat=${cat.slug}`} className="hover:text-white transition-colors">{cat.name}</Link></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4 text-[#f5a623]">Contact Us</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +233 XX XXX XXXX</li>
                <li className="flex items-center gap-2"><MessageCircle className="w-4 h-4" /> WhatsApp Available</li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@focusstore.com</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Accra, Ghana</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">© 2026 FOCUS Books • School Supplies • More. All rights reserved.</p>
            <div className="flex gap-4 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/233000000000?text=Hello%20FOCUS%2C%20I%20would%20like%20to%20inquire%20about%20your%20products."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors z-40"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>

      {/* Toast */}
      {state.toast && (
        <div className={`fixed bottom-20 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-lg z-50 text-sm font-medium animate-bounce ${
          state.toast.type === 'success' ? 'bg-green-500 text-white' :
          state.toast.type === 'error' ? 'bg-red-500 text-white' :
          'bg-[#1e3a5f] text-white'
        }`}>
          {state.toast.message}
        </div>
      )}
    </div>
  );
}
