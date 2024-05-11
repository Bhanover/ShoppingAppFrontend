import CarruselCategoriesStore from "./containers/carruselCategoriesStore/CarruselCategoriesStore";
import Store from "./pages/store/Store";
import ContactDetails from "./containers/contactDetails/ContactDetails";
import Home from "./pages/home/Home";
import Container from "./containers/container/Container";
import CarruselCategories from "./containers/carruselCategories/CarruselCategories";
import NewsletterSignUp from "./containers/newsletter_sign_up/NewsletterSignUp";
import BottomBar from "./containers/bottomBar/BottomBar";
import AdminLogin from "./containers/user_login/UserLogin";
import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ClothesDetails from "./containers/clothesDetails/ClothesDetails";
import Cart from "./containers/cart/Cart";
import { useEffect } from "react";
import { CartProvider } from "./context/cartContext/CartContext";
import Clothes from "./pages/clothes/Clothes";
import AdminDashboard from "./containers/adminDashboard/AdminDashboard";
import AdminManagement from "./containers/adminManagement/AdminManagement";
import CategoryManagement from "./containers/categoryManagement/CategoryManagement";
import AddClothingItem from "./containers/addClothingItem/AddClothingItem";
import SubCategoryManagement from "./containers/subCategoryManagement/SubCategoryManagement";
import NotFound from "./pages/notFound/NotFound";
import ScrollTop from "./components/scroll_top/ScrollTop";
import Contact from "./pages/contact/Contact";
import ProtectedRoute from "./ProtectedRoute";
import WhatsAppButton from "./components/whatssap_button/WhatsAppButton";
import AboutUs from "./pages/aboutUs/AboutUs";
import { HelmetProvider } from "react-helmet-async";
import CookieBanner from "./containers/cookieBanner/CookieBanner";
import UserRegister from "./containers/user_register/UserRegister";
import UserLogin from "./containers/user_login/UserLogin";
import DeleteClothingItem from "./containers/deleteClothingItem/DeleteClothingItem";

function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <ScrollTop />
        <Routes>
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="management" element={<AdminManagement />} />
            <Route
              path="category-management"
              element={<CategoryManagement />}
            />
            <Route path="clothing-management" element={<AddClothingItem />} />
            <Route
              path="delete-clothing-management"
              element={<DeleteClothingItem />}
            />

            <Route
              path="subcategory-management"
              element={<SubCategoryManagement />}
            />
          </Route>
          <Route path="/cookie" element={<CookieBanner />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/login" element={<UserLogin />}></Route>
          <Route path="/register" element={<UserRegister />}></Route>

          <Route path="/about-us" element={<AboutUs />}></Route>
          <Route path="/" element={<Container />}>
            <Route index element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/store" element={<Store />}>
              <Route path=":categoryNameWithId" element={<Store />} />
              <Route
                path=":categoryNameWithId/:subCategoryNameWithId"
                element={<Store />}
              />
            </Route>
            <Route
              path="/store/:categoryNameWithId/:subCategoryNameWithId/:productNameWithId"
              element={<Clothes />}
            />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;
