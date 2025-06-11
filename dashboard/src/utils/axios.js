import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1/user',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 15000, // 15 seconds
  crossDomain: true,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Add timestamp to prevent caching
    config.params = {
      ...config.params,
      _t: new Date().getTime(),
    };
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    return response;
  },
  (error) => {
    // Log detailed error information
    console.error('API Error Details:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL,
      }
    });

    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Request timeout. The server is taking too long to respond.'));
    }

    if (!error.response) {
      if (error.message === 'Network Error') {
        return Promise.reject(new Error('Unable to connect to the server. Please make sure the backend server is running at http://localhost:3000'));
      }
      return Promise.reject(new Error('Network error. Please check your internet connection and try again.'));
    }

    if (error.response.status === 401) {
      // Handle unauthorized access
      window.location.href = '/login';
      return Promise.reject(new Error('Session expired. Please login again.'));
    }

    // Handle other specific error cases
    if (error.response.status === 404) {
      return Promise.reject(new Error('The requested resource was not found.'));
    }

    if (error.response.status === 500) {
      return Promise.reject(new Error('Server error. Please try again later.'));
    }

    return Promise.reject(error);
  }
);

export default api; 