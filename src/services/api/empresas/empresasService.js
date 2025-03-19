import { createApiRequest } from '../config';

export const empresasService = {
    // Obtener empresas por ciudad y coordenadas
    getBranchesByCity: async (cityId, lat, lng, page = 0, size = 100) => {
        return createApiRequest(`/branches/by-city/${cityId}?lat=${lat}&lng=${lng}&page=${page}&size=${size}`, {
            method: 'GET'
        });
    },

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
    },

    // Obtener sucursales por empresa
    getBranchesByCompany: async (companyId) => {
        return createApiRequest(`/branches/by-company/${companyId}`, {
            method: 'GET'
        });
    },

    // Obtener categorías de productos por sucursal
    getCategoriesByBranch: async (branchId) => {
        return createApiRequest(`/category-products/by-branch/${branchId}`, {
            method: 'GET'
        });
    },

    // Obtener productos por categoría
    getProductsByCategory: async (categoryId) => {
        return createApiRequest(`/products/by-category/${categoryId}`, {
            method: 'GET'
        });
    },

    // Obtener variables de producto
    getProductVariables: async (productId) => {
        return createApiRequest(`/product-variables/by-product/${productId}`, {
            method: 'GET'
        });
    },

    // Obtener precios por variable de producto
    getPricingByProductVariable: async (pvId) => {
        return createApiRequest(`/pricing/by-products-variable/${pvId}`, {
            method: 'GET'
        });
    },

    // Procesar empresas para mostrar solo las que tienen sucursales abiertas
    processBusinessData: (businessData) => {
        if (!businessData || !businessData.business || !businessData.business.content) {
            return [];
        }

        return businessData.business.content
            .map(business => {
                // Buscar la primera sucursal abierta
                const openBranch = business.branch.find(branch => branch.status === true);
                
                // Si no hay sucursal abierta, retornar null para filtrar después
                if (!openBranch) {
                    return null;
                }
                
                // Retornar la empresa con la sucursal abierta
                return {
                    ...business,
                    branch: openBranch,
                    image: business.img,
                    imageP: business.imgP,
                    cashback: business.cashBack,
                };
            })
            .filter(business => business !== null); // Filtrar las empresas sin sucursales abiertas
    },

    // Obtener la sucursal más cercana
    getNearestBranch: async (branches, userLocation) => {
        if (!branches || branches.length === 0 || !userLocation) return null;

        return branches.reduce((nearest, branch) => {
            const branchCoords = branch.location.coordinates;
            const distance = calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                branchCoords[1], // latitude
                branchCoords[0]  // longitude
            );

            if (!nearest || distance < nearest.distance) {
                return { branch, distance };
            }
            return nearest;
        }, null)?.branch;
    },

    // Obtener menú completo de una empresa
    getBusinessMenu: async (businessId, userLat, userLng, page = 0, size = 100, sort = 'string') => {
        try {
            const response = await createApiRequest(`/app-client/menu?businessId=${businessId}&userLat=${userLat}&userLng=${userLng}&page=${page}&size=${size}&sort=${sort}`, {
                method: 'GET'
            });
            console.log('getBusinessMenu: ', response.menu)
            return response;
        } catch (error) {
            console.error('Error fetching business menu:', error);
            throw error;
        }
    }
};

// Función auxiliar para calcular la distancia entre dos puntos usando la fórmula de Haversine
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
};

const toRad = (value) => {
    return value * Math.PI / 180;
}; 