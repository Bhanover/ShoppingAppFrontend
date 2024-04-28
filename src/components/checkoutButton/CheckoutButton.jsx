// CheckoutButton.js
import React from "react";
import "./CheckoutButton.css";

const CheckoutButton = ({ onCheckout, disabled }) => {
  return (
    <button className="checkoutButton" onClick={onCheckout} disabled={disabled}>
      Finalizar Pedido
    </button>
  );
};

export default CheckoutButton;
