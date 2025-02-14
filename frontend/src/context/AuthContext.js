import { createContext, useEffect, useReducer } from "react";
import Cookies from "js-cookie"; // Import js-cookie
import axios from "axios"; // Import axios to make API requests

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, error: null }; // Clear error on successful login
    case "LOGOUT":
      return { ...state, user: null, error: null }; // Clear error on logout
    case "SET_ERROR":
      return { ...state, error: action.payload }; // Set error message
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    error: null,
  });

  useEffect(() => {
    const user = Cookies.get("aze_app_user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        dispatch({ type: "LOGIN", payload: parsedUser });
      } catch (error) {
        console.error("Failed to parse user data:", error);
        // Handle the error appropriately, maybe clear the corrupt cookie
        Cookies.remove("aze_app_user"); // Optional: remove the invalid cookie
      }
    }
  }, []);
  

  // Backend URL from the .env.local file
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });
      if (response.data.success) {
        const { user, token } = response.data;
        // Set user and token in cookies
        Cookies.set("aze_app_user", JSON.stringify(user), { expires: 7 });
        Cookies.set("token", token, { expires: 7 });
        dispatch({ type: "LOGIN", payload: user });
      } else {
        dispatch({ type: "SET_ERROR", payload: response.data.mssg });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      dispatch({
        type: "SET_ERROR",
        payload: "An error occurred while logging in. Please try again.",
      });
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${backendUrl}/api/user/register`, {
        name,
        email,
        password,
      });
      if (response.data.success) {
        const { user, token } = response.data;
        // Set user and token in cookies
        Cookies.set("aze_app_user", JSON.stringify(user), { expires: 7 });
        Cookies.set("token", token, { expires: 7 });
        dispatch({ type: "LOGIN", payload: user });
      } else {
        dispatch({ type: "SET_ERROR", payload: response.data.mssg });
      }
    } catch (error) {
      console.error("Error registering:", error);
      dispatch({
        type: "SET_ERROR",
        payload: "An error occurred while registering. Please try again.",
      });
    }
  };

  // Logout function
  const logout = () => {
    Cookies.remove("aze_app_user"); // Remove user cookie
    Cookies.remove("token"); // Remove token cookie
    dispatch({ type: "LOGOUT" });
  };

  // Forgot Password function
  const forgotPassword = async (email) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/forgot-password`,
        { email }
      );
      if (response.data.success) {
        return { success: true, message: response.data.mssg };
      } else {
        dispatch({ type: "SET_ERROR", payload: response.data.mssg });
      }
    } catch (error) {
      console.error("Error sending reset password request:", error);
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to send password reset email. Please try again.",
      });
    }
  };

  // Reset Password function
  const resetPassword = async (token, newPassword) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/reset-password`,
        {
          token,
          newPassword,
        }
      );
      if (response.data.success) {
        return { success: true, message: response.data.mssg };
      } else {
        dispatch({ type: "SET_ERROR", payload: response.data.mssg });
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to reset password. Please try again.",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
