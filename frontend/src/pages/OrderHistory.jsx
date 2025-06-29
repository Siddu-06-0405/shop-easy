import React, { useEffect, useState } from 'react';
import { getAuthUser } from '@/utils/auth';
import API from '@/utils/api';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
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

  if (!user) return <p>Please log in to view order history.</p>;

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order._id} className="border p-4 rounded">
              <p><strong>Order ID:</strong> {order.orderId}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;