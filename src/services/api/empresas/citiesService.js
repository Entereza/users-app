import { createApiRequest } from '../config';

export const citiesService = {
    // Obtener todas las ciudades
    getAllCities: async () => {
        return createApiRequest('/cities/cities', {
            method: 'GET'
        });
    },

    getAllCities: async () => {
        return createApiRequest('/cities/cities', {
            method: 'GET'
        });
    },

    // Obtener ID de ciudad por nombre
    getCityIdByName: async (cityName) => {
        try {
            const cities = await createApiRequest('/cities/cities', {
                method: 'GET'
            });

            const city = cities.find(city => 
                city.name.toLowerCase() === cityName.toLowerCase()
            );

            return city ? city.id : null;
        } catch (error) {
            console.error('Error getting city ID:', error);
            return null;
        }
    }
}; 