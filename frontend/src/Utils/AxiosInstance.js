import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export const setAccessToken = (token) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
export default axiosInstance;
