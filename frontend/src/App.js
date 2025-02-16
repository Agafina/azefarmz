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
import TermsAndConditions from "./components/TermsAndConditions/TermsAndConditions";
import FAQs from "./components/FAQS/FAQs";
import CookieSettings from "./components/CookieSettings/CookieSettings";
import Meta from "./Meta";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();
  const { user } = useContext(AuthContext);
  const { clearCart } = useContext(StoreContext);

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
  const protectedRoutes = useMemo(
    () => ["order", "myorders", "cart", "payment-status"],
    []
  );

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
        <CookieSettings />

        <Routes>
          <Route
            path="/:lang"
            element={
              <>
                <Meta page="home" />
                <Home />
              </>
            }
          />
          <Route
            path="/:lang/about-us"
            element={
              <>
                <Meta page="about" />
                <AboutPage />
              </>
            }
          />
          <Route
            path="/:lang/contact"
            element={
              <>
                <Meta page="contact" />
                <ContactPage />
              </>
            }
          />
          <Route
            path="/:lang/products"
            element={
              <>
                <Meta page="products" />
                <Products />
              </>
            }
          />
          <Route
            path="/:lang/shop"
            element={
              <>
                <Meta page="shop" />
                <ShopOnlinePage />
              </>
            }
          />
          <Route
            path="/:lang/cart"
            element={
              <>
                <Meta page="cart" />
                <Cart />
              </>
            }
          />
          <Route
            path="/:lang/order"
            element={
              <>
                <Meta page="order" />
                <PlaceOrder />
              </>
            }
          />
          <Route
            path="/:lang/sustainability"
            element={
              <>
                <Meta page="sustainability" />
                <Sustainability />
              </>
            }
          />
          <Route
            path="/:lang/myorders"
            element={
              <>
                <Meta page="myorders" />
                <MyOrders />
              </>
            }
          />
          <Route
            path="/:lang/faqs"
            element={
              <>
                <Meta page="faqs" />
                <FAQs />
              </>
            }
          />
          <Route
            path="/:lang/payment-status/:transId"
            element={
              <>
                <Meta page="paymentStatus" />
                <PaymentStatus />
              </>
            }
          />
          <Route
            path="/:lang/reset-password"
            element={
              <>
                <Meta page="resetPassword" />
                <ResetPassword />
              </>
            }
          />
          <Route
            path="/:lang/login"
            element={
              <>
                <Meta page="login" />
                <LoginPopUp setShowLogin={setShowLogin} />
              </>
            }
          />
          <Route
            path="/:lang/terms"
            element={
              <>
                <Meta page="termsConditions" />
                <TermsAndConditions />
              </>
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
