// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL || '';

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add token to requests
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Auth endpoints
// export const authAPI = {
//   signup: (data) => api.post('/auth/signup', data),
//   login: (data) => api.post('/auth/login', data),
//   getMe: () => api.get('/auth/me'),
// };

// // User endpoints
// export const userAPI = {
//   updateProfile: (data) => api.put('/users/profile', data),
//   deleteProfile: () => api.delete('/users/profile'),
// };

// // Task endpoints
// export const taskAPI = {
//   getTasks: (status) => {
//     const params = status ? { status } : {};
//     return api.get('/tasks', { params });
//   },
//   getTask: (id) => api.get(`/tasks/${id}`),
//   createTask: (data) => api.post('/tasks', data),
//   updateTask: (id, data) => api.put(`/tasks/${id}`, data),
//   deleteTask: (id) => api.delete(`/tasks/${id}`),
// };

// export default api;

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth endpoints
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// User endpoints
export const userAPI = {
  updateProfile: (data) => api.put('/users/profile', data),
  deleteProfile: () => api.delete('/users/profile'),
};

// Task endpoints
export const taskAPI = {
  getTasks: (status) => {
    const params = status ? { status } : {};
    return api.get('/tasks', { params });
  },
  getTask: (id) => api.get(`/tasks/${id}`),
  createTask: (data) => api.post('/tasks', data),
  updateTask: (id, data) => api.put(`/tasks/${id}`, data),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

export default api;
