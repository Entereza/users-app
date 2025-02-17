import { create } from 'zustand';

const useLocationStore = create((set) => ({
    // Estado inicial
    latitude: null,
    longitude: null,
    department: null,
    departmentId: null,
    isSearchingLocation: false,

    // Acciones
    setLocation: (latitude, longitude) => set({
        latitude,
        longitude
    }),

    setDepartment: (department, departmentId = null) => set({
        department,
        departmentId
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
        isSearchingLocation: false
    }),
}));

export default useLocationStore;
