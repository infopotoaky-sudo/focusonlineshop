import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, MessageCircle, ChevronRight, Minus, Plus, CheckCircle } from 'lucide-react';
import { getProductBySlug, products, formatPrice, getDiscountPercentage, reviews, categories } from '../data/store';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/Products';

export function ProductPage() {
  const { slug } = useParams();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, dispatch, state } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = getProductBySlug(slug || '');

  useEffect(() => {
    if (product) {
      dispatch({ type: 'ADD_RECENTLY_VIEWED', productId: product.id });
    }
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-4xl mb-4">📦</p>
        <h2 className="text-xl font-bold text-gray-800">Product not found</h2>
        <Link to="/shop" className="text-[#f5a623] font-medium mt-4 inline-block">← Back to Shop</Link>
      </div>
    );
  }

  const effectivePrice = product.salePrice || product.price;
  const discount = product.salePrice ? getDiscountPercentage(product.price, product.salePrice) : 0;
  const inWishlist = isInWishlist(product.id);
  const outOfStock = product.stockQuantity === 0;
  const lowStock = product.stockQuantity > 0 && product.stockQuantity <= product.lowStockThreshold;
  const productReviews = reviews.filter(r => r.productId === product.id && r.approved);
  const category = categories.find(c => c.id === product.categoryId);
  
  // Related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.categoryId === product.categoryId && p.status === 'active')
    .slice(0, 5);

  const whatsappMessage = encodeURIComponent(`Hello FOCUS, I would like to order:\n\n${product.name} × ${quantity}\nPrice: ${formatPrice(effectivePrice)}\n\nTotal: ${formatPrice(effectivePrice * quantity)}`);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
        <Link to="/" className="hover:text-[#1e3a5f]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/shop" className="hover:text-[#1e3a5f]">Shop</Link>
        <ChevronRight className="w-3 h-3" />
        {category && <><Link to={`/shop?cat=${category.slug}`} className="hover:text-[#1e3a5f]">{category.name}</Link><ChevronRight className="w-3 h-3" /></>}
        <span className="text-[#1e3a5f] font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl aspect-square flex items-center justify-center mb-4 relative overflow-hidden">
            <span className="text-[120px] md:text-[160px]">{product.images[0]}</span>
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">{discount}% OFF</span>
            )}
            {product.newArrival && (
              <span className="absolute top-4 right-4 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">NEW</span>
            )}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="mb-2">
            {category && <span className="text-xs text-[#f5a623] font-semibold uppercase tracking-wide">{category.name}</span>}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-3">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className={`w-5 h-5 ${star <= Math.round(product.rating) ? 'text-[#f5a623] fill-[#f5a623]' : 'text-gray-200'}`} />
              ))}
            </div>
            <span className="text-sm text-gray-500">{product.rating} ({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-[#1e3a5f]">{formatPrice(effectivePrice)}</span>
            {product.salePrice && (
              <>
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.price)}</span>
                <span className="bg-red-50 text-red-600 text-sm font-bold px-2 py-0.5 rounded-full">Save {formatPrice(product.price - product.salePrice)}</span>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {outOfStock ? (
              <span className="text-red-500 font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span> Out of Stock
              </span>
            ) : lowStock ? (
              <span className="text-orange-500 font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span> Only {product.stockQuantity} left in stock
              </span>
            ) : (
              <span className="text-green-600 font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> In Stock
              </span>
            )}
          </div>

          {/* Short Description */}
          <p className="text-gray-600 mb-6">{product.shortDescription}</p>

          {/* Details */}
          <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
            {product.author && <div><span className="text-gray-400">Author:</span> <span className="text-gray-700 font-medium">{product.author}</span></div>}
            {product.publisher && <div><span className="text-gray-400">Publisher:</span> <span className="text-gray-700 font-medium">{product.publisher}</span></div>}
            {product.isbn && <div><span className="text-gray-400">ISBN:</span> <span className="text-gray-700 font-medium">{product.isbn}</span></div>}
            <div><span className="text-gray-400">SKU:</span> <span className="text-gray-700 font-medium">{product.sku}</span></div>
          </div>

          {/* Quantity & Add to Cart */}
          {!outOfStock && (
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-gray-50">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-3 font-medium min-w-[50px] text-center">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))} className="px-4 py-3 hover:bg-gray-50">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => addToCart(product.id, quantity)}
                className="flex-1 bg-[#f5a623] hover:bg-[#e09500] text-[#1e3a5f] font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${inWishlist ? 'border-red-200 bg-red-50 text-red-600' : 'border-gray-200 text-gray-600 hover:border-[#f5a623]'}`}
            >
              <Heart className="w-4 h-4" fill={inWishlist ? 'currentColor' : 'none'} />
              {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
            </button>
            <a
              href={`https://wa.me/233000000000?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-green-200 bg-green-50 text-green-700 text-sm font-medium hover:bg-green-100 transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> Order via WhatsApp
            </a>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="text-center">
              <Truck className="w-5 h-5 text-[#1e3a5f] mx-auto mb-1" />
              <p className="text-xs text-gray-600">Fast Delivery</p>
            </div>
            <div className="text-center">
              <Shield className="w-5 h-5 text-[#1e3a5f] mx-auto mb-1" />
              <p className="text-xs text-gray-600">Genuine Product</p>
            </div>
            <div className="text-center">
              <RotateCcw className="w-5 h-5 text-[#1e3a5f] mx-auto mb-1" />
              <p className="text-xs text-gray-600">Easy Returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Description */}
      <div className="mt-12 bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl font-bold text-[#1e3a5f] mb-4">Description</h2>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      {/* Reviews */}
      {productReviews.length > 0 && (
        <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-bold text-[#1e3a5f] mb-6">Customer Reviews ({productReviews.length})</h2>
          <div className="space-y-6">
            {productReviews.map(review => (
              <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {review.customerName[0]}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-800">{review.customerName}</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className={`w-3 h-3 ${s <= review.rating ? 'text-[#f5a623] fill-[#f5a623]' : 'text-gray-200'}`} />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 ml-auto">{review.createdAt}</span>
                </div>
                <h4 className="font-semibold text-sm text-gray-800 mb-1">{review.title}</h4>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-[#1e3a5f] mb-6">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
