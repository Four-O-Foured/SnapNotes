import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/authSlice';
import api from '../api/axios';
import { showToast } from '../lib/toast';
import { useNavigate } from '@tanstack/react-router';

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const registerMutation = useMutation({
        mutationFn: async (userData) => {
            const response = await api.post('/auth/register', userData);
            return response.data.user;
        },
        onSuccess: (user) => {
            // Assuming your backend returns user data on successful registration
            dispatch(setUser(user));
            showToast.success('Registration successful! Welcome aboard.');

            navigate({ to: '/dashboard' });
        },
        onError: (error) => {
            console.error('Registration Error:', error);
            showToast.error(error.response?.data?.message || 'Registration failed. Please try again.');
        },
    });

    const loginMutation = useMutation({
        mutationFn: async (credentials) => {
            const response = await api.post('/auth/login', credentials);
            console.log(response.data.user);
            return response.data.user;
        },
        onSuccess: (user) => {
            dispatch(setUser(user));
            showToast.success(`Welcome back, ${user.username || 'User'}!`);
            navigate({ to: '/dashboard' });
        },
        onError: (error) => {
            console.error('Login Error:', error);
            showToast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
        },
    });

    return {
        register: registerMutation,
        login: loginMutation,
    };
};
