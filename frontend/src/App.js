import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { useState, useEffect, useContext, useMemo } from "react";
import LoginPopUp from "./components/LoginPopup/LoginPopUp";
import MyOrders from "./pages/MyOrders/MyOrders";
import Products from "./components/Products/Products";
import ShopOnlinePage from "./pages/ShopOnline/ShopOnline";
import AboutPage from "./pages/About/About";
import ContactPage from "./components/Contact/Contact";
import { useTranslation } from "react-i18next";
import { AuthContext } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import PaymentStatus from "./pages/PaymentStatus/PaymentStatus";
import Sustainability from "./pages/Sustainability/Sustainability";
import ResetPassword from "./components/reset-password/ResetPassword";
import { StoreContext } from "./context/StoreContext";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();
  const { user } = useContext(AuthContext);
  const { clearCart } = useContext(StoreContext)

  useEffect(() => {
    if (!user) {
      clearCart(); // Clears the cart when the user logs out
    }
  }, [user, clearCart]);

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

  const currentPath = location.pathname.split("/").slice(2).join("/"); // Removes "/:lang"
  const protectedRoutes = useMemo(() => ["order", "myorders", "cart", "payment-status"], []);

  useEffect(() => {
    if (!user && !showLogin && protectedRoutes.includes(currentPath)) {
      setShowLogin(true);
    }
  }, [user, showLogin, currentPath, protectedRoutes]);

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
          <Route path="/:lang/sustainability" element={<Sustainability />} />
          <Route path="/:lang/myorders" element={<MyOrders />} />
          <Route
            path="/:lang/payment-status/:transId"
            element={<PaymentStatus />}
          />
          <Route path="/:lang/reset-password" element={<ResetPassword />} />
          <Route path="/:lang/login" element={<LoginPopUp setShowLogin={setShowLogin}/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
