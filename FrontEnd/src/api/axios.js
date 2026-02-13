import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptors here if needed (e.g., for logging or token management)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Global error handling can go here
        return Promise.reject(error);
    }
);

export default api;
