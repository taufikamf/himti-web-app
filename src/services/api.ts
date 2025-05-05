import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
  withCredentials: true, // This enables sending cookies with cross-origin requests
});

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      window.location.href = '/auth/login';
    }

    // Handle 403 Forbidden errors
    if (error.response?.status === 403) {
      window.location.href = '/403';
    }

    // Handle 404 Not Found errors
    if (error.response?.status === 404) {
      window.location.href = '/404';
    }

    // Handle 500 Internal Server errors
    if (error.response?.status === 500) {
      window.location.href = '/500';
    }

    return Promise.reject(error);
  }
);

export default api;
