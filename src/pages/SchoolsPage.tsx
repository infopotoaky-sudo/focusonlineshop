import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight, GraduationCap, BookOpen, CheckCircle, ShoppingCart, MessageCircle, Package, ChevronRight } from 'lucide-react';
import { schools, schoolClasses, academicYears, schoolRequirements, schoolPackages, products, getProductById, formatPrice, getSchoolBySlug } from '../data/store';
import { useApp } from '../context/AppContext';

export function SchoolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filteredSchools = schools.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !typeFilter || s.type === typeFilter;
    return matchesSearch && matchesType && s.active;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4a70] rounded-3xl p-8 md:p-12 mb-12 text-white">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-8 h-8 text-[#f5a623]" />
            <h1 className="text-3xl md:text-4xl font-bold">Find Your School Books</h1>
          </div>
          <p className="text-gray-300 text-lg mb-8">Select your school and class to see the complete book and supplies list. Get everything you need in one convenient package.</p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for a school..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-3.5 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
            >
              <option value="">All Types</option>
              <option value="preschool">Preschool</option>
              <option value="primary">Primary</option>
              <option value="jhs">JHS</option>
              <option value="shs">SHS</option>
              <option value="international">International</option>
            </select>
          </div>
        </div>
      </div>

      {/* School Grid */}
      <h2 className="text-xl font-bold text-[#1e3a5f] mb-6">
        {searchQuery ? `Search Results (${filteredSchools.length})` : 'All Schools'}
      </h2>
      
      {filteredSchools.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-4">🏫</p>
          <h3 className="text-lg font-semibold text-gray-800">No schools found</h3>
          <p className="text-gray-500">Try a different search term or filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map(school => {
            const classCount = schoolClasses.filter(c => c.schoolId === school.id).length;
            const hasPackage = schoolPackages.some(p => p.schoolId === school.id);
            return (
              <Link
                key={school.id}
                to={`/schools/${school.slug}`}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-[#f5a623]/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    {school.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#1e3a5f] group-hover:text-[#f5a623] transition-colors">{school.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <MapPin className="w-3.5 h-3.5" /> {school.location}
                    </div>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-2">{school.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full capitalize">{school.type}</span>
                      <span className="bg-gray-50 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">{classCount} classes</span>
                      {hasPackage && <span className="bg-green-50 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">📦 Package Available</span>}
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-sm text-gray-500">View requirements</span>
                  <ArrowRight className="w-4 h-4 text-[#f5a623] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function SchoolDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useApp();
  
  const urlParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const initialClass = urlParams.get('class') || hashParams.get('class') || '';
  
  const school = getSchoolBySlug(slug || '');
  const [selectedYear, setSelectedYear] = useState(academicYears[academicYears.length - 1]?.id || '');
  const [selectedClass, setSelectedClass] = useState(initialClass);
  
  const classes = school ? schoolClasses.filter(c => c.schoolId === school.id) : [];
  const requirements = school && selectedClass ? schoolRequirements.filter(r => r.schoolId === school.id && r.classId === selectedClass && r.academicYearId === selectedYear) : [];
  const pkg = school && selectedClass ? schoolPackages.find(p => p.schoolId === school.id && p.classId === selectedClass && p.academicYearId === selectedYear) : undefined;



  if (!school) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-4xl mb-4">🏫</p>
        <h2 className="text-xl font-bold text-gray-800">School not found</h2>
        <Link to="/schools" className="text-[#f5a623] font-medium mt-4 inline-block">← Back to Schools</Link>
      </div>
    );
  }

  const textbooks = requirements.filter(r => r.category === 'textbook');
  const stationery = requirements.filter(r => r.category === 'stationery');
  const others = requirements.filter(r => r.category === 'other');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/schools" className="hover:text-[#1e3a5f]">Schools</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#1e3a5f] font-medium">{school.name}</span>
      </nav>

      {/* School Header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
            {school.logo}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a5f]">{school.name}</h1>
            <div className="flex items-center gap-2 text-gray-500 mt-2">
              <MapPin className="w-4 h-4" /> {school.location}
              <span className="mx-2">•</span>
              <span className="capitalize">{school.type}</span>
            </div>
            <p className="text-gray-600 mt-3">{school.description}</p>
          </div>
        </div>
      </div>

      {/* Selectors */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
        <h2 className="font-bold text-[#1e3a5f] text-lg mb-4">Select Class & Year</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Academic Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
            >
              {academicYears.map(y => (
                <option key={y.id} value={y.id}>{y.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Class / Form</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
            >
              <option value="">Select a class...</option>
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Requirements */}
      {selectedClass && requirements.length > 0 && (
        <>
          {/* Package Card */}
          {pkg && (
            <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4a70] rounded-2xl p-6 md:p-8 mb-8 text-white">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-5 h-5 text-[#f5a623]" />
                    <span className="text-[#f5a623] font-medium text-sm">COMPLETE PACKAGE</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                  <p className="text-gray-300 text-sm">{pkg.items.length} items included</p>
                  <div className="flex items-baseline gap-3 mt-3">
                    <span className="text-3xl font-bold text-[#f5a623]">{formatPrice(pkg.packagePrice)}</span>
                    <span className="text-gray-400 line-through">{formatPrice(pkg.retailPrice)}</span>
                    <span className="bg-green-500/20 text-green-400 text-sm font-medium px-2 py-0.5 rounded-full">Save {formatPrice(pkg.savings)}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => pkg.items.forEach(item => addToCart(item.productId, item.quantity))}
                    className="bg-[#f5a623] hover:bg-[#e09500] text-[#1e3a5f] font-bold px-8 py-3 rounded-xl transition-colors flex items-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" /> Add Complete Package
                  </button>
                  <a
                    href={`https://wa.me/233000000000?text=Hello FOCUS, I'm interested in the ${pkg.name} package.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white/30 text-white font-medium px-8 py-3 rounded-xl transition-colors flex items-center gap-2 justify-center hover:bg-white/10"
                  >
                    <MessageCircle className="w-4 h-4" /> Ask on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Requirements List */}
          <div className="space-y-8">
            {textbooks.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" /> TEXTBOOKS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {textbooks.map(req => {
                    const product = getProductById(req.productId);
                    if (!product) return null;
                    return (
                      <RequirementItem key={req.id} product={product} quantity={req.quantity} required={req.required} />
                    );
                  })}
                </div>
              </div>
            )}

            {stationery.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-4 flex items-center gap-2">
                  ✏️ STATIONERY
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stationery.map(req => {
                    const product = getProductById(req.productId);
                    if (!product) return null;
                    return (
                      <RequirementItem key={req.id} product={product} quantity={req.quantity} required={req.required} />
                    );
                  })}
                </div>
              </div>
            )}

            {others.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-4 flex items-center gap-2">
                  📦 OTHER REQUIREMENTS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {others.map(req => {
                    const product = getProductById(req.productId);
                    if (!product) return null;
                    return (
                      <RequirementItem key={req.id} product={product} quantity={req.quantity} required={req.required} />
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Add All Button */}
          <div className="mt-8 bg-gray-50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              <strong>{requirements.length} items</strong> required for this class
            </p>
            <button
              onClick={() => requirements.forEach(r => addToCart(r.productId, r.quantity))}
              className="bg-[#f5a623] hover:bg-[#e09500] text-[#1e3a5f] font-bold px-8 py-3 rounded-xl transition-colors flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" /> Add All Items to Cart
            </button>
          </div>
        </>
      )}

      {selectedClass && requirements.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-4xl mb-4">📋</p>
          <h3 className="text-lg font-semibold text-gray-800">No requirements available yet</h3>
          <p className="text-gray-500 mt-2">This school's book list for the selected class hasn't been uploaded yet. Contact us for assistance.</p>
        </div>
      )}
    </div>
  );
}

function RequirementItem({ product, quantity, required }: { product: any; quantity: number; required: boolean }) {
  const { addToCart } = useApp();
  const price = product.salePrice || product.price;
  const outOfStock = product.stockQuantity === 0;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-start gap-3">
      <span className="text-3xl flex-shrink-0">{product.images[0]}</span>
      <div className="flex-1 min-w-0">
        <Link to={`/product/${product.slug}`} className="font-medium text-sm text-gray-800 hover:text-[#1e3a5f] line-clamp-2">
          {product.name}
        </Link>
        <p className="text-xs text-gray-400 mt-0.5">Qty: {quantity}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold text-[#1e3a5f]">{formatPrice(price)}</span>
          {required && <span className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded-full font-medium">Required</span>}
        </div>
      </div>
      {!outOfStock ? (
        <button onClick={() => addToCart(product.id, quantity)} className="flex-shrink-0 w-8 h-8 bg-[#f5a623] rounded-lg flex items-center justify-center hover:bg-[#e09500] transition-colors">
          <ShoppingCart className="w-4 h-4 text-[#1e3a5f]" />
        </button>
      ) : (
        <span className="flex-shrink-0 text-[10px] text-red-500 font-medium">Unavailable</span>
      )}
    </div>
  );
}
