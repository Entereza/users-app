import { createApiRequest } from '../config';

export const citiesService = {
    // Obtener todas las ciudades
    getAllCities: async () => {
        return createApiRequest('/cities/cities', {
            method: 'GET'
        });
    }
}; 