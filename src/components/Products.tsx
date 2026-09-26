import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Star, Package } from 'lucide-react';
import { Product } from '../types';
import { formatPrice, getDiscountPercentage } from '../data/store';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();
  const inWishlist = isInWishlist(product.id);
  const discount = product.salePrice ? getDiscountPercentage(product.price, product.salePrice) : 0;
  const effectivePrice = product.salePrice || product.price;
  const outOfStock = product.stockQuantity === 0;
  const lowStock = product.stockQuantity > 0 && product.stockQuantity <= product.lowStockThreshold;

  return (
    <div className={`group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 ${compact ? '' : 'flex flex-col'}`}>
      {/* Image */}
      <Link to={`/product/${product.slug}`} className="relative block aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
        <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{product.images[0]}</span>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discount > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{discount}% OFF</span>
          )}
          {product.newArrival && (
            <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
          )}
          {product.bestSeller && (
            <span className="bg-[#f5a623] text-[#1e3a5f] text-[10px] font-bold px-2 py-0.5 rounded-full">BEST SELLER</span>
          )}
        </div>

        {/* Stock Status */}
        {outOfStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-800 text-xs font-bold px-3 py-1 rounded-full">OUT OF STOCK</span>
          </div>
        )}
        {lowStock && (
          <span className="absolute bottom-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            Only {product.stockQuantity} left
          </span>
        )}

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.preventDefault(); inWishlist ? removeFromWishlist(product.id) : addToWishlist(product.id); }}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${inWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:text-red-500'}`}
          >
            <Heart className="w-4 h-4" fill={inWishlist ? 'currentColor' : 'none'} />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <Link to={`/product/${product.slug}`} className="flex-1">
          <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">
            {product.author || product.brand || product.publisher || ''}
          </p>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug mb-2 group-hover:text-[#1e3a5f] transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className={`w-3 h-3 ${star <= Math.round(product.rating) ? 'text-[#f5a623] fill-[#f5a623]' : 'text-gray-200'}`} />
              ))}
            </div>
            <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
          </div>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-[#1e3a5f]">{formatPrice(effectivePrice)}</span>
          {product.salePrice && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(product.price)}</span>
          )}
        </div>

        {/* Add to Cart */}
        {!outOfStock && (
          <button
            onClick={() => addToCart(product.id)}
            className="w-full bg-[#f5a623] hover:bg-[#e09500] text-[#1e3a5f] font-semibold text-sm py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        )}
        {outOfStock && (
          <button disabled className="w-full bg-gray-100 text-gray-400 font-semibold text-sm py-2.5 rounded-xl cursor-not-allowed">
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
}

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  viewAllLink?: string;
  columns?: number;
}

export function ProductGrid({ products, title, subtitle, viewAllLink, columns }: ProductGridProps) {
  return (
    <section className="py-8">
      {(title || viewAllLink) && (
        <div className="flex items-center justify-between mb-6">
          <div>
            {title && <h2 className="text-2xl font-bold text-[#1e3a5f]">{title}</h2>}
            {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
          </div>
          {viewAllLink && (
            <Link to={viewAllLink} className="text-[#f5a623] font-semibold text-sm hover:underline flex items-center gap-1">
              View All →
            </Link>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export function PackageCard({ pkg, schoolName, className }: { pkg: any; schoolName: string; className: string }) {
  const { addToCart } = useApp();
  const totalItems = pkg.items.length;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-[#1e3a5f] text-lg">{schoolName}</h3>
          <p className="text-sm text-gray-500">{className}</p>
        </div>
        <Package className="w-8 h-8 text-[#f5a623]" />
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">{totalItems} items</span>
        <span className="bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">Save {formatPrice(pkg.savings)}</span>
      </div>

      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-2xl font-bold text-[#1e3a5f]">{formatPrice(pkg.packagePrice)}</span>
        <span className="text-sm text-gray-400 line-through">{formatPrice(pkg.retailPrice)}</span>
      </div>

      <button
        onClick={() => {
          pkg.items.forEach((item: any) => addToCart(item.productId, item.quantity));
        }}
        className="w-full bg-[#f5a623] hover:bg-[#e09500] text-[#1e3a5f] font-semibold py-3 rounded-xl transition-colors"
      >
        Add Complete Package
      </button>
    </div>
  );
}

export function CategoryCard({ category }: { category: any }) {
  return (
    <Link
      to={`/shop?cat=${category.slug}`}
      className="bg-white rounded-2xl border border-gray-100 p-6 text-center hover:shadow-lg hover:border-[#f5a623]/30 transition-all group"
    >
      <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform">{category.icon}</span>
      <h3 className="font-semibold text-gray-800 text-sm group-hover:text-[#1e3a5f] transition-colors">{category.name}</h3>
      <p className="text-xs text-gray-400 mt-1">{category.productCount} products</p>
    </Link>
  );
}
