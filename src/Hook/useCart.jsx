import { use } from "react";
import { CartContext } from "../Context/CartProvider";


const useCart = () => {
  const cartinfo = use(CartContext);
  return cartinfo;
};
export default useCart;
