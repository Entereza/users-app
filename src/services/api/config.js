const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const handleApiResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};

export const createApiRequest = async (endpoint, options = {}) => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    });

    return handleApiResponse(response);
};