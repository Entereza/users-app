import * as Location from 'expo-location';
import * as Tracking from 'expo-tracking-transparency';

export const locationService = {
    // Solicitar permisos de ubicación
    requestLocationPermission: async () => {
        try {
            const trackingStatus = await Tracking.requestTrackingPermissionsAsync();
            if (trackingStatus.status !== 'granted') {
                console.log('El usuario no dio acceso al tracking.');
                return false;
            }
            const { status } = await Location.requestForegroundPermissionsAsync();
            return status === 'granted';
        } catch (error) {
            console.error('Error requesting location permission:', error);
            return false;
        }
    },

    // Obtener la ubicación actual
    getCurrentLocation: async () => {
        try {
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });
            return location;
        } catch (error) {
            console.error('Error getting location:', error);
            throw error;
        }
    },

    // Obtener información del departamento usando geocoding inverso
    getDepartmentFromCoords: async (latitude, longitude) => {
        try {
            const response = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            });

            if (response && response.length > 0) {
                return response[0].city;
            }
            return null;
        } catch (error) {
            console.error('Error getting department:', error);
            throw error;
        }
    },

    // Obtener la id de la ciudad usando API

}; 