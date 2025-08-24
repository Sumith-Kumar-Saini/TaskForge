import api from "./api.js";

// Generic API service for common HTTP operations
export const apiService = {
  // GET request
  async get(url, config = {}) {
    const response = await api.get(url, config);
    return response.data;
  },

  // POST request
  async post(url, data = {}, config = {}) {
    const response = await api.post(url, data, config);
    return response.data;
  },

  // PUT request
  async put(url, data = {}, config = {}) {
    const response = await api.put(url, data, config);
    return response.data;
  },

  // PATCH request
  async patch(url, data = {}, config = {}) {
    const response = await api.patch(url, data, config);
    return response.data;
  },

  // DELETE request
  async delete(url, config = {}) {
    const response = await api.delete(url, config);
    return response.data;
  },

  // Upload file
  async upload(url, formData, config = {}) {
    const response = await api.post(url, formData, {
      ...config,
      headers: {
        ...config.headers,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Download file
  async download(url, config = {}) {
    const response = await api.get(url, {
      ...config,
      responseType: "blob",
    });
    return response.data;
  },
};

// Example usage for specific features
export const taskService = {
  // Get all tasks
  async getTasks() {
    return apiService.get("/tasks");
  },

  // Get task by ID
  async getTask(id) {
    return apiService.get(`/tasks/${id}`);
  },

  // Create new task
  async createTask(taskData) {
    return apiService.post("/tasks", taskData);
  },

  // Update task
  async updateTask(id, taskData) {
    return apiService.put(`/tasks/${id}`, taskData);
  },

  // Delete task
  async deleteTask(id) {
    return apiService.delete(`/tasks/${id}`);
  },
};

export const projectService = {
  // Get all projects
  async getProjects() {
    return apiService.get("/projects");
  },

  // Get project by ID
  async getProject(id) {
    return apiService.get(`/projects/${id}`);
  },

  // Create new project
  async createProject(projectData) {
    return apiService.post("/projects", projectData);
  },

  // Update project
  async updateProject(id, projectData) {
    return apiService.put(`/projects/${id}`, projectData);
  },

  // Delete project
  async deleteProject(id) {
    return apiService.delete(`/projects/${id}`);
  },
};

