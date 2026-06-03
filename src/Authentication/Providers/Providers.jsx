import React from "react";
import AuthProvider from "../Context/AuthProvider";
import CartProvider from "../../Context/CartProvider";

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
};

export default Providers;
