import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Account from "./pages/Account";
import ProfileInfo from "./pages/ProfileInfo";
import OrderHistory from "./pages/OrderHistory";
import Wishlist from "./pages/Wishlist";
import Addresses from "./pages/Addresses";
import Admin from "./pages/Admin/Admin";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { CartItem } from "./types/Product";
import AddProduct from "./pages/Admin/AddProduct";
import AllCustomers from "./pages/Admin/AllCustomers";
import AllOrders from "./pages/Admin/AllOrders";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === newItem._id);

      if (existingItem) {
        return prevItems.map((item) =>
          item._id === newItem._id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        return [...prevItems, newItem];
      }
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => (item._id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
              <Navbar cartItemCount={cartItemCount} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/account" element={<Account />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/add-product" element={<AddProduct />} />
                <Route path="/admin/customers" element={<AllCustomers />} />
                <Route path="/admin/orders" element={<AllOrders />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/account/profile" element={<ProfileInfo />} />
                <Route path="/account/orders" element={<OrderHistory />} />
                <Route path="/account/wishlist" element={<Wishlist />} />
                <Route path="/account/addresses" element={<Addresses />} />

                <Route
                  path="/product/:id"
                  element={<ProductDetail onAddToCart={handleAddToCart} />}
                />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart
                        cartItems={cartItems}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemoveItem={handleRemoveItem}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
