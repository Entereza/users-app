import { create } from 'zustand';

const useLocationStore = create((set) => ({
    // Estado inicial
    latitude: null,
    longitude: null,
    department: null,
    departmentId: null,
    isSearchingLocation: false,
    country: null,
    isDepartmentEnabled: false,
    isCountryEnabled: false,

    // Acciones
    setLocation: (latitude, longitude) => set({
        latitude,
        longitude
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
        isDepartmentEnabled: false
    }),
}));

export default useLocationStore;
