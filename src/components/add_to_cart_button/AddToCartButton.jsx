import React, { useContext } from "react";
import { CartContext } from "../../context/cartContext/CartContext";
import "./AddToCartButton.css";
const AddToCartButton = ({ product, selectedSize }) => {
  const { addToCart } = useContext(CartContext);

  const handleClick = () => {
    console.log("Intentando añadir al carrito:", selectedSize);
    addToCart(product, selectedSize);
  };

  return (
    <button className="add-to-cart-button" onClick={handleClick}>
      AÑADIR A MI CESTA
    </button>
  );
};

export default AddToCartButton;
