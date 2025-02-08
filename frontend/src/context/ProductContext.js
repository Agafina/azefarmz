import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxios from "../hooks/useAxios";

// Create the Product Context
export const ProductContext = createContext();

// Product Context Provider
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const { loading, fetchRequest } = useAxios(); // Use the custom Axios hook

  // Fetch Products from API
  const fetchProducts = async () => {
    try {
      const response = await fetchRequest("api/products", "GET");
      if (response.success) {
        setProducts(response.data);
        extractCategories(response.data); // Extract categories dynamically
      } else {
        throw new Error(response.message || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message || "Failed to fetch products");
      toast.error(error.message || "Failed to fetch products");
    }
  };

  // Extract distinct categories from products
  const extractCategories = (products) => {
    const uniqueCategories = [
      "All",
      ...new Set(products.map((p) => p.category)),
    ];
    setCategories(uniqueCategories);
  };

  // Add Product
  const addProduct = async (productData) => {
    try {
      const response = await fetchRequest(
        "api/products/add",
        "POST",
        productData
      );
      if (response.success) {
        toast.success("Product added successfully");
        fetchProducts(); // Refresh products
        return response;
      } else {
        throw new Error(response.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setError(error.message || "Failed to add product");
      toast.error(error.message || "Failed to add product");
    }
  };

  // Remove Product
  const removeProduct = async (productId) => {
    try {
      const response = await fetchRequest("api/products/remove", "DELETE", {
        id: productId,
      });
      if (response.success) {
        toast.success("Product removed successfully");
        fetchProducts(); // Refresh products
        return response;
      } else {
        throw new Error(response.message || "Failed to remove product");
      }
    } catch (error) {
      console.error("Error removing product:", error);
      setError(error.message || "Failed to remove product");
      toast.error(error.message || "Failed to remove product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loading,
        error,
        addProduct,
        removeProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom Hook for Product Context
export const useProductContext = () => useContext(ProductContext);
