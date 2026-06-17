import axios, { AxiosError } from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

/**
 * Normalized API error structure matched with the backend error response.
 */
export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (for future extension such as token injection)
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for success and error normalization
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Normalise success by directly returning the response data
    return response.data;
  },
  (error: AxiosError) => {
    let normalizedError: ApiError = {
      timestamp: new Date().toISOString(),
      status: 500,
      error: 'Internal Server Error',
      message: 'An unexpected network error occurred.',
      path: '',
    };

    if (error.response) {
      // The server responded with a status code outside the 2xx range
      const data = error.response.data as Partial<ApiError>;
      normalizedError = {
        timestamp: data.timestamp || new Date().toISOString(),
        status: error.response.status,
        error: data.error || 'API Error',
        message: data.message || 'The server returned an error.',
        path: data.path || error.config?.url || '',
      };
    } else if (error.request) {
      // The request was made but no response was received
      normalizedError = {
        timestamp: new Date().toISOString(),
        status: 0,
        error: 'Network Error',
        message: 'No response received from the server. Please check your connection.',
        path: error.config?.url || '',
      };
    } else {
      // Something else happened in setting up the request
      normalizedError.message = error.message;
      if (error.config?.url) {
        normalizedError.path = error.config.url;
      }
    }

    return Promise.reject(normalizedError);
  }
);

export default apiClient;
