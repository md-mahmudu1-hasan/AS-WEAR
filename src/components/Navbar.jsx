import React, { useState } from "react";
import { Link } from "react-router";
import { FiUser } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { RiLoginBoxLine } from "react-icons/ri";
import useAuth from "../Hook/UseAuth";
import useCart from "../Hook/useCart";
import useAxios from "../Hook/useAxios";
import { useNavigate } from "react-router";

const Navbar = () => {
  const { user } = useAuth();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const axiosInstance = useAxios();

  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleSearch = async (value) => {
    setQuery(value);

    if (!value) {
      setResults([]);
      return;
    }

    try {
      const res = await axiosInstance.get(`/search?q=${value}`);
      setResults(res.data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <nav className="sticky top-0 bg-dark-gray-custom shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="ShopHub Logo" className="w-30 px-4" />
          </Link>

          {/* Desktop Search Box */}
          <div className="hidden md:flex">
            <div className="relative w-125">
              <div className="flex items-center bg-dark-gray-custom/90 backdrop-blur rounded-lg overflow-hidden border border-dark-gold">
                <input
                  type="text"
                  placeholder="Search for Clothes..."
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="flex-1 px-4 py-3 bg-transparent outline-none text-gold placeholder-light-silver"
                />
                <button className="px-6 py-3 bg-linear-to-r from-gold to-dark-gold text-black-custom font-medium hover:from-dark-gold hover:to-dark-gold transition-all">
                  Search
                </button>
              </div>

              {/* Search Results Dropdown */}
              {results.length > 0 && (
                <div className="absolute w-full bg-black-custom shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto z-50 border border-dark-gold">
                  {results.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => {
                        navigate(`/${item.type}/${item._id}`);
                        setResults([]);
                        setQuery("");
                      }}
                      className="px-4 py-2 hover:bg-dark-gray-custom cursor-pointer text-light-silver"
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/cart"
              className="flex flex-col items-center p-2 text-light-silver hover:text-gold transition-colors relative"
            >
              <IoCartOutline size={28} />
              <span className="text-xs mt-1">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-5">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/login"
              className={`flex flex-col items-center p-2 text-light-silver hover:text-gold transition-colors ${user && "hidden"}`}
            >
              <RiLoginBoxLine size={24} />
              <span className="text-xs mt-1">Login</span>
            </Link>
            <Link
              to="/profile"
              className={`flex flex-col items-center p-2 text-light-silver hover:text-gold transition-colors ${!user && "hidden"}`}
            >
              <FiUser size={24} />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </div>

          {/* Mobile Menu Icons */}
          <div className="md:hidden flex items-center space-x-2">
            <Link
              to="/cart"
              className="p-2 text-light-silver hover:text-gold transition-colors flex items-center relative"
            >
              <IoCartOutline size={28} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-5">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/login"
              className={`p-2 text-light-silver hover:text-gold transition-colors flex items-center ${user && "hidden"}`}
            >
              <RiLoginBoxLine size={24} />
            </Link>
            <Link
              to="/profile"
              className={`p-2 text-light-silver hover:text-gold transition-colors flex items-center ${!user && "hidden"}`}
            >
              <FiUser size={24} />
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4 relative">
          <div className="flex items-center bg-dark-gray-custom/90 backdrop-blur rounded-lg overflow-hidden border border-dark-gold">
            <input
              type="text"
              placeholder="Search for Clothes..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-gold"
            />
            <button className="px-4 py-2 bg-linear-to-r from-gold to-dark-gold text-black-custom hover:from-dark-gold hover:to-dark-gold transition-all">
              Search
            </button>
          </div>

          {/* Mobile Search Results */}
          {results.length > 0 && (
            <div className="absolute w-full bg-black-custom shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto z-50 border border-dark-gold">
              {results.map((item) => (
                <div
                  key={item._id}
                  onClick={() => {
                    navigate(`/${item.type}/${item._id}`);
                    setResults([]);
                    setQuery("");
                  }}
                  className="px-4 py-2 hover:bg-dark-gray-custom cursor-pointer text-light-silver"
                >
                  {item.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
