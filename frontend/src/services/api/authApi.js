const API_BASE_URL = 'https://fitness-kykn.vercel.app/api';
const headers = { 'Content-Type': 'application/json' };

export const registerUser = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/users/register`, { method: 'POST', headers, body: JSON.stringify(userData) });
  if (!res.ok) throw new Error('Failed to register user');
  return res.json();
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_BASE_URL}/users/login`, { method: 'POST', headers, body: JSON.stringify(credentials) });
  if (!res.ok) throw new Error('Failed to login');
  return res.json();
};
