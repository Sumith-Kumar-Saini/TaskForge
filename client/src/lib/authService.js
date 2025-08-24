import api from "./api.js";

// Authentication service functions
export const authService = {
  // Register new user
  async register(userData) {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  // Login user
  async login(credentials) {
    const response = await api.post("/auth/login", credentials);

    // Store tokens and user data
    if (response.data.payload?.accessToken) {
      localStorage.setItem("accessToken", response.data.payload.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.payload.user));
    }

    return response.data;
  },

  // Logout user
  async logout() {
    try {
      await api.get("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage regardless of server response
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
  },

  // Refresh access token
  async refreshToken() {
    const response = await api.get("/auth/refresh");

    if (response.data.payload?.accessToken) {
      localStorage.setItem("accessToken", response.data.payload.accessToken);
    }

    return response.data;
  },

  // Get current user from localStorage
  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem("accessToken");
  },

  // Get access token
  getAccessToken() {
    return localStorage.getItem("accessToken");
  },
};

