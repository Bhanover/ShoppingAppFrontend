import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ContactDetails from "./containers/contactDetails/ContactDetails";

function App() {
  return (
    <Routes>
      <Route path="/contact" element={<ContactDetails />}></Route>
    </Routes>
  );
}

export default App;
