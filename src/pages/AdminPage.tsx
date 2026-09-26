import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Package, Users, ShoppingCart, TrendingUp, AlertTriangle, DollarSign, Eye, Edit, Trash2, Plus, Search, Filter, Download, CheckCircle, Clock, XCircle, Truck, ChevronRight, Settings, BookOpen } from 'lucide-react';
import { products, schools, demoOrders, formatPrice, categories, schoolPackages } from '../data/store';
import { useApp } from '../context/AppContext';

export function AdminPage() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { state, dispatch } = useApp();

  const allOrders = [...demoOrders, ...state.orders];
  const totalRevenue = allOrders.filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = allOrders.filter(o => o.orderStatus === 'pending' || o.orderStatus === 'processing').length;
  const lowStockProducts = products.filter(p => p.stockQuantity <= p.lowStockThreshold && p.stockQuantity > 0);
  const outOfStockProducts = products.filter(p => p.stockQuantity === 0);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'inventory', label: 'Inventory', icon: AlertTriangle },
    { id: 'schools', label: 'Schools', icon: BookOpen },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'reports', label: 'Reports', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-[#1e3a5f] min-h-screen p-4 fixed left-0 top-0">
          <div className="flex items-center gap-2 mb-8 px-2">
            <div className="w-8 h-8 bg-[#f5a623] rounded-lg flex items-center justify-center">
              <span className="text-[#1e3a5f] font-bold text-sm">F</span>
            </div>
            <span className="text-white font-bold">FOCUS Admin</span>
          </div>
          <nav className="space-y-1">
            {sidebarItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === item.id ? 'bg-[#f5a623] text-[#1e3a5f]' : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-8 pt-8 border-t border-white/10">
            <Link to="/" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-400 hover:text-white">
              ← Back to Store
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          {/* Mobile Header */}
          <div className="lg:hidden bg-[#1e3a5f] p-4 flex items-center justify-between">
            <span className="text-white font-bold">FOCUS Admin</span>
            <select value={activeSection} onChange={e => setActiveSection(e.target.value)} className="bg-white/10 text-white text-sm rounded-lg px-3 py-1.5 border border-white/20">
              {sidebarItems.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </div>

          <div className="p-4 md:p-8">
            {activeSection === 'dashboard' && <DashboardSection totalRevenue={totalRevenue} pendingOrders={pendingOrders} lowStockProducts={lowStockProducts} orders={allOrders} />}
            {activeSection === 'orders' && <OrdersSection orders={allOrders} dispatch={dispatch} />}
            {activeSection === 'products' && <ProductsSection />}
            {activeSection === 'inventory' && <InventorySection lowStockProducts={lowStockProducts} outOfStockProducts={outOfStockProducts} />}
            {activeSection === 'schools' && <SchoolsSection />}
            {activeSection === 'customers' && <CustomersSection />}
            {activeSection === 'reports' && <ReportsSection />}
            {activeSection === 'settings' && <SettingsSection />}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardSection({ totalRevenue, pendingOrders, lowStockProducts, orders }: any) {
  const todayOrders = orders.filter((o: any) => new Date(o.createdAt).toDateString() === new Date().toDateString()).length;
  
  const stats = [
    { label: 'Total Revenue', value: formatPrice(totalRevenue), icon: DollarSign, color: 'bg-green-50 text-green-600' },
    { label: 'Total Orders', value: orders.length.toString(), icon: ShoppingCart, color: 'bg-blue-50 text-blue-600' },
    { label: 'Pending Orders', value: pendingOrders.toString(), icon: Clock, color: 'bg-orange-50 text-orange-600' },
    { label: 'Low Stock Items', value: lowStockProducts.length.toString(), icon: AlertTriangle, color: 'bg-red-50 text-red-600' },
    { label: 'Total Products', value: products.length.toString(), icon: Package, color: 'bg-purple-50 text-purple-600' },
    { label: 'Total Schools', value: schools.length.toString(), icon: BookOpen, color: 'bg-indigo-50 text-indigo-600' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1e3a5f] mb-6">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${stat.color}`}>
              <stat.icon className="w-4 h-4" />
            </div>
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p className="text-lg font-bold text-[#1e3a5f]">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
        <h3 className="font-bold text-[#1e3a5f] mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="pb-3 font-medium">Order</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Total</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order: any) => (
                <tr key={order.id} className="border-b border-gray-50">
                  <td className="py-3 font-medium text-[#1e3a5f]">#{order.orderNumber}</td>
                  <td className="py-3 text-gray-600">{order.customerId}</td>
                  <td className="py-3 font-medium">{formatPrice(order.total)}</td>
                  <td className="py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
                      order.orderStatus === 'completed' ? 'bg-green-50 text-green-700' :
                      order.orderStatus === 'cancelled' ? 'bg-red-50 text-red-700' :
                      'bg-blue-50 text-blue-700'
                    }`}>
                      {order.orderStatus.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-bold text-[#1e3a5f] mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" /> Low Stock Alerts
          </h3>
          <div className="space-y-2">
            {lowStockProducts.slice(0, 5).map((p: any) => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{p.images[0]}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{p.name}</p>
                    <p className="text-xs text-gray-400">SKU: {p.sku}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-orange-600">{p.stockQuantity} left</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function OrdersSection({ orders, dispatch }: any) {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const order = orders.find((o: any) => o.id === orderId);
    if (order) {
      dispatch({ type: 'UPDATE_ORDER', order: { ...order, orderStatus: newStatus, updatedAt: new Date().toISOString() } });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1e3a5f] mb-6">Orders Management</h1>
      
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-500">
                <th className="p-4 font-medium">Order #</th>
                <th className="p-4 font-medium">Items</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Payment</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-medium text-[#1e3a5f]">#{order.orderNumber}</td>
                  <td className="p-4 text-gray-600">{order.items.length} items</td>
                  <td className="p-4 font-medium">{formatPrice(order.total)}</td>
                  <td className="p-4">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
                      order.paymentStatus === 'paid' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                    }`}>{order.paymentStatus}</span>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
                      order.orderStatus === 'completed' ? 'bg-green-50 text-green-700' :
                      order.orderStatus === 'cancelled' ? 'bg-red-50 text-red-700' :
                      'bg-blue-50 text-blue-700'
                    }`}>{order.orderStatus.replace('_', ' ')}</span>
                  </td>
                  <td className="p-4 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <button onClick={() => setSelectedOrder(order)} className="text-[#f5a623] hover:underline text-xs font-medium">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-[#1e3a5f] text-lg mb-4">Order #{selectedOrder.orderNumber}</h3>
            
            <div className="space-y-3 mb-6">
              <p className="text-sm"><span className="text-gray-500">Delivery:</span> {selectedOrder.deliveryMethod}</p>
              {selectedOrder.address && <p className="text-sm"><span className="text-gray-500">Address:</span> {selectedOrder.address}</p>}
              {selectedOrder.notes && <p className="text-sm"><span className="text-gray-500">Notes:</span> {selectedOrder.notes}</p>}
            </div>

            <h4 className="font-semibold text-sm mb-2">Items</h4>
            <div className="space-y-2 mb-6">
              {selectedOrder.items.map((item: any, i: number) => (
                <div key={i} className="flex justify-between text-sm py-1 border-b border-gray-50">
                  <span>{item.productName} × {item.quantity}</span>
                  <span className="font-medium">{formatPrice(item.totalPrice)}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold pt-2">
                <span>Total</span>
                <span>{formatPrice(selectedOrder.total)}</span>
              </div>
            </div>

            {/* Order Preparation Checklist */}
            <h4 className="font-semibold text-sm mb-2">Order Preparation</h4>
            <div className="space-y-2 mb-6">
              {selectedOrder.items.map((item: any, i: number) => (
                <label key={i} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded border-gray-300 text-[#f5a623]" />
                  <span>{item.productName} × {item.quantity}</span>
                </label>
              ))}
            </div>

            {/* Update Status */}
            <div className="flex flex-wrap gap-2">
              {['pending', 'processing', 'ready_for_pickup', 'out_for_delivery', 'completed', 'cancelled'].map(status => (
                <button
                  key={status}
                  onClick={() => { updateOrderStatus(selectedOrder.id, status); setSelectedOrder(null); }}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium capitalize ${
                    selectedOrder.orderStatus === status ? 'bg-[#1e3a5f] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status.replace('_', ' ')}
                </button>
              ))}
            </div>

            <button onClick={() => setSelectedOrder(null)} className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Products</h1>
        <button className="bg-[#f5a623] text-[#1e3a5f] font-bold px-4 py-2 rounded-xl text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm" />
        </div>
        <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm flex items-center gap-2">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-500">
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">SKU</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Stock</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{product.images[0]}</span>
                      <div>
                        <p className="font-medium text-gray-800 text-xs">{product.name}</p>
                        <p className="text-[10px] text-gray-400">{categories.find(c => c.id === product.categoryId)?.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 text-xs">{product.sku}</td>
                  <td className="p-4 font-medium text-xs">{formatPrice(product.salePrice || product.price)}</td>
                  <td className="p-4">
                    <span className={`text-xs font-medium ${product.stockQuantity <= product.lowStockThreshold ? 'text-orange-600' : 'text-gray-600'}`}>
                      {product.stockQuantity}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${product.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-[#1e3a5f]"><Eye className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 text-gray-400 hover:text-[#f5a623]"><Edit className="w-3.5 h-3.5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function InventorySection({ lowStockProducts, outOfStockProducts }: any) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1e3a5f] mb-6">Inventory Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-2xl font-bold text-[#1e3a5f]">{products.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-orange-100 p-4">
          <p className="text-sm text-orange-600">Low Stock</p>
          <p className="text-2xl font-bold text-orange-600">{lowStockProducts.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-red-100 p-4">
          <p className="text-sm text-red-600">Out of Stock</p>
          <p className="text-2xl font-bold text-red-600">{outOfStockProducts.length}</p>
        </div>
      </div>

      {/* Package Incomplete Alerts */}
      {schoolPackages.filter(pkg => {
        return pkg.items.some(item => {
          const product = products.find(p => p.id === item.productId);
          return product && product.stockQuantity < item.quantity;
        });
      }).map(pkg => (
        <div key={pkg.id} className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
          <p className="text-sm font-medium text-orange-800">⚠️ PACKAGE INCOMPLETE</p>
          <p className="text-xs text-orange-600 mt-1">{pkg.name} — Some required products are low on stock</p>
        </div>
      ))}

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-500">
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">SKU</th>
                <th className="p-4 font-medium">Current Stock</th>
                <th className="p-4 font-medium">Low Stock Alert</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-t border-gray-100">
                  <td className="p-4 flex items-center gap-2">
                    <span>{p.images[0]}</span>
                    <span className="text-xs font-medium">{p.name}</span>
                  </td>
                  <td className="p-4 text-xs text-gray-600">{p.sku}</td>
                  <td className="p-4 font-medium text-xs">{p.stockQuantity}</td>
                  <td className="p-4 text-xs text-gray-500">{p.lowStockThreshold}</td>
                  <td className="p-4">
                    {p.stockQuantity === 0 ? (
                      <span className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full">Out of Stock</span>
                    ) : p.stockQuantity <= p.lowStockThreshold ? (
                      <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">Low Stock</span>
                    ) : (
                      <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">In Stock</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SchoolsSection() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Schools Management</h1>
        <button className="bg-[#f5a623] text-[#1e3a5f] font-bold px-4 py-2 rounded-xl text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add School
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schools.map(school => (
          <div key={school.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4">
            <span className="text-3xl">{school.logo}</span>
            <div className="flex-1">
              <h3 className="font-semibold text-[#1e3a5f] text-sm">{school.name}</h3>
              <p className="text-xs text-gray-500">{school.location} • {school.type}</p>
            </div>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${school.active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
              {school.active ? 'Active' : 'Inactive'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomersSection() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1e3a5f] mb-6">Customers</h1>
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <p className="text-gray-500 text-sm">Customer management will show registered customers here. Demo data shows sample customers.</p>
        <div className="mt-4 space-y-3">
          {['Akua Mensah - 0241234567', 'Kofi Asante - 0201234567', 'Ama Darko - 0271234567'].map((c, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white text-xs font-bold">{c[0]}</div>
                <span className="text-sm font-medium">{c}</span>
              </div>
              <button className="text-xs text-[#f5a623] font-medium">View Orders</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReportsSection() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1e3a5f] mb-6">Reports & Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-bold text-[#1e3a5f] mb-4">Sales Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between"><span className="text-sm text-gray-500">Today</span><span className="font-medium">GH₵0.00</span></div>
            <div className="flex justify-between"><span className="text-sm text-gray-500">This Week</span><span className="font-medium">GH₵304.00</span></div>
            <div className="flex justify-between"><span className="text-sm text-gray-500">This Month</span><span className="font-medium">GH₵304.00</span></div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-bold text-[#1e3a5f] mb-4">Top Products</h3>
          <div className="space-y-3">
            {products.filter(p => p.bestSeller).slice(0, 5).map(p => (
              <div key={p.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{p.images[0]}</span>
                  <span className="text-xs">{p.name}</span>
                </div>
                <span className="text-xs font-medium text-[#f5a623]">{p.reviewCount} sold</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-bold text-[#1e3a5f] mb-4">School Package Analytics</h3>
          <div className="space-y-3">
            {schoolPackages.map(pkg => (
              <div key={pkg.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{pkg.name}</span>
                <span className="font-medium">{formatPrice(pkg.packagePrice)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-bold text-[#1e3a5f] mb-4">Export Reports</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 bg-gray-50 rounded-lg text-sm hover:bg-gray-100">📊 Sales Report (CSV)</button>
            <button className="w-full text-left px-4 py-2 bg-gray-50 rounded-lg text-sm hover:bg-gray-100">📦 Inventory Report (CSV)</button>
            <button className="w-full text-left px-4 py-2 bg-gray-50 rounded-lg text-sm hover:bg-gray-100">👥 Customer Report (CSV)</button>
            <button className="w-full text-left px-4 py-2 bg-gray-50 rounded-lg text-sm hover:bg-gray-100">🏫 School Package Report (CSV)</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1e3a5f] mb-6">Settings</h1>
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-bold text-[#1e3a5f] mb-4">Store Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Store Name</label>
              <input type="text" defaultValue="FOCUS" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">WhatsApp Number</label>
              <input type="text" defaultValue="+233 00 000 0000" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
              <input type="email" defaultValue="info@focusstore.com" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Address</label>
              <input type="text" defaultValue="Accra, Ghana" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-bold text-[#1e3a5f] mb-4">BMS Integration</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">BMS API URL</label>
              <input type="text" placeholder="https://api.focus-bms.com" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">BMS API Key</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              <span>BMS not connected — Configure API credentials to enable sync</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-bold text-[#1e3a5f] mb-4">Payment Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Payment Gateway</label>
              <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm">
                <option>Select provider...</option>
                <option>Paystack</option>
                <option>Flutterwave</option>
                <option>Hubtel</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Public Key</label>
              <input type="text" placeholder="pk_..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Secret Key</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" />
            </div>
          </div>
        </div>
        <button className="bg-[#f5a623] text-[#1e3a5f] font-bold px-6 py-2.5 rounded-xl text-sm">Save Settings</button>
      </div>
    </div>
  );
}
