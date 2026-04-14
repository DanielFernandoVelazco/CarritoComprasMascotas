import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await authService.login(email, password);
            setUser(response);
            return { success: true, data: response };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Login failed' };
        }
    };

    const register = async (userData) => {
        try {
            const response = await authService.register(userData);
            return { success: true, data: response };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Registration failed' };
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};