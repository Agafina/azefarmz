import { createContext, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  // Add item to cart
  const addToCart = (product, quantity = 1, unit = "unit") => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[product._id]) {
        // Update quantity if the product is already in the cart
        updatedCart[product._id].quantity += quantity;
      } else {
        // Add new product with the given quantity and unit
        updatedCart[product._id] = { ...product, quantity, unit };
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
      return updatedCart;
    });
  };

  // Remove item from cart
  const removeFromCart = (productId, quantity = 1) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[productId]) {
        updatedCart[productId].quantity -= quantity;
        if (updatedCart[productId].quantity <= 0) {
          delete updatedCart[productId];
        }
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
      return updatedCart;
    });
  };

  // Get total cart amount
  const getTotalCartAmount = () => {
    return Object.values(cartItems).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Get total item count in the cart
  const getTotalItemCount = () => {
    return Object.values(cartItems).reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem("cart");
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalItemCount,
    clearCart,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
