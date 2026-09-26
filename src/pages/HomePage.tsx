import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Truck, Shield, Store, Clock, Headphones, CheckCircle, Star, TrendingUp, Gift, Zap } from 'lucide-react';
import { products, categories, schools, schoolClasses, schoolPackages, formatPrice } from '../data/store';
import { ProductGrid, ProductCard, CategoryCard, PackageCard } from '../components/Products';

export function HomePage() {
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const navigate = useNavigate();

  const featuredProducts = products.filter(p => p.featured && p.status === 'active').slice(0, 10);
  const newArrivals = products.filter(p => p.newArrival && p.status === 'active').slice(0, 5);
  const bestSellers = products.filter(p => p.bestSeller && p.status === 'active').slice(0, 5);
  const deals = products.filter(p => p.salePrice && p.status === 'active').slice(0, 5);
  const availableClasses = selectedSchool ? schoolClasses.filter(c => c.schoolId === selectedSchool) : [];

  const handleFindSchool = () => {
    if (selectedSchool && selectedClass) {
      navigate(`/schools/${schools.find(s => s.id === selectedSchool)?.slug}?class=${selectedClass}`);
    } else if (selectedSchool) {
      navigate(`/schools/${schools.find(s => s.id === selectedSchool)?.slug}`);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1e3a5f] via-[#2a4a70] to-[#1e3a5f] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">📚</div>
          <div className="absolute top-20 right-20 text-6xl">✏️</div>
          <div className="absolute bottom-10 left-1/4 text-7xl">🎒</div>
          <div className="absolute bottom-20 right-1/3 text-5xl">🧮</div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#f5a623]/20 text-[#f5a623] px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" /> Ghana's Trusted Education Store
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Everything You Need for School,{' '}
                <span className="text-[#f5a623]">All in One Place</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                Find textbooks, stationery, school supplies and complete school packages from FOCUS. Quality products, great prices.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/shop" className="bg-[#f5a623] hover:bg-[#e09500] text-[#1e3a5f] font-bold px-8 py-3.5 rounded-full transition-colors inline-flex items-center gap-2">
                  Browse All Products <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/schools" className="border-2 border-white/30 hover:border-white text-white font-semibold px-8 py-3.5 rounded-full transition-colors inline-flex items-center gap-2">
                  Find School Books
                </Link>
              </div>
            </div>

            {/* School Finder Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#f5a623]/10 rounded-xl flex items-center justify-center">
                  <Search className="w-6 h-6 text-[#f5a623]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1e3a5f]">Find Your School Books</h2>
                  <p className="text-sm text-gray-500">Select your school and class</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Select School</label>
                  <select
                    value={selectedSchool}
                    onChange={(e) => { setSelectedSchool(e.target.value); setSelectedClass(''); }}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f5a623] bg-gray-50"
                  >
                    <option value="">Choose a school...</option>
                    {schools.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {selectedSchool && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Select Class</label>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f5a623] bg-gray-50"
                    >
                      <option value="">Choose a class...</option>
                      {availableClasses.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  onClick={handleFindSchool}
                  disabled={!selectedSchool}
                  className="w-full bg-[#f5a623] hover:bg-[#e09500] disabled:bg-gray-200 disabled:text-gray-400 text-[#1e3a5f] font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  View Requirements <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1e3a5f]">Shop by Category</h2>
            <p className="text-gray-500 text-sm mt-1">Find exactly what you need</p>
          </div>
          <Link to="/shop" className="text-[#f5a623] font-semibold text-sm hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.slice(0, 8).map(cat => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4">
        <ProductGrid
          products={featuredProducts}
          title="Featured Products"
          subtitle="Handpicked quality educational products"
          viewAllLink="/shop?featured=true"
        />
      </div>

      {/* New Arrivals */}
      <div className="max-w-7xl mx-auto px-4">
        <ProductGrid
          products={newArrivals}
          title="New Arrivals"
          subtitle="Just arrived at FOCUS"
          viewAllLink="/shop?new=true"
        />
      </div>

      {/* Best Sellers */}
      <div className="max-w-7xl mx-auto px-4">
        <ProductGrid
          products={bestSellers}
          title="Best Sellers"
          subtitle="Most popular products this month"
          viewAllLink="/shop?bestseller=true"
        />
      </div>

      {/* Deals Section */}
      <section className="bg-gradient-to-r from-red-50 to-orange-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#1e3a5f]">FOCUS Deals</h2>
                <p className="text-gray-500 text-sm">Save more on quality products</p>
              </div>
            </div>
            <Link to="/shop?deals=true" className="text-red-600 font-semibold text-sm hover:underline">See All Deals →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {deals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* School Packages */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1e3a5f]">Complete School Packages</h2>
            <p className="text-gray-500 text-sm mt-1">Get everything your child needs in one package</p>
          </div>
          <Link to="/packages" className="text-[#f5a623] font-semibold text-sm hover:underline">View All Packages →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schoolPackages.map(pkg => {
            const school = schools.find(s => s.id === pkg.schoolId);
            const cls = schoolClasses.find(c => c.id === pkg.classId);
            return (
              <PackageCard key={pkg.id} pkg={pkg} schoolName={school?.name || ''} className={cls?.name || ''} />
            );
          })}
        </div>
      </section>

      {/* Why Choose FOCUS */}
      <section className="bg-[#1e3a5f] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">Why Choose FOCUS?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: Truck, title: 'Fast Ordering', desc: 'Quick and easy checkout' },
              { icon: Shield, title: 'Genuine Products', desc: '100% authentic books' },
              { icon: Store, title: 'Easy Pickup', desc: 'Collect from our store' },
              { icon: Clock, title: 'Delivery Options', desc: 'Delivered to your door' },
              { icon: Headphones, title: 'Customer Support', desc: 'We are here to help' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-[#f5a623]/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-7 h-7 text-[#f5a623]" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#f5a623] to-[#e09500] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">Ready for the New School Term?</h2>
          <p className="text-[#1e3a5f]/70 text-lg mb-8">Tell FOCUS your school and class, and we'll help you find everything you need.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/schools" className="bg-[#1e3a5f] hover:bg-[#162d4a] text-white font-bold px-8 py-3.5 rounded-full transition-colors inline-flex items-center gap-2">
              Find Your School Books <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/packages" className="bg-white hover:bg-gray-50 text-[#1e3a5f] font-bold px-8 py-3.5 rounded-full transition-colors inline-flex items-center gap-2">
              View Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
