import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if user is logged in on mount
    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    // Verify token or get user profile
                    /* 
                    // Uncomment when backend /me endpoint is ready and working
                    const res = await api.get('/auth/me'); 
                    setUser(res.data.data);
                    */
                    // For now, assume token is valid if present
                    // setUser({ name: 'User' }); 
                } catch (err) {
                    console.error(err);
                    logout();
                }
            }
            setLoading(false);
        };

        loadUser();
    }, [token]);

    const login = async (email, password) => {
        setError(null);
        try {
            const res = await api.post('/auth/login', { email, password });

            const { token, data: userData } = res.data;

            localStorage.setItem('token', token);
            setToken(token);
            setUser(userData);
            return { success: true };
        } catch (err) {
            const msg = err.response?.data?.message || 'Login failed';
            setError(msg);
            return { success: false, error: msg };
        }
    };

    const register = async (userData) => {
        setError(null);
        try {
            const res = await api.post('/auth/register', userData);

            const { token, data: user } = res.data;

            localStorage.setItem('token', token);
            setToken(token);
            setUser(user);
            return { success: true };
        } catch (err) {
            const msg = err.response?.data?.message || 'Registration failed';
            setError(msg);
            return { success: false, error: msg };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            loading,
            error,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
