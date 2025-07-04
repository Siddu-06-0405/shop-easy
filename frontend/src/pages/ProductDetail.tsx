import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import API from "../utils/api";
import { Product, CartItem } from "../types/Product";
import { addToWishlist, removeFromWishlist, getWishlist } from "../utils/api";

interface ProductDetailProps {
  onAddToCart: (item: CartItem) => void;
}

const ProductDetail = ({ onAddToCart }: ProductDetailProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const authUser = JSON.parse(localStorage.getItem("authUser") || "{}");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    const fetchWishlist = async () => {
      try {
        const res = await getWishlist();
        const productIds = res.data?.items?.map(
          (item: any) => item.product._id
        );
        setWishlist(productIds || []);
        setIsInWishlist(productIds?.includes(id));
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
      }
    };

    if (authUser?.token) {
      fetchWishlist();
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return navigate("/404");

    if (!authUser || !authUser.token) {
      return navigate("/account");
    }

    try {
      await API.post(
        "/cart/add",
        {
          productId: product._id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );

      alert(`Added ${quantity} ${product.title}(s) to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-xl">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Products
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={product.imageURL}
                alt={product.title}
                className="w-full h-96 md:h-full object-cover"
              />
            </div>

            <div className="md:w-1/2 p-8">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <div
                className={`mb-6 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  product.inStock
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.inStock ? "✓ In Stock" : "✗ Out of Stock"}
              </div>

              <div
                className={`mb-6 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  product.quantity > 10
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.quantity} pieces left
              </div>

              {product.inStock && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l transition-colors"
                    >
                      -
                    </button>
                    <span className="bg-gray-100 py-2 px-4 min-w-16 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors ${
                  product.inStock
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
              {authUser?.token && (
                <button
                  onClick={async () => {
                    try {
                      if (isInWishlist) {
                        await removeFromWishlist(id);
                        setIsInWishlist(false);
                      } else {
                        await addToWishlist(id);
                        setIsInWishlist(true);
                      }
                    } catch (err) {
                      console.error("Wishlist error:", err);
                    }
                  }}
                  className="w-full mt-4 py-2 px-6 rounded-lg font-medium text-blue-600 border border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  {isInWishlist
                    ? "Remove from Wishlist ❤️"
                    : "Add to Wishlist 🤍"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
