import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Container from "./containers/container/Container";
import CarruselCategories from "./containers/carruselCategories/CarruselCategories";
function App() {
  return (
    <Routes>
      <Route path="/carrusel" element={<CarruselCategories />}></Route>
      <Route path="/" element={<Container />}>
        <Route path="/home" element={<Home />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
