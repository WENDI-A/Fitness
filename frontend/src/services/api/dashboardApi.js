const API_BASE_URL = "http://localhost:5000/api";

// Helper function to get auth headers
const getAuthHeaders = () => {
  // const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    // Temporarily disable auth for testing
    // Authorization: `Bearer ${token}`,
  };
};

// Get Dashboard Overview
export const getDashboardOverview = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/overview/${userId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch dashboard overview");
    return await response.json();
  } catch (error) {
    console.error("Dashboard overview error:", error);
    throw error;
  }
};

// Get Trainers
export const fetchTrainers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/trainers`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch trainers");
    return await response.json();
  } catch (error) {
    console.error("Trainers fetch error:", error);
    throw error;
  }
};
