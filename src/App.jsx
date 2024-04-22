import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "./containers/adminLogin/AdminLogin";

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLogin />}></Route>
    </Routes>
  );
}

export default App;
