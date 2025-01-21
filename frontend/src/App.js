import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { useState, useEffect } from "react";
import LoginPopUp from "./components/LoginPopup/LoginPopUp";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import Products from "./components/Products/Products";
import ShopOnlinePage from "./pages/ShopOnline/ShopOnline";
import AboutPage from "./pages/About/About";
import ContactPage from "./components/Contact/Contact";
import LanguageSwitcher from "./LanguageSwitcher";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Automatically add /en or /fr if missing in the URL
  useEffect(() => {
    const languageInURL = location.pathname.split("/")[1]; // Get the first part of the URL after the '/'
    const defaultLanguage = "en"; // You can set this to "fr" if you want French to be the default

    // If the URL doesn't have a language prefix
    if (!["en", "fr"].includes(languageInURL)) {
      navigate(`/${defaultLanguage}${location.pathname}`);
    }
  }, [location, navigate]);

  return (
    <>
      {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <LanguageSwitcher />
        <Routes>
          <Route path="/:lang" element={<Home />} />
          <Route path="/:lang/about-us" element={<AboutPage />} />
          <Route path="/:lang/contact" element={<ContactPage />} />
          <Route path="/:lang/products" element={<Products />} />
          <Route path="/:lang/shop" element={<ShopOnlinePage />} />
          <Route path="/:lang/cart" element={<Cart />} />
          <Route path="/:lang/order" element={<PlaceOrder />} />
          <Route path="/:lang/verify" element={<Verify />} />
          <Route path="/:lang/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
