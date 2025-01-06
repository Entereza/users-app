import { create } from 'zustand';
import { theme_colors } from '../../theme/theme_colors';

const useTabBarStore = create(set => ({
    showTabBar: true,
    toggleTabBar: (value) => set({ showTabBar: value }),

    colorStatusBar: theme_colors.dark,
    changeColorStatusBar: (value) => set({ colorStatusBar: value }),

    screenAnimationType: "none",
    changeScreenAnimationType: (value) => set({ screenAnimationType: value }),

    nameRouteBack: "",
    changeNameRouteBack: (value) => set({ nameRouteBack: value })
}));

export default useTabBarStore;