export interface Product {
  id: string;
  sku: string;
  isbn?: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  categoryId: string;
  subcategoryId?: string;
  author?: string;
  publisher?: string;
  brand?: string;
  price: number;
  costPrice?: number;
  salePrice?: number;
  stockQuantity: number;
  lowStockThreshold: number;
  weight?: number;
  images: string[];
  status: 'active' | 'inactive' | 'discontinued';
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  parentId?: string;
  productCount: number;
}

export interface School {
  id: string;
  name: string;
  slug: string;
  logo: string;
  location: string;
  description: string;
  type: 'preschool' | 'primary' | 'jhs' | 'shs' | 'international';
  active: boolean;
}

export interface AcademicYear {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
}

export interface SchoolClass {
  id: string;
  name: string;
  level: string;
  schoolId: string;
}

export interface SchoolRequirement {
  id: string;
  schoolId: string;
  academicYearId: string;
  classId: string;
  subject: string;
  category: 'textbook' | 'stationery' | 'other';
  productId: string;
  quantity: number;
  required: boolean;
}

export interface SchoolPackage {
  id: string;
  schoolId: string;
  academicYearId: string;
  classId: string;
  name: string;
  slug: string;
  items: SchoolPackageItem[];
  retailPrice: number;
  packagePrice: number;
  savings: number;
  available: boolean;
}

export interface SchoolPackageItem {
  productId: string;
  quantity: number;
  required: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  orderStatus: 'pending' | 'payment_pending' | 'paid' | 'processing' | 'ready_for_pickup' | 'out_for_delivery' | 'completed' | 'cancelled';
  deliveryMethod: 'pickup' | 'delivery';
  address?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Customer {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  address?: string;
  city?: string;
  children: SavedChild[];
  role: 'customer' | 'admin';
}

export interface SavedChild {
  id: string;
  name: string;
  schoolId: string;
  classId: string;
  academicYearId: string;
}

export interface Review {
  id: string;
  productId: string;
  customerId: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  approved: boolean;
  createdAt: string;
}

export interface DeliveryZone {
  id: string;
  name: string;
  fee: number;
  estimatedDays: string;
  active: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
  maxDiscount?: number;
  expiryDate?: string;
  usageLimit?: number;
  usedCount: number;
  active: boolean;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}
