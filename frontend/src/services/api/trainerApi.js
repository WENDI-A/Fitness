const API_BASE_URL = "http://localhost:5000/api";

// Helper function to get auth headers
const getAuthHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
};

// Get all trainers
export const getAllTrainers = async () => {
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

// Get trainer by ID
export const getTrainerById = async (trainerId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/trainers/${trainerId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch trainer");
    return await response.json();
  } catch (error) {
    console.error("Trainer fetch error:", error);
    throw error;
  }
};

// Get trainer availability
export const getTrainerAvailability = async (trainerId, date) => {
  try {
    const params = new URLSearchParams();
    if (date) params.append('date', date);
    
    const response = await fetch(`${API_BASE_URL}/trainers/${trainerId}/availability?${params}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch trainer availability");
    return await response.json();
  } catch (error) {
    console.error("Trainer availability fetch error:", error);
    throw error;
  }
};

// Book personal training session
export const bookPersonalTraining = async (bookingData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/trainers/book-session`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) throw new Error("Failed to book personal training");
    return await response.json();
  } catch (error) {
    console.error("Book personal training error:", error);
    throw error;
  }
};

// Get user's personal training sessions
export const getUserTrainingSessions = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/trainers/sessions/user/${userId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch training sessions");
    return await response.json();
  } catch (error) {
    console.error("Training sessions fetch error:", error);
    throw error;
  }
};

// Cancel personal training session
export const cancelTrainingSession = async (sessionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/trainers/sessions/${sessionId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to cancel training session");
    return await response.json();
  } catch (error) {
    console.error("Cancel training session error:", error);
    throw error;
  }
};
