import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useTabBarStore from './tabBarStore';

const useAuthStore = create(set => ({
  isChecking: true,
  user: null,

  setIsChecking: (value) => {
    set({ isChecking: value });
  },

  setUserData: (user) => {
    set({ user: user });
  },

  clearUserData: () => {
    set({ user: null });
  },

  getUserData: async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      set({ user: JSON.parse(userData) });
    }
  },

  logout: async () => {
    await AsyncStorage.clear();
    set({ user: null });
    useTabBarStore.getState().toggleTabBar(true);
  }
}));

export default useAuthStore;
