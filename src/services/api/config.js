import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://ms-auth-production-5785.up.railway.app';

export const handleApiResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};

const getAuthToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.error('Error getting auth token:', error);
        return null;
    }
};

export const createApiRequest = async (endpoint, options = {}) => {
    const token = await getAuthToken();

    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    console.log('endpoint: ', endpoint)

    if (token) {
        // console.log('token: ', token)
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    });

    return handleApiResponse(response);
};