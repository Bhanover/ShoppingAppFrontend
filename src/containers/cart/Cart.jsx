import React, { useContext } from "react";
import CartContext from "../../context/cartContext/CartContext";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import CheckoutButton from "../../components/checkoutButton/CheckoutButton";
const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const getQuantityOptions = (quantity) => [
    { value: 1, label: "1 ud" },
    { value: 2, label: "2 ud" },
    { value: 3, label: "3 ud" },
    { value: 4, label: "4 ud" },
    { value: 5, label: "5 ud" },
    { value: 6, label: "6 ud" },
    ...(quantity > 6 ? [{ value: quantity, label: `${quantity} ud` }] : []),
  ];

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
                onClick={() => removeFromCart(item.id, item.selectedSizeLabel)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <div className="cart-item-subtotal">
                <h5>Subtotal: {(item.price * item.quantity).toFixed(2)} €</h5>
                <Select
                  options={getQuantityOptions(item.quantity)}
                  value={getQuantityOptions(item.quantity).find(
                    (option) => option.value === item.quantity
                  )}
                  onChange={(option) =>
                    updateQuantity(
                      item.id,
                      item.selectedSizeLabel,
                      option.value
                    )
                  }
                />
              </div>
            </div>
          </div>
        ))}
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
    </div>
  );
};

export default Cart;
