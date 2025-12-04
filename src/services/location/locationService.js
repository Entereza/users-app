import * as Location from 'expo-location';
import * as Tracking from 'expo-tracking-transparency';
import { citiesService } from '../api/empresas/citiesService';

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
        const MAX_RETRIES = 3;
        const RETRY_DELAY = 1000;

        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
            try {
                const response = await Promise.race([
                    Location.reverseGeocodeAsync({ latitude, longitude }),
                    new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Timeout')), 5000)
                    )
                ]);

                if (response && response.length > 0) {
                    console.log('reverseGeocodeAsync: ', response);
                    const { region, country } = response[0];

                    if (!region || !country) {
                        console.warn('No se encontró región o país');
                        return null;
                    }

                    if (country.toLowerCase() !== 'bolivia') {
                        return {
                            city: null,
                            country,
                            isBolivia: false
                        };
                    }

                    const cities = await citiesService.getAllCities();
                    const regionLower = region.toLowerCase();

                    const matchedCity = cities.find(city =>
                        regionLower.includes(city.name.toLowerCase())
                    );

                    if (!matchedCity) {
                        console.warn('No se encontró ninguna coincidencia con el nombre del departamento');
                        return null;
                    }

                    return {
                        name: matchedCity.name,
                        id: matchedCity.id,
                        country,
                        isBolivia: true,
                        isEnabled: true
                    };
                }

                return null;
            } catch (error) {
                console.warn(`Intento ${attempt + 1}/${MAX_RETRIES} falló:`, error.message);
                if (attempt === MAX_RETRIES - 1) {
                    throw new Error(`No se pudo obtener la ubicación: ${error.message}`);
                }
                await sleep(RETRY_DELAY);
            }
        }

        return null;
    }
}; 