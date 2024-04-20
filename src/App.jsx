import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import CarruselCategoriesStore from "./containers/carruselCategoriesStore/CarruselCategoriesStore";
import InfiniteStore from "./containers/infiniteStore/InfiniteStore";

function App() {
  return (
    <Routes>
      <Route path="/store" element={<CarruselCategoriesStore />}></Route>
      <Route path="/infinite" element={<InfiniteStore />}></Route>
    </Routes>
  );
}

export default App;
