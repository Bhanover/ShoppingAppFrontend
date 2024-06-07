import React, { createContext, useState } from "react";

// Crear el contexto del carrito de compras
export const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  cartCount: 0,
});

// Proveedor del contexto del carrito de compras
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Añadir producto al carrito
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
      // Si el producto con el mismo tamaño ya está en el carrito, solo incrementa la cantidad
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

  // Remover producto del carrito
  const removeFromCart = (productId, sizeLabel) => {
    setCartItems(
      cartItems.filter(
        (item) => item.id !== productId || item.selectedSizeLabel !== sizeLabel
      )
    );
  };

  // Actualizar la cantidad de un producto en el carrito
  const updateQuantity = (productId, selectedSizeLabel, quantity) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId && item.selectedSizeLabel === selectedSizeLabel
          ? { ...item, quantity: parseInt(quantity, 10) } // Asegúrate de parsear el valor a entero
          : item
      )
    );
  };

  // Contar el número de productos en el carrito
  const cartCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
