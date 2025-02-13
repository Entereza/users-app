import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
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

  },

  logout: async () => {
    GoogleSignin.signOut()
    await AsyncStorage.clear();
    set({ user: null });
    useTabBarStore.getState().toggleTabBar(true);
  }
}));

export default useAuthStore;
