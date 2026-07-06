import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiCreditCard, FiCheckCircle } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import useCart from "../../Hook/useCart";
import useAuth from "../../Hook/UseAuth";
import useAxios from "../../Hook/useAxios";
import toast from "react-hot-toast";

const Payment = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const { cart, setCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [userAddress, setUserAddress] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const getSubtotal = () => {
    return cart.reduce(
      (total, item) => total + item.after_discount_price * item.quantity,
      0,
    );
  };

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true);

        if (user?.email) {
          const res = await axiosInstance.get(
            `/userInfo/by-email/${user.email}`,
          );
          setUserAddress(res?.data || {});
        } else {
          setUserAddress(null);
        }
      } catch (error) {
        console.error(error);
        setUserAddress(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      return toast.error("Please select a payment method");
    }

    if (!transactionId) {
      return toast.error("Please enter transaction ID");
    }

    if (transactionId.length < 6) {
      return toast.error("Transaction ID must be at least 6 characters");
    }
    const orderData = {
      userEmail: user?.email,
      userName: userAddress?.name,
      cart,
      total: getSubtotal(),
      address: userAddress?.address,
      phone: userAddress?.phone,
      paymentMethod,
      transactionId,
    };

    try {
      setOrderLoading(true);
      await axiosInstance.post("/order-confirm", orderData);
      toast.success(
        "Order confirmed! Check your Gmail or Profile's 'My orders'",
      );
      navigate("/profile");
      setCart([]);
      localStorage.removeItem("cart");
    } catch {
      toast.error("Order failed");
    } finally {
      setOrderLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-dark-gray-custom py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gold mb-4">
              Your cart is empty
            </h2>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-linear-to-r from-gold to-dark-gold text-black-custom rounded-lg hover:from-dark-gold hover:to-gold transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-gray-custom py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center text-gold hover:text-dark-gold transition-colors mb-4"
          >
            <FiArrowLeft className="mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gold mb-2">Payment</h1>
          <p className="text-light-silver">
            Complete your payment to confirm your order
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="bg-black-custom rounded-lg shadow-sm border border-dark-gold p-6">
            <div className="flex items-center space-x-2 mb-6">
              <FiCreditCard className="w-6 h-6 text-gold" />
              <h2 className="text-xl font-semibold text-gold">
                Payment Details
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Payment Method Dropdown */}
              <div>
                <label
                  htmlFor="paymentMethod"
                  className="block text-sm font-medium text-gold mb-2"
                >
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-dark-gold text-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold sm:text-sm transition-colors bg-dark-gray-custom"
                >
                  <option value="">Select payment method</option>
                  <option value="bikash">bKash</option>
                  <option value="nagad">Nagad</option>
                </select>
              </div>

              {/* Payment Instructions */}
              {paymentMethod && (
                <div className="bg-dark-gray-custom rounded-lg p-4 border border-dark-gold">
                  <h3 className="text-sm font-semibold text-gold mb-2">
                    Payment Instructions
                  </h3>
                  {paymentMethod === "bikash" && (
                    <div className="text-sm text-light-silver space-y-1">
                      <p>
                        • Send money to:{" "}
                        <span className="text-gold font-semibold">
                          017XXXXXXXX
                        </span>
                      </p>
                      <p>
                        • Amount:{" "}
                        <span className="text-gold font-semibold">
                          ৳{getSubtotal().toFixed(2)}
                        </span>
                      </p>
                      <p>• Enter your transaction ID below</p>
                    </div>
                  )}
                  {paymentMethod === "nagad" && (
                    <div className="text-sm text-light-silver space-y-1">
                      <p>
                        • Send money to:{" "}
                        <span className="text-gold font-semibold">
                          018XXXXXXXX
                        </span>
                      </p>
                      <p>
                        • Amount:{" "}
                        <span className="text-gold font-semibold">
                          ৳{getSubtotal().toFixed(2)}
                        </span>
                      </p>
                      <p>• Enter your transaction ID below</p>
                    </div>
                  )}
                </div>
              )}

              {/* Transaction ID Input */}
              <div>
                <label
                  htmlFor="transactionId"
                  className="block text-sm font-medium text-gold mb-2"
                >
                  Transaction ID
                </label>
                <input
                  id="transactionId"
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter your transaction ID"
                  className="appearance-none relative block w-full px-4 py-3 border border-dark-gold placeholder-light-silver text-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold sm:text-sm transition-colors bg-dark-gray-custom"
                />
                <p className="mt-1 text-xs text-light-silver">
                  Enter the transaction ID from your payment confirmation
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || orderLoading}
                className="w-full px-6 py-3 bg-linear-to-r from-gold to-dark-gold text-black-custom rounded-lg hover:from-dark-gold hover:to-gold transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-gold disabled:hover:to-dark-gold flex items-center justify-center space-x-2"
              >
                {loading || orderLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-black-custom"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <FiCheckCircle className="w-5 h-5" />
                    <span>Confirm Payment</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-black-custom rounded-lg shadow-sm border border-dark-gold p-6 sticky top-4">
            <h2 className="text-xl font-semibold text-gold mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-light-silver">
                <span>Items ({cart.length})</span>
                <span>৳{getSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-light-silver">
                <span>Delivery Fee</span>
                <span className="text-gold">FREE</span>
              </div>
              <span className="text-xs text-center text-light-silver">
                (নীলফামারী শহরের বাইরে হলে ৬০ টাকা)
              </span>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold text-gold">
                  <span>Total</span>
                  <span>৳{getSubtotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="border-t border-dark-gold pt-4">
              <h3 className="text-sm font-semibold text-gold mb-3">
                Order Items
              </h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-dark-gray-custom rounded overflow-hidden shrink-0">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gold truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-light-silver">
                        Qty: {item.quantity} × ৳{item.after_discount_price}
                      </p>
                    </div>
                    <div className="text-sm font-semibold text-gold">
                      ৳{(item.after_discount_price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
