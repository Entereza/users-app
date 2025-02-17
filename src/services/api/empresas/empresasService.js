import { createApiRequest } from '../config';

export const empresasService = {
    // Obtener todas las categorías por ciudad
    getCategoriesByCity: async (cityId) => {
        return createApiRequest(`/categories/get-data?cityID=${cityId}`, {
            method: 'GET'
        });
    },

    // Obtener todas las empresas con paginación
    getAllCompanies: async (page = 0, size = 10) => {
        return createApiRequest(`/companies/all?page=${page}&size=${size}`, {
            method: 'GET'
        });
    }
}; 