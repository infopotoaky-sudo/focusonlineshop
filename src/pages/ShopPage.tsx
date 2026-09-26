import React, { useState, useMemo } from 'react';
import { Filter, X, SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import { products, categories, formatPrice, searchProducts } from '../data/store';
import { ProductCard } from '../components/Products';

function getSearchParams() {
  const hash = window.location.hash;
  const qIndex = hash.indexOf('?');
  if (qIndex === -1) return new URLSearchParams();
  return new URLSearchParams(hash.substring(qIndex));
}

export function ShopPage() {
  const searchParams = getSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const catSlug = searchParams.get('cat');
    if (catSlug) {
      const cat = categories.find(c => c.slug === catSlug);
      if (cat) return [cat.id];
    }
    return [];
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const catSlug = searchParams.get('cat');
  const isDeals = searchParams.get('deals') === 'true';
  const isNew = searchParams.get('new') === 'true';
  const isBestseller = searchParams.get('bestseller') === 'true';
  const isFeatured = searchParams.get('featured') === 'true';

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => p.status === 'active');

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.categoryId));
    }

    // Deals filter
    if (isDeals) {
      result = result.filter(p => p.salePrice);
    }

    // New arrivals
    if (isNew) {
      result = result.filter(p => p.newArrival);
    }

    // Best sellers
    if (isBestseller) {
      result = result.filter(p => p.bestSeller);
    }

    // Featured
    if (isFeatured) {
      result = result.filter(p => p.featured);
    }

    // Price filter
    result = result.filter(p => {
      const price = p.salePrice || p.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort
    switch (sortBy) {
      case 'price_low':
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price_high':
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'bestselling':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [selectedCategories, priceRange, sortBy, isDeals, isNew, isBestseller, isFeatured]);

  const toggleCategory = (catId: string) => {
    setSelectedCategories(prev =>
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a5f]">
            {isDeals ? 'Deals & Discounts' : isNew ? 'New Arrivals' : isBestseller ? 'Best Sellers' : isFeatured ? 'Featured Products' : 'Shop All Products'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{filteredProducts.length} products found</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
          >
            <option value="newest">Newest</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="bestselling">Best Selling</option>
          </select>
          <div className="hidden md:flex border border-gray-200 rounded-xl overflow-hidden">
            <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-[#1e3a5f] text-white' : 'text-gray-500'}`}>
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-[#1e3a5f] text-white' : 'text-gray-500'}`}>
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden'} md:block md:relative md:w-64 flex-shrink-0`}>
          <div className="flex items-center justify-between mb-6 md:hidden">
            <h3 className="font-bold text-lg">Filters</h3>
            <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="font-semibold text-[#1e3a5f] mb-3 text-sm uppercase tracking-wide">Categories</h3>
            <div className="space-y-2">
              {categories.map(cat => (
                <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                    className="w-4 h-4 rounded border-gray-300 text-[#f5a623] focus:ring-[#f5a623]"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-[#1e3a5f]">{cat.icon} {cat.name}</span>
                  <span className="text-xs text-gray-400 ml-auto">({cat.productCount})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <h3 className="font-semibold text-[#1e3a5f] mb-3 text-sm uppercase tracking-wide">Price Range</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                placeholder="Min"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Availability */}
          <div className="mb-8">
            <h3 className="font-semibold text-[#1e3a5f] mb-3 text-sm uppercase tracking-wide">Availability</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#f5a623] focus:ring-[#f5a623]" />
              <span className="text-sm text-gray-600">In Stock Only</span>
            </label>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => { setSelectedCategories([]); setPriceRange([0, 500]); }}
            className="text-sm text-red-500 hover:underline"
          >
            Clear All Filters
          </button>

          {showFilters && (
            <button
              onClick={() => setShowFilters(false)}
              className="md:hidden mt-6 w-full bg-[#f5a623] text-[#1e3a5f] font-bold py-3 rounded-xl"
            >
              Apply Filters
            </button>
          )}
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">🔍</p>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
