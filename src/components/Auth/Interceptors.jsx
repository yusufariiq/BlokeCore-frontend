import axios from 'axios';
import { toast } from 'react-hot-toast';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

export const setupAuthInterceptors = (navigate, logout) => {
    // Request interceptor to add auth token
    api.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    // Response interceptor to handle token expiration and authentication errors
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            // Check if the error response indicates token expiration or authentication failure
            if (
                error.response && 
                (error.response.status === 401 || 
                 error.response.data?.logout === true)
            ) {
                // Show toast notification
                toast.error('Your session has expired. Please log in again.');

                // Logout the user
                logout();

                // Redirect to login page
                navigate('/login');
            }
            return Promise.reject(error);
        }
    );
};