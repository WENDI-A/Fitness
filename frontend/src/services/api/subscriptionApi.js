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

// Get User Subscription
export const getUserSubscription = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/subscriptions/${userId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch subscription");
    return await response.json();
  } catch (error) {
    console.error("Subscription fetch error:", error);
    throw error;
  }
};

// Get Subscription History
export const getSubscriptionHistory = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/subscriptions/history/${userId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch subscription history");
    return await response.json();
  } catch (error) {
    console.error("Subscription history fetch error:", error);
    throw error;
  }
};

// Get Available Upgrades
export const getAvailableUpgrades = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/subscriptions/upgrades/${userId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch available upgrades");
    return await response.json();
  } catch (error) {
    console.error("Available upgrades fetch error:", error);
    throw error;
  }
};

// Get Subscription Options
export const getSubscriptionOptions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/subscriptions/options`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch subscription options");
    return await response.json();
  } catch (error) {
    console.error("Subscription options fetch error:", error);
    throw error;
  }
};

// Get All Memberships
export const getAllMemberships = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/memberships`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch memberships");
    return await response.json();
  } catch (error) {
    console.error("Memberships fetch error:", error);
    // Fallback to static data if API fails
    return {
      memberships: [
        {
          id: 1,
          name: "Basic",
          price: 29.99,
          duration: "monthly",
          features: ["Access to gym equipment", "Locker room access", "Basic workout plans"],
          description: "Perfect for beginners starting their fitness journey"
        },
        {
          id: 2,
          name: "Premium",
          price: 49.99,
          duration: "monthly",
          features: ["All Basic features", "Group classes", "Nutrition consultation", "Personal training session (1/month)"],
          description: "Great for those wanting guided workouts and nutrition support"
        },
        {
          id: 3,
          name: "Elite",
          price: 79.99,
          duration: "monthly",
          features: ["All Premium features", "Unlimited personal training", "Custom meal plans", "Priority booking", "Spa access"],
          description: "Ultimate fitness experience with premium amenities"
        }
      ]
    };
  }
};

// Create Subscription
export const createSubscription = async (subscriptionData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/subscriptions`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(subscriptionData),
    });
    if (!response.ok) throw new Error("Failed to create subscription");
    return await response.json();
  } catch (error) {
    console.error("Create subscription error:", error);
    throw error;
  }
};
