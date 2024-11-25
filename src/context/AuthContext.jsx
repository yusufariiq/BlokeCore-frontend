import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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

    const logout = () => {
        try {
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
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
            isAuthenticated: !!user
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