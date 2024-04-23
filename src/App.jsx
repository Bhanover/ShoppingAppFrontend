import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./containers/adminDashboard/AdminDashboard";
import AdminManagement from "./containers/adminManagement/AdminManagement";
import CategoryManagement from "./containers/categoryManagement/CategoryManagement";
import AddClothingItem from "./containers/addClothingItem/AddClothingItem";

function App() {
  return (
    <Routes>
      <Route path="/adminDash" element={<AdminDashboard />}></Route>
      <Route path="/adminM" element={<AdminManagement />}></Route>
      <Route path="/categoryM" element={<CategoryManagement />}></Route>
      <Route path="/add" element={<AddClothingItem />}></Route>
    </Routes>
  );
}

export default App;
