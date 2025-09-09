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

// Get User Nutrition Plans
export const getUserNutrition = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/nutrition/${userId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch nutrition");
    return await response.json();
  } catch (error) {
    console.error("Nutrition fetch error:", error);
    throw error;
  }
};

// Create Nutrition Plan
export const createNutritionPlan = async (planData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/nutrition`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(planData),
    });
    if (!response.ok) throw new Error("Failed to create nutrition plan");
    return await response.json();
  } catch (error) {
    console.error("Create nutrition plan error:", error);
    throw error;
  }
};
