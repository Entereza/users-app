import { create } from 'zustand';

const initialState = {
    selectedCategory: '',
    scrollViewRef: null,
    sectionPositions: {},
    categoriesListRef: null,
    hasPromotions: false,
    isManualSelection: false
};

const useCategoryStore = create((set) => ({
    ...initialState,
    
    setSelectedCategory: (category) => set({ selectedCategory: category }),
    setScrollViewRef: (ref) => set({ scrollViewRef: ref }),
    
    setSectionPosition: (category, position) => set(state => ({
        sectionPositions: { ...state.sectionPositions, [category]: position }
    })),
    
    setCategoriesListRef: (ref) => set({ categoriesListRef: ref }),
    setHasPromotions: (value) => set({ hasPromotions: value }),
    setIsManualSelection: (value) => set({ isManualSelection: value }),

    // Función para scroll a categoría
    scrollToCategory: (category) => {
        const state = useCategoryStore.getState();
        const position = state.sectionPositions[category] || 0;
        state.scrollViewRef?.scrollTo({ y: position, animated: true });
    },

    // Función para reiniciar el estado
    resetState: () => set(initialState)
}));

export default useCategoryStore; 