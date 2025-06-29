import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Home, Menu, X, User, Settings } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "./LogoutButton"; // optional separate component

interface NavbarProps {
  cartItemCount: number;
}

const Navbar = ({ cartItemCount }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/faq", label: "FAQ" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600">ShopEasy</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                {link.icon && <link.icon size={20} />}
                <span>{link.label}</span>
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/account">
                  <span className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                    Hi, {user.name.split(" ")[0]}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  Logout
                </button>
                <Link
                  to="/admin"
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
                >
                  <Settings size={20} />
                  <span>Admin</span>
                </Link>
              </>
            ) : (
              <Link
                to="/account"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <User size={20} />
                <span>Account</span>
              </Link>
            )}

            <Link
              to="/cart"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 relative"
            >
              <ShoppingCart size={20} />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  {link.icon && <link.icon size={20} />}
                  <span>{link.label}</span>
                </Link>
              ))}
              {user ? (
                <>
                  <Link to="/account">
                    <div className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                      Hi, {user.name.split(" ")[0]}
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition"
                  >
                    <X size={20} />
                    <span>Logout</span>
                  </button>
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition"
                  >
                    <Settings size={20} />
                    <span>Admin</span>
                  </Link>
                </>
              ) : (
                <Link
                  to="/account"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <User size={20} />
                  <span>Account</span>
                </Link>
              )}

              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors relative"
              >
                <ShoppingCart size={20} />
                <span>Cart</span>
                {cartItemCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-1">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
