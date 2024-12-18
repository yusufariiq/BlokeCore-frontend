import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export const setupAxiosInterceptors = () => {
    const { isTokenExpired, logout } = useAuth();

    axios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                if (isTokenExpired()){
                    logout();
                    window.location.href = '/login';
                    return Promise.reject(new Error('Token expired'));
                }
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
};