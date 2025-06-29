import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  User,
  Package,
  Heart,
  Settings,
  CreditCard,
  MapPin,
} from "lucide-react";

const Account = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: User,
      title: "Profile Information",
      description: "Update your personal details",
      route: "/account/profile",
    },
    {
      icon: Package,
      title: "Order History",
      description: "View your past orders and tracking",
      route: "/account/orders",
    },
    {
      icon: Heart,
      title: "Wishlist",
      description: "Save items for later",
      route: "/account/wishlist",
    },
    {
      icon: CreditCard,
      title: "Payment Methods",
      description: "Manage your payment options",
      route: "/account/payments",
    },
    {
      icon: MapPin,
      title: "Addresses",
      description: "Manage shipping and billing addresses",
      route: "/account/addresses",
    },
    {
      icon: Settings,
      title: "Account Settings",
      description: "Privacy and notification preferences",
      route: "/account/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Account</h1>
          <p className="text-gray-600">
            {user
              ? "Manage your account settings and view your order history"
              : "Sign in to unlock all features."}
          </p>
        </div>

        {/* Sign In Prompt */}
        {!user && (
          <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Account Features
            </h3>
            <p className="text-gray-600 mb-6">
              Create an account to track orders, save favorites, and enjoy a
              personalized shopping experience.<h4 className="text-2xl">Then, you will also get access to see admin dashboard also. </h4>
              <strong>This is for Educational Purposes.</strong>
            </p>
            <div className="space-x-4">
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-100 transition-colors font-semibold"
              >
                Create Account
              </button>
            </div>
          </div>
        )}

        <br />
        {/* Account Overview */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center">
            <div className="bg-blue-100 p-4 rounded-full mr-6">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {user
                  ? `Welcome back, ${user.name?.split(" ")[0] || "User"}!`
                  : "Welcome to ShopEasy!"}
              </h2>
              <p className="text-gray-600">
                {user ? user.email : "Sign in to access your account features"}
              </p>
            </div>
          </div>
        </div>

        {/* Account Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.route)}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <item.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Account;
