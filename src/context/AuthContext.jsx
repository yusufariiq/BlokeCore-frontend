import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            const token = localStorage.getItem('token');

            if (storedUser && token) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            }
        } catch (error) {
            console.error('Error loading user data:', error);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    }, []);

    const login = (userData, token) => {
        try {
            const sanitizedUserData = {
                id: userData.id,
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                email: userData.email || '',
                phoneNumber: userData.phoneNumber || '',
            };
            
            setUser(sanitizedUserData);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(sanitizedUserData));
        } catch (error) {
            console.error('Error during login:', error);
            throw new Error('Failed to process login data');
        }
    };
    
    const isTokenExpired = () => {
        const token = localStorage.getItem('token');
        if (!token) return true;

        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const payload = JSON.parse(window.atob(base64));

            return payload.exp * 1000 < Date.now();
        } catch (error) {
            console.error('Error checking token:', error);
            return true;
        }
    };

    const logout = () => {
        try {
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const updateUser = (updateUserData) => {
        try {
            const newUserData = { ...user, ...updateUserData };
            
            Object.keys(newUserData).forEach(key => {
                if (newUserData[key] === undefined) {
                    delete newUserData[key];
                }
            });

            setUser(newUserData);
            localStorage.setItem('user', JSON.stringify(newUserData));

            return newUserData;
        } catch (error) {
            console.error('Error updating user data:', error);
            throw new Error('Failed to update user data');
        }
    };

    const getAuthToken = () => {
        return localStorage.getItem('token');
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            loading,
            updateUser,
            getAuthToken,
            isAuthenticated: !!user,
            isTokenExpired,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};