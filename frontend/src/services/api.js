const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  async request(endpoint , options = {}){
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers :{'content-type':  'application/json', ...options.Headers},
      ...options
    }
    try{
      const response = await fetch(url, config);
      const data = await response.json();
      if(!response.ok){
      throw new Error(data.message || `HTTP error! status:${response.status}`);
      
      }
      return data;
    } catch(error){
        console.error('API request failed:', error);
    throw error;
    }
  }

  // Membership endpoints
  async getMemberships() {
    return this.request('/memberships');
  }

  async getMembershipsByCategory(category) {
    return this.request(`/memberships/category/${category}`);
  }

  // User endpoints
  async registerUser(userData) {
    return this.request('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async loginUser(credentials) {
    return this.request('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Admin endpoints
  async getUsersForAdmin() {
    return this.request('/admin/users');
  }

  async acceptUser(userId) {
    return this.request(`/admin/users/${userId}/accept`, {
      method: 'POST'
    });
  }

  async declineUser(userId) {
    return this.request(`/admin/users/${userId}/decline`, {
      method: 'POST'
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export default new ApiService();
