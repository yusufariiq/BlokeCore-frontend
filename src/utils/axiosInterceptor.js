import axios from 'axios';
import { store } from '../store/store';
import { logoutSuccess } from '../store/slice/authSlice';

export const setupAxiosInterceptors = () => {
    axios.interceptors.request.use(
        (config) => {
            const token = store.getState().auth.token;
            if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
            store.dispatch(logoutSuccess());
            window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );
};