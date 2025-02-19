import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
//import List from "./pages/List/List";
//import Add from "./pages/Add/Add";
//import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home/Home";
import Add from "./components/Add/Add";
import Analytics from "./components/Analytics/Analytics";
import Settings from "./components/Settings/Settings";
import ProductList from "./components/Products/Products";
import OrdersPage from "./components/Orders/Orders";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <div className="flex pt-[72px]">
        {" "}
        {/* Navbar height + padding */}
        {/* Fixed Sidebar */}
        <div className="fixed left-0 h-[calc(100vh-72px)]">
          <Sidebar />
        </div>
        {/* Scrollable Content Area */}
        <div className="flex-1 ml-64 min-h-[calc(100vh-72px)] overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<ProductList />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
