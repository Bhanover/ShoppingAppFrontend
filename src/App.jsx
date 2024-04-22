import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ClothesDetails from "./containers/clothesDetails/ClothesDetails";
import Cart from "./containers/cart/Cart";
import { CartProvider } from "./context/cartContext/CartContext";
import Clothes from "./pages/clothes/Clothes";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/clo" element={<ClothesDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/clothes" element={<Clothes />}></Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
