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
        const RETRY_DELAY = 1000; // 1 segundo

        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
            try {
                const response = await Promise.race([
                    Location.reverseGeocodeAsync({
                        latitude,
                        longitude
                    }),
                    new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Timeout')), 5000)
                    )
                ]);

                if (response && response.length > 0) {
                    console.log('reverseGeocodeAsync: ', response)

                    const region = response[0].region;
                    const country = response[0].country;

                    // Extraer el nombre del departamento removiendo "Departamento de "
                    const city = region.replace('Departamento de ', '');

                    if (!city || !country) {
                        console.warn('No se encontró ciudad o país en las coordenadas proporcionadas');
                        return null;
                    }

                    // Verificar si el país es Bolivia
                    if (country.toLowerCase() !== 'bolivia') {
                        console.warn('La aplicación solo está disponible en Bolivia');
                        return {
                            city,
                            country,
                            isBolivia: false
                        };
                    }

                    const cityId = await citiesService.getCityIdByName(city);
                    return {
                        name: city,
                        id: cityId,
                        country,
                        isBolivia: true,
                        isEnabled: cityId !== null
                    };
                }
                return null;
            } catch (error) {
                console.warn(`Intento ${attempt + 1}/${MAX_RETRIES} falló:`, error.message);
                if (attempt === MAX_RETRIES - 1) {
                    throw new Error(`No se pudo obtener la ubicación después de ${MAX_RETRIES} intentos: ${error.message}`);
                }
                await sleep(RETRY_DELAY);
            }
        }
        return null;
    }
}; 