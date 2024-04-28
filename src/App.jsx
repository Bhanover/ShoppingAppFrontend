import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import CarruselCategoriesStore from "./containers/carruselCategoriesStore/CarruselCategoriesStore";
import Store from "./pages/store/Store";
import ContactDetails from "./containers/contactDetails/ContactDetails";
import Home from "./pages/home/Home";
import Container from "./containers/container/Container";
import CarruselCategories from "./containers/carruselCategories/CarruselCategories";
import NewsletterSignUp from "./containers/newsletter_sign_up/NewsletterSignUp";
import BottomBar from "./containers/bottomBar/BottomBar";


function App() {
  return (
    <Routes>
    <Route path="/store" element={<Store />}></Route>
      <Route path="/contact" element={<ContactDetails />}></Route>

      <Route path="/bottom" element={<BottomBar />}></Route>

      <Route path="/carl" element={<CarruselCategories />}></Route>
      <Route path="/new" element={<NewsletterSignUp />}></Route>
      <Route path="/" element={<Container />}>
        <Route path="/home" element={<Home />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
