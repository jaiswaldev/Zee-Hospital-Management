import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://hospital-management-r7hc.onrender.com/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/user/login', credentials),
  register: (userData) => api.post('/user/register', userData),
  getCurrentUser: () => api.get('/user/patient/me'),
  logout: () => api.post('/user/logout'),
};

export const appointmentAPI = {
  create: (appointmentData) => api.post('/appointment/create', appointmentData),
  getAll: () => api.get('/appointment/all'),
  getMyAppointments: () => api.get('/appointment/my-appointments'),
  update: (id, data) => api.put(`/appointment/${id}`, data),
  delete: (id) => api.delete(`/appointment/${id}`),
};

export const doctorAPI = {
  getAll: () => api.get('/user/doctors'),
  getById: (id) => api.get(`/user/doctor/${id}`),
  getDepartments: () => api.get('/user/departments'),
};

export const messageAPI = {
  send: (messageData) => api.post('/message/send', messageData),
  getConversations: () => api.get('/message/conversations'),
  getMessages: (conversationId) => api.get(`/message/${conversationId}`),
};

export default api; 