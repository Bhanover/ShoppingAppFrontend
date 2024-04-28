
import CarruselCategoriesStore from "./containers/carruselCategoriesStore/CarruselCategoriesStore";
import Store from "./pages/store/Store";
import ContactDetails from "./containers/contactDetails/ContactDetails";
import Home from "./pages/home/Home";
import Container from "./containers/container/Container";
import CarruselCategories from "./containers/carruselCategories/CarruselCategories";
import NewsletterSignUp from "./containers/newsletter_sign_up/NewsletterSignUp";
import BottomBar from "./containers/bottomBar/BottomBar";
import AdminLogin from "./containers/adminLogin/AdminLogin";

import ClothesDetails from "./containers/clothesDetails/ClothesDetails";
import Cart from "./containers/cart/Cart";
import { CartProvider } from "./context/cartContext/CartContext";
import Clothes from "./pages/clothes/Clothes";
import AdminDashboard from "./containers/adminDashboard/AdminDashboard";
import AdminManagement from "./containers/adminManagement/AdminManagement";
import CategoryManagement from "./containers/categoryManagement/CategoryManagement";
import AddClothingItem from "./containers/addClothingItem/AddClothingItem";
import SubCategoryManagement from "./containers/subCategoryManagement/SubCategoryManagement";

function App() {
  return (
    <CartProvider>
      <Routes>
      <Route path="/adminDash" element={<AdminDashboard />}></Route>
      <Route path="/adminM" element={<AdminManagement />}></Route>
      <Route path="/categoryM" element={<CategoryManagement />}></Route>
      <Route path="/add" element={<AddClothingItem />}></Route>
      <Route path="/subcategoryM" element={<SubCategoryManagement />}></Route>
        <Route path="/clo" element={<ClothesDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/clothes" element={<Clothes />}></Route>
<Route path="/store" element={<Store />}></Route>
      <Route path="/contact" element={<ContactDetails />}></Route>
      <Route path="/admin" element={<AdminLogin />}></Route>

      <Route path="/bottom" element={<BottomBar />}></Route>

      <Route path="/carl" element={<CarruselCategories />}></Route>
      <Route path="/new" element={<NewsletterSignUp />}></Route>
      <Route path="/" element={<Container />}>
        <Route path="/home" element={<Home />}></Route>
      </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
