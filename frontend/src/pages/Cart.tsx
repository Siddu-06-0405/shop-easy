import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartItem } from "../types/Product";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { initiateRazorpayPayment, loadRazorpayScript } from "../utils/razorpay";
import API from "@/utils/api";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const authUser = JSON.parse(localStorage.getItem("authUser") || "{}");
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await API.get("/cart", {
          headers: { Authorization: `Bearer ${authUser.token}` },
        });
        const backendCartItems = res.data.items.map((item: any) => ({
          ...item.productId,
          quantity: item.quantity,
        }));
        setCartItems(backendCartItems);
      } catch (err) {
        console.error("Failed to load cart:", err);
        toast.error("Failed to load cart.");
      }
    };

    if (authUser?.token) fetchCart();
  }, []);

  const handleUpdateQuantity = async (productId: string, newQty: number) => {
    try {
      if (newQty <= 0) {
        await handleRemoveItem(productId);
        return;
      }

      await API.post(
        "/cart/add",
        { productId, quantity: newQty },
        { headers: { Authorization: `Bearer ${authUser.token}` } }
      );

      setCartItems((prev) =>
        prev.map((item) =>
          item._id === productId ? { ...item, quantity: newQty } : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
      toast.error("Could not update quantity.");
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await API.post(
        "/cart/remove",
        { productId },
        { headers: { Authorization: `Bearer ${authUser.token}` } }
      );
      setCartItems((prev) => prev.filter((item) => item._id !== productId));
    } catch (err) {
      console.error("Error removing item:", err);
      toast.error("Could not remove item.");
    }
  };

  const handleCheckout = async () => {
    setIsProcessing(true);

    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        toast.error("Failed to load Razorpay script");
        return;
      }

      localStorage.setItem("cart", JSON.stringify(cartItems));
      initiateRazorpayPayment(
        cartItems,
        totalPrice,
        async (response) => {
          toast.success("Payment successful! Order placed.");
          console.log("Payment response:", response);

          // Optional: Clear backend cart after payment
          await API.post("/cart/clear", {}, {
            headers: { Authorization: `Bearer ${authUser.token}` },
          });
          setCartItems([]);

          navigate(`/payment-success?reference=${response.paymentId}`);

        },
        () => {
          toast.error("Payment cancelled or failed.");
        }
      );
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Something went wrong during checkout.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-8">
            Start shopping to add items to your cart
          </p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div key={item._id} className="p-6 flex items-center space-x-4">
                <img
                  src={item.imageURL}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.category}</p>
                  <p className="text-blue-600 font-bold text-lg mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item._id, Math.max(1, item.quantity - 1))
                    }
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded transition-colors"
                  >
                    -
                  </button>
                  <span className="bg-gray-100 py-1 px-3 min-w-12 text-center rounded">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item._id, item.quantity + 1)
                    }
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded transition-colors"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-600 hover:text-red-800 text-sm mt-1 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-blue-600">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <div className="flex space-x-4">
              <Link
                to="/"
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors text-center font-semibold"
              >
                Continue Shopping
              </Link>
              <Button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Proceed to Checkout"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
