import { createApiRequest } from '../config';

export const locationsService = {
    // Obtener ubicaciones del cliente
    getClientLocations: async (clientId) => {
        return createApiRequest(`/locations/client/${clientId}`, {
            method: 'GET'
        });
    },

    // Crear nueva ubicación
    createLocation: async (locationData) => {
        return createApiRequest('/locations', {
            method: 'POST',
            body: JSON.stringify({
                clientId: locationData.clientId,
                lat: locationData.lat,
                lng: locationData.lng,
                placeName: locationData.placeName,
                references: locationData.references
            })
        });
    },

    // Actualizar ubicación
    updateLocation: async (locationId, locationData) => {
        return createApiRequest(`/locations/${locationId}`, {
            method: 'PUT',
            body: JSON.stringify({
                clientId: locationData.clientId,
                lat: locationData.lat,
                lng: locationData.lng,
                placeName: locationData.placeName,
                references: locationData.references
            })
        });
    },

    // Eliminar ubicación
    deleteLocation: async (locationId) => {
        return createApiRequest(`/locations/${locationId}`, {
            method: 'DELETE'
        });
    }
}; 