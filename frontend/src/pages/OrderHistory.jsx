
import React, { useEffect, useState } from 'react';
import { getAuthUser } from '@/utils/auth';
import API from '@/utils/api';
import OrderCard from '../components/OrderCard';
import { Search, Filter, Calendar, Package } from 'lucide-react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const user = getAuthUser();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get(`/orders/user/${user._id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) fetchOrders();
  }, [user]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.items.some(item => 
      item.productId.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesFilter = selectedFilter === 'all' || order.status.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Sign in to see your orders</h2>
          <p className="text-gray-600 mb-6">You'll need to sign in to view your order history.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
            Sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
            <div className="text-sm text-gray-600">
              {orders.length} order{orders.length !== 1 ? 's' : ''} placed
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search all orders"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">All Orders</option>
                <option value="delivered">Delivered</option>
                <option value="shipped">Shipped</option>
                <option value="processing">Processing</option>
                <option value="pending">Pending</option>
              </select>

              <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-md hover:border-gray-400 transition-colors bg-white">
                <Calendar className="w-4 h-4" />
                <span>Past 3 months</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-md hover:border-gray-400 transition-colors bg-white">
                <Filter className="w-4 h-4" />
                <span>More filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {orders.length === 0 ? "You haven't placed any orders yet" : "No orders match your search"}
            </h3>
            <p className="text-gray-600 mb-6">
              {orders.length === 0 
                ? "When you place your first order, it will appear here." 
                : "Try adjusting your search or filter criteria."
              }
            </p>
            {orders.length === 0 && (
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                Start shopping
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
