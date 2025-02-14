import { createApiRequest } from './config';

export const authService = {
    // Regular login
    login: async (credentials) => {
        return createApiRequest('/clients-op/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    },

    // Regular signup
    signup: async (userData) => {
        const formData = new FormData();
        formData.append('image', '');

        const queryParams = new URLSearchParams({
            names: userData.names,
            lastnames: userData.lastnames,
            email: userData.email,
            password: userData.password,
            phoneNumber: userData.phoneNumber
        }).toString();

        console.log('queryParams: ', queryParams)

        return createApiRequest(`/clients-op/signup?${queryParams}`, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    // Google login
    loginWithGoogle: async (googleCredentials) => {
        return createApiRequest('/clients-op/login/google', {
            method: 'POST',
            body: JSON.stringify(googleCredentials)
        });
    },

    // Google signup
    signupWithGoogle: async (googleUserData) => {
        return createApiRequest('/clients-op/signup/google', {
            method: 'POST',
            body: JSON.stringify(googleUserData)
        });
    }
};