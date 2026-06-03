import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FiPhone, FiMapPin, FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import useAuth from "../Hook/UseAuth";
import toast from "react-hot-toast";
import useAxios from "../Hook/useAxios";

const CompleteProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const axiosInstance = useAxios();

  const onSubmit = async (data) => {
    const { phone, address } = data;

    try {
      // Save user profile data to database
      await axiosInstance.patch("/userinfo", {
        email: user?.email,
        phone: phone,
        address: address,
      });
      toast.success("Profile completed successfully!");
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to save profile");
      console.error("Profile completion error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-orange-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Profile
          </h2>
          <p className="text-gray-600">
            Please provide your contact and delivery information
          </p>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Phone Number Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[+]?[\d\s\-\(\)]+$/,
                      message: "Invalid phone number",
                    },
                    minLength: {
                      value: 10,
                      message: "Phone number must be at least 10 digits",
                    },
                  })}
                  className={`appearance-none relative block w-full pl-10 pr-3 py-3 border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-colors`}
                  placeholder="Enter your phone number"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Address Field */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Delivery Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-start pt-3 pointer-events-none">
                  <FiMapPin className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="address"
                  name="address"
                  rows="4"
                  {...register("address", {
                    required: "Delivery address is required",
                    minLength: {
                      value: 10,
                      message: "Please enter a complete address",
                    },
                  })}
                  className={`appearance-none relative block w-full pl-10 pr-3 py-3 border ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-colors resize-none`}
                  placeholder="Enter your complete delivery address including street, city, and postal code"
                />
              </div>
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.address.message}
                </p>
              )}
            </div>

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Saving Profile..." : "Complete Profile"}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>&copy; 2026 ShopHub. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
