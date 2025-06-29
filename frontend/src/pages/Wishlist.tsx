import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';
import { getAuthUser } from '../utils/auth';
import { Product } from '@/types/Product';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const user = getAuthUser();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await API.get('/wishlist', {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        const products = res.data.items.map((item) => item.product); // extract product info
        setWishlist(products);
      } catch (err) {
        console.error('Error fetching wishlist:', err);
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) fetchWishlist();
  }, [user?.token]);

  const handleRemove = async (productId: string) => {
    try {
      await API.delete(`/wishlist/${productId}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setWishlist((prev) =>
        prev.filter((product) => product._id !== productId)
      );
    } catch (err) {
      console.error('Error removing item from wishlist:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">My Wishlist</h2>
          <p className="text-gray-600 text-lg">
            View and manage your saved products
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading wishlist...</p>
        ) : wishlist.length === 0 ? (
          <p className="text-center text-gray-500">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div key={product._id} className="relative">
                <ProductCard product={product} />
                <button
                  onClick={() => handleRemove(product._id)}
                  className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
