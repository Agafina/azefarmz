import { createContext, useState, useContext, useEffect } from "react";
import useAxios from "../hooks/useAxios"; // Assuming your useAxios hook is in a hooks folder

const AdminStatsContext = createContext();

export const AdminStatsProvider = ({ children }) => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    activeOrders: 0,
    successfulPayments: 0,
    totalRevenue: 0,
    revenueChangePercentage: 0,
    revenueTrend: "no-change",
    totalProducts: 0,
    stockCount: 0,
    lowStock: 0,
    totalUsers: 0,
    percentageIncrease: 0,
  });

  const { loading, error, fetchRequest } = useAxios();

  const fetchAdminStats = async () => {
    try {
      const response = await fetchRequest("api/admin/stats", "GET");
      if (response?.success) {
        setStats(response.stats); // Set the fetched stats in the state
      }
    } catch (error) {
      console.error("Error fetching admin stats:", error);
    }
  };

  useEffect(() => {
    fetchAdminStats();
  }, []); // Fetch stats on component mount

  return (
    <AdminStatsContext.Provider
      value={{ stats, loading, error, fetchAdminStats }}
    >
      {children}
    </AdminStatsContext.Provider>
  );
};

// Custom hook to use the AdminStatsContext
export const useAdminStats = () => {
  const context = useContext(AdminStatsContext);
  if (!context) {
    throw new Error("useAdminStats must be used within an AdminStatsProvider");
  }
  return context;
};
