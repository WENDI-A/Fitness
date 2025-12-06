const API_BASE_URL = "http://localhost:5000/api";

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    
    Authorization: `Bearer ${token}`,
  };
};

// Get User Feedback
export const getUserFeedback = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/feedback/${userId}`, {
      method:"GET",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch feedback");
    return await response.json();
  } catch (error) {
    console.error("Feedback fetch error:", error);
    throw error;
  }
};

// Create Feedback
export const createFeedback = async (feedbackData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/feedback`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(feedbackData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to create feedback")
      
    }

    return data;

     
     
  } catch (error) {
    console.error("Create feedback error:", error);
    throw error;
  }
};
