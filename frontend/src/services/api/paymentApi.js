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

// Get User Payments
export const getUserPayments = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/payments${userId ? `/${userId}` : ''}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch payments");
    return await response.json();
  } catch (error) {
    console.error("Payments fetch error:", error);
    throw error;
  }
};

// Create Payment
export const createPayment = async (paymentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/payments`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(paymentData),
    });
    if (!response.ok) throw new Error("Failed to create payment");
    return await response.json();
  } catch (error) {
    console.error("Create payment error:", error);
    throw error;
  }
};
