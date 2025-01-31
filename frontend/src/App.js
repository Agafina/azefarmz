import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { useState, useEffect, useContext } from "react";
import LoginPopUp from "./components/LoginPopup/LoginPopUp";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import Products from "./components/Products/Products";
import ShopOnlinePage from "./pages/ShopOnline/ShopOnline";
import AboutPage from "./pages/About/About";
import ContactPage from "./components/Contact/Contact";
import { useTranslation } from "react-i18next";
import { AuthContext } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const languageInURL = location.pathname.split("/")[1];
    const defaultLanguage = "en";
    const previousLanguage = sessionStorage.getItem("preferredLanguage");

    if (!["en", "fr"].includes(languageInURL)) {
      const newLanguage = previousLanguage || defaultLanguage;
      i18n.changeLanguage(newLanguage).then(() => {
        navigate(`/${newLanguage}${location.pathname}`, { replace: true });
      });
    } else {
      sessionStorage.setItem("preferredLanguage", languageInURL);
      if (languageInURL !== i18n.language) {
        i18n.changeLanguage(languageInURL);
      }
    }
  }, [location, navigate, i18n]);

  useEffect(() => {
    if (!user && !showLogin) {
      setShowLogin(true);
    }
  }, [user, showLogin]);

  return (
    <>
      <ToastContainer
        closeButton={false}
        draggable={true}
        autoClose={3000}
        position="top-right"
      />

      {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />

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
