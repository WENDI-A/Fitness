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

// Get User Membership
export const getUserMembership = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/memberships/user/${userId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch membership");
    return await response.json();
  } catch (error) {
    console.error("Membership fetch error:", error);
    throw error;
  }
};

// Create Membership
export const createMembership = async (membershipData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/memberships`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(membershipData),
    });
    if (!response.ok) throw new Error("Failed to create membership");
    return await response.json();
  } catch (error) {
    console.error("Create membership error:", error);
    throw error;
  }
};
