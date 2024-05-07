import React, { useContext, useState } from "react";
import { CartContext } from "../../context/cartContext/CartContext";
import "./AddToCartButton.css";
import "react-toastify/dist/ReactToastify.css";

import { toast, ToastContainer } from "react-toastify";
const AddToCartButton = ({ product, selectedSize }) => {
  const { addToCart } = useContext(CartContext);

  const handleClick = () => {
    if (!selectedSize) {
      toast.warn("Por favor, selecciona un tamaño.");
      return;
    }
    const toastId = `product-${product.id}-size-${selectedSize.value}`;
    addToCart(product, selectedSize);
    toast.success("Producto añadido al carrito con éxito", { toastId });
  };

  return (
    <button
      className="add-to-cart-button"
      onClick={handleClick}
      disabled={!selectedSize}
    >
      <ToastContainer />
      AÑADIR A MI CESTA
    </button>
  );
};

export default AddToCartButton;
