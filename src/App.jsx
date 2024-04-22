import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ClothesDetails from "./containers/clothesDetails/ClothesDetails";

function App() {
  return (
    <Routes>
      <Route path="/clo" element={<ClothesDetails />}></Route>
    </Routes>
  );
}

export default App;
