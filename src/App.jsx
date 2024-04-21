import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import CarruselCategoriesStore from "./containers/carruselCategoriesStore/CarruselCategoriesStore";
import Store from "./pages/store/Store";

function App() {
  return (
    <Routes>
      <Route path="/store" element={<Store />}></Route>
    </Routes>
  );
}

export default App;
