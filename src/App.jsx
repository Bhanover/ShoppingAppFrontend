import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./containers/adminDashboard/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/adminDash" element={<AdminDashboard />}></Route>
    </Routes>
  );
}

export default App;
