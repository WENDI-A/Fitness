const API_BASE_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

// User Management
export const getUsersForAdmin = async () => {
  const res = await fetch(`${API_BASE_URL}/admin/users`, 
    { 
        headers: getAuthHeaders() 
    });
  if (!res.ok) throw new Error('Failed to fetch admin users');
  return res.json();
};

export const acceptUser = async (userId) => {
  const res = await fetch(`${API_BASE_URL}/admin/users/${userId}/accept`, { method: 'POST', headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to accept user');
  return res.json();
};

export const declineUser = async (userId) => {
  const res = await fetch(`${API_BASE_URL}/admin/users/${userId}/decline`, 
    { 
        method: 'POST', headers: getAuthHeaders() 
    });
  if (!res.ok) throw new Error('Failed to decline user');
  return res.json();
};

// Subscription Management
export const getAllSubscriptions = async () => {
  const res = await fetch(`${API_BASE_URL}/admin/subscriptions`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch subscriptions');
  return res.json();
};

export const updateSubscriptionStatus = async (subscriptionId, status, payment_status) => {
  const res = await fetch(`${API_BASE_URL}/admin/subscriptions/${subscriptionId}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status, payment_status })
  });
  if (!res.ok) throw new Error('Failed to update subscription');
  return res.json();
};

// Payment Management
export const getAllPayments = async () => {
  const res = await fetch(`${API_BASE_URL}/admin/payments`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch payments');
  return res.json();
};

export const updatePaymentStatus = async (paymentId, status, notes) => {
  const res = await fetch(`${API_BASE_URL}/admin/payments/${paymentId}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status, notes })
  });
  if (!res.ok) throw new Error('Failed to update payment');
  return res.json();
};

// Feedback Management
export const getAllFeedback = async () => {
  const res = await fetch(`${API_BASE_URL}/admin/feedback`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch feedback');
  return res.json();
};

export const acceptFeedback = async (feedbackId) => {
  const res = await fetch(`${API_BASE_URL}/admin/feedback/${feedbackId}/accept`, {
    method: 'PATCH',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to accept feedback');
  return res.json();
};

export const declineFeedback = async (feedbackId) => {
  const res = await fetch(`${API_BASE_URL}/admin/feedback/${feedbackId}/decline`, {
    method: 'PATCH',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to resolve feedback');
  return res.json();
};
