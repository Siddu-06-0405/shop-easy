
import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, Calendar, Star } from 'lucide-react';

interface OrderItem {
  _id: string;
  productId: {
    _id: string;
    title: string;
    imageURL: string;
    price: number;
  };
  quantity: number;
}

interface Order {
  _id: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
  deliveryDate?: string;
}

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-700 bg-green-50';
      case 'shipped':
        return 'text-blue-700 bg-blue-50';
      case 'processing':
        return 'text-yellow-700 bg-yellow-50';
      case 'pending':
        return 'text-orange-700 bg-orange-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-4 overflow-hidden">
      {/* Order Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div>
              <span className="text-gray-600">ORDER PLACED</span>
              <div className="font-medium text-gray-900">{formatDate(order.createdAt)}</div>
            </div>
            <div>
              <span className="text-gray-600">TOTAL</span>
              <div className="font-medium text-gray-900">₹{order.totalAmount?.toFixed(2)}</div>
            </div>
            <div>
              <span className="text-gray-600">SHIP TO</span>
              <div className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                Your Address ▼
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-600">ORDER # {order._id.slice(-8).toUpperCase()}</div>
              <div className="text-sm">
                <button className="text-blue-600 hover:text-blue-800 hover:underline">
                  View order details
                </button>
                <span className="mx-2 text-gray-300">|</span>
                <button className="text-blue-600 hover:text-blue-800 hover:underline">
                  Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Status */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {getStatusIcon(order.status)}
          <div>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </div>
            {order.status.toLowerCase() === 'delivered' && (
              <div className="text-sm text-gray-600 mt-1">
                Package was delivered
              </div>
            )}
            {order.status.toLowerCase() === 'shipped' && (
              <div className="text-sm text-gray-600 mt-1">
                Package is on the way
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="p-6">
        <div className="space-y-6">
          {order.items.map((item) => (
            <div key={item._id} className="flex gap-4">
              <div className="flex-shrink-0">
                <Link to={`/product/${item.productId._id}`}>
                  <img
                    src={item.productId.imageURL}
                    alt={item.productId.title}
                    className="w-24 h-24 object-cover rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                  />
                </Link>
              </div>
              
              <div className="flex-1">
                <Link 
                  to={`/product/${item.productId._id}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                    {item.productId.title}
                  </h3>
                </Link>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <span>Qty: {item.quantity}</span>
                  <span>₹{item.productId.price.toFixed(2)} each</span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Buy it again
                  </button>
                  <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    View item
                  </button>
                  {order.status.toLowerCase() === 'delivered' && (
                    <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      Write a review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Actions Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Ordered on {formatDate(order.createdAt)}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-blue-600 hover:text-blue-800 hover:underline text-sm">
              Track package
            </button>
            <button className="text-blue-600 hover:text-blue-800 hover:underline text-sm">
              Return or replace items
            </button>
            <button className="text-blue-600 hover:text-blue-800 hover:underline text-sm">
              Leave delivery feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
