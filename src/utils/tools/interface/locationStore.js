import { create } from 'zustand';

const useLocationStore = create((set) => ({
    // Estado inicial
    latitude: null,
    longitude: null,
    department: null,
    departmentId: null,
    isSearchingLocation: true,
    country: null,
    isDepartmentEnabled: false,
    isCountryEnabled: false,
    lastAddressSelectionTime: null,
    hasLocationPermissions: false,

    setHasLocationPermissions: (hasPermissions) => set({
        hasLocationPermissions: hasPermissions
    }),

    // Acciones
    setLocation: (latitude, longitude) => set({
        latitude,
        longitude,
        lastAddressSelectionTime: Date.now()
    }),

    setDepartment: (department, departmentId = null) => set({
        department,
        departmentId
    }),

    setCountry: (country) => set({
        country
    }),

    setIsCountryEnabled: (isEnabled) => set({
        isCountryEnabled: isEnabled
    }),

    setIsDepartmentEnabled: (isEnabled) => set({
        isDepartmentEnabled: isEnabled
    }),

    setIsSearchingLocation: (isSearchingLocation) => set({
        isSearchingLocation
    }),

    // Acción para resetear el estado
    resetLocation: () => set({
        latitude: null,
        longitude: null,
        department: null,
        departmentId: null,
        isSearchingLocation: false,
        country: null,
        isDepartmentEnabled: false,
        lastAddressSelectionTime: null
    }),

    // Verificar si necesitamos seleccionar una nueva dirección
    needsAddressSelection: () => {
        const state = useLocationStore.getState();
        if (!state.lastAddressSelectionTime) return true;
        
        const TWO_HOURS = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
        const timeSinceLastSelection = Date.now() - state.lastAddressSelectionTime;
        return timeSinceLastSelection >= TWO_HOURS;
    }
}));

export default useLocationStore;
