import React, { useContext } from "react";
import CartContext from "../../context/cartContext/CartContext";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import CheckoutButton from "../../components/checkoutButton/CheckoutButton";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  // Calcular el total del carrito
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Manejar el cambio en la cantidad de un producto
  const handleQuantityChange = (id, sizeLabel, change) => {
    const currentItem = cartItems.find(
      (item) => item.id === id && item.selectedSizeLabel === sizeLabel
    );
    if (currentItem) {
      const newQuantity = currentItem.quantity + change;
      if (newQuantity > 0) {
        updateQuantity(id, sizeLabel, newQuantity);
      }
    }
  };

  // Manejar el proceso de checkout
  const handleCheckout = () => {
    console.log("Procesando el pedido...");
  };

  return (
    <div className="cart">
      <div className="cart-container">
        {cartItems.map((item) => (
          <div
            key={`${item.id}-${item.selectedSizeLabel}`}
            className="cart-item"
          >
            <img
              src={item.images.find((image) => image.type === "main")?.imageUrl}
              alt={item.name}
            />
            <div>
              <h4>{item.name}</h4>
              <h5>{item.price} €</h5>
              <p>
                {item.quantity} ud - Talla: {item.selectedSizeLabel}
              </p>
              <button
                className="cart-item-button"
                onClick={() => removeFromCart(item.id, item.selectedSizeLabel)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>

              <div className="cart-item-subtotal">
                <h5>Subtotal: {(item.price * item.quantity).toFixed(2)} €</h5>

                <div className="cart-quantity-controls">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.selectedSizeLabel, -1)
                    }
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.selectedSizeLabel, 1)
                    }
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-end">
        <div className="cart-total">
          <h4>Total del Carrito: {total.toFixed(2)} €</h4>
        </div>
        <div className="cart-checkout">
          <CheckoutButton
            onCheckout={handleCheckout}
            disabled={cartItems.length === 0}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
