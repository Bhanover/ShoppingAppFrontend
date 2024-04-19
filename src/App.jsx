import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import CarruselCategoriesStore from "./containers/carruselCategoriesStore/CarruselCategoriesStore";

function App() {
  return (
    <Routes>
      <Route path="/store" element={<CarruselCategoriesStore />}></Route>
    </Routes>
  );
}

export default App;
