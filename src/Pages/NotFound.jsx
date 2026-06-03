import React from 'react';
import { useNavigate } from 'react-router';
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-green-50 to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation Container */}
        <div className="relative mb-12">
          {/* Large 404 Text */}
          <div className="relative z-10">
            <h1 className="text-9xl font-bold bg-linear-to-r from-green-600 to-orange-600 bg-clip-text text-transparent animate-pulse">
              404
            </h1>
          </div>
          
          {/* Shopping Cart Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-white/80 backdrop-blur-sm rounded-full shadow-2xl flex items-center justify-center animate-bounce">
              <AiOutlineShoppingCart className="text-6xl text-orange-600" />
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-0 left-1/4 w-8 h-8 bg-green-600 rounded-full animate-ping opacity-75"></div>
          <div className="absolute top-0 right-1/4 w-6 h-6 bg-orange-600 rounded-full animate-ping opacity-75" style={{ animationDelay: '500ms' }}></div>
          <div className="absolute bottom-0 left-1/3 w-4 h-4 bg-green-600 rounded-full animate-ping opacity-75" style={{ animationDelay: '1000ms' }}></div>
          <div className="absolute bottom-0 right-1/3 w-5 h-5 bg-orange-600 rounded-full animate-ping opacity-75" style={{ animationDelay: '1500ms' }}></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Looks like you've wandered into the wrong aisle!
          </p>
          <p className="text-gray-500">
            The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 px-6 py-3 bg-linear-to-r from-green-600 to-orange-600 text-white rounded-xl hover:from-green-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <AiOutlineHome size={20} />
            <span className="font-medium">Go Home</span>
          </button>
          
          <button
            onClick={() => navigate('/all-clothes')}
            className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <AiOutlineShoppingCart size={20} />
            <span className="font-medium">Browse Clothes</span>
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Go Back</span>
          </button>
        </div>
        {/* Fun Message */}
        <div className="mt-12 p-6 bg-linear-to-r from-green-100 to-orange-100 rounded-xl border border-green-200">
          <p className="text-gray-700 font-medium">
            🛍️ While you're here, check out our amazing deals! Your perfect product might be just a click away.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
