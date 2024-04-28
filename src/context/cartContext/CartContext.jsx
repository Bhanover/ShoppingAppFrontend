import React, { createContext, useState } from "react";

export const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Dentro de CartProvider

  const addToCart = (product, selectedSize) => {
    console.log("Añadiendo producto al carrito:", product, selectedSize);

    const newProduct = {
      ...product,
      selectedSizeLabel: selectedSize ? selectedSize.label : null,
    };

    const existingProductIndex = cartItems.findIndex(
      (item) =>
        item.id === newProduct.id &&
        item.selectedSizeLabel === newProduct.selectedSizeLabel
    );

    if (existingProductIndex !== -1) {
      // El producto con el mismo tamaño ya está en el carrito, solo incrementa la cantidad
      const newCartItems = cartItems.map((item, index) =>
        index === existingProductIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(newCartItems);
    } else {
      // Si el producto no está en el carrito o el tamaño es diferente, lo añade como nuevo
      setCartItems([...cartItems, { ...newProduct, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId, sizeLabel) => {
    setCartItems(
      cartItems.filter(
        (item) => item.id !== productId || item.selectedSizeLabel !== sizeLabel
      )
    );
  };

  const updateQuantity = (productId, selectedSizeLabel, quantity) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId && item.selectedSizeLabel === selectedSizeLabel
          ? { ...item, quantity: parseInt(quantity, 10) } // Asegúrate de parsear el valor a entero
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
