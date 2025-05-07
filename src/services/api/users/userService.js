import { createApiRequest } from '../config';

export const userService = {
    // Update user profile
    updateProfile: async (userId, userData) => {
        // Add text fields as query parameters
        const queryParams = new URLSearchParams({
            names: userData.names,
            lastnames: userData.lastnames,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
        });

        if (userData.carnet) {
            queryParams.append('carnet', userData.carnet);
        }

        // Create FormData object
        const formData = new FormData();

        // Add image if provided
        if (userData.image) {
            formData.append('image', {
                uri: userData.image.uri,
                type: 'image/jpeg',
                name: 'profile-image.jpg'
            });
        } else {
            // If no image is provided, add an empty field
            formData.append('image', '');
        }

        return createApiRequest(`/clients-op/update/${userId}?${queryParams.toString()}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        });
    },

    // Recover account
    recoverAccount: async (email) => {
        const queryParams = new URLSearchParams({
            email: email
        });

        return createApiRequest(`/clients-op/recover?${queryParams.toString()}`, {
            method: 'GET'
        });
    },

    // Forget password
    forgetPassword: async (email) => {
        const queryParams = new URLSearchParams({
            email: email
        });

        return createApiRequest(`/clients-op/forget-password?${queryParams.toString()}`, {
            method: 'GET'
        });
    },

    // Change password
    changePassword: async (email, oldPassword, newPassword) => {
        return createApiRequest('/clients-op/new-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                oldPassword,
                newPassword
            })
        });
    }
}; 