import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
  withCredentials: true, // This enables sending cookies with cross-origin requests
});

// Public endpoints that don't require authentication
const PUBLIC_ENDPOINTS = [
  '/departments',
  '/departments/',
  '/forums',
  '/forums/',
  '/articles',
  '/articles/',
  '/blogs',
  '/blogs/',
  '/members',
  '/members/',
  '/divisions',
  '/divisions/',
];

// Endpoints that should never redirect on auth failure
const NO_REDIRECT_ENDPOINTS = [
  '/users/me'
];

// Helper function to check if a URL is a public endpoint
const isPublicEndpoint = (url: string | undefined): boolean => {
  if (!url) return false;
  
  // Remove query parameters for matching
  const cleanUrl = url.split('?')[0];
  
  // Check if the URL starts with any of the public endpoints
  return PUBLIC_ENDPOINTS.some(endpoint => 
    cleanUrl.includes(endpoint) || 
    // Also match specific IDs like /forums/123
    new RegExp(`^${endpoint}[\\w-]+$`).test(cleanUrl)
  );
};

// Helper function to check if a URL should never redirect on auth failure
const isNoRedirectEndpoint = (url: string | undefined): boolean => {
  if (!url) return false;
  
  // Remove query parameters for matching
  const cleanUrl = url.split('?')[0];
  
  // Check if the URL exactly matches any of the no-redirect endpoints
  return NO_REDIRECT_ENDPOINTS.some(endpoint => cleanUrl.endsWith(endpoint));
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Make sure withCredentials is set to true for all requests
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      console.error("Unauthorized request:", error.config?.url);
      
      // Don't redirect for /users/me or public endpoints
      if (typeof window !== 'undefined' && 
          !isPublicEndpoint(error.config?.url) && 
          !isNoRedirectEndpoint(error.config?.url)) {
        // Only redirect in browser environment and if not a public or no-redirect endpoint
        const currentPath = window.location.pathname;
        // Don't redirect if already on login page to avoid infinite loops
        if (!currentPath.includes('/auth/login')) {
          window.location.href = `/auth/login?from=${encodeURIComponent(currentPath)}`;
        }
      }
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
