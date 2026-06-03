import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export const CartContext = createContext();

const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getCartFromLocalStorage());

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart
  const addToCart = (product, qty = 1) => {
    const exists = cart.find((item) => item._id === product._id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + qty }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: qty }]);
    }
  };

  // Remove item
  const removeFromCart = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCart(cart.filter((item) => item._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  // Increase quantity
const increaseQty = (id, maxQty = 10) => {
  setCart(
    cart.map((item) => {
      if (item._id === id) {
        if (item.quantity >= maxQty) {
          toast.error(`You can’t add more than ${maxQty} items`);
          return item;
        }
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    })
  );
};


  // Decrease quantity
  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item,
      ),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        getCartCount: () => cart.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
