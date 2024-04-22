import React, { useContext } from "react";
import { CartContext } from "../../context/cartContext/CartContext";
import "./AddToCartButton.css";
const AddToCartButton = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleClick = () => {
    console.log("Intentando añadir al carrito:", product);
    addToCart(product);
  };

  return (
    <button className="add-to-cart-button" onClick={handleClick}>
      AÑADIR A MI CESTA
    </button>
  );
};

export default AddToCartButton;
