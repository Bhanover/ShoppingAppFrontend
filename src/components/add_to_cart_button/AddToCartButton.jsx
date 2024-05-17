import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/cartContext/CartContext";
import "./AddToCartButton.css";

const AddToCartButton = ({ product, selectedSize }) => {
  const { addToCart } = useContext(CartContext);
  const [message, setMessage] = useState("");

  const handleClick = () => {
    if (!selectedSize) {
      setMessage("Por favor, selecciona un tamaño.");
      return;
    }
    addToCart(product, selectedSize);
    setMessage("Producto añadido al carrito con éxito");
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="add-cart">
      {message && <p className="notification">{message}</p>}
      <button
        className="add-to-cart-button"
        onClick={handleClick}
        disabled={!selectedSize}
      >
        AÑADIR A MI CESTA
      </button>
    </div>
  );
};

export default AddToCartButton;
