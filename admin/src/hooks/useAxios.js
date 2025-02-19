import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie for managing cookies
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useAxios = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL; // Get the backend URL from environment variables
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchRequest = async (url, method = "GET", requestData = null, isFormData = false) => {
    setLoading(true); // Set loading state to true
    try {
      // Retrieve the token from cookies
      let token = Cookies.get("token");

      // Set headers
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Do not manually set Content-Type for FormData
      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      // Set headers with token for authorization
      const options = {
        method: method.toUpperCase(),
        headers,
        data: isFormData ? requestData : JSON.stringify(requestData),
      };

      console.log("requestData", options.data);

      // Perform the request using axios
      const response = await axios(`${backendUrl}/${url}`, options);

      setData(response.data);
      if (method !== "GET") {
        toast.success(response.data.message);
      }
      return response.data;
    } catch (error) {
      toast.error(error?.message || "An error occurred");
      setError(error?.message || "An error occurred");
      throw error;
    } finally {
      setLoading(false); // Set loading state to false when request is done
    }
  };

  return { loading, error, data, fetchRequest };
};

export default useAxios;
